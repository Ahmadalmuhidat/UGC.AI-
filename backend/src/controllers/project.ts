import { Request, Response } from "express";
import prisma from "../configs/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import { GeminiModel, generationConfig } from "../services/gemini.js";
import axios from 'axios';
import path from "path";
import * as fs from "node:fs";
import { loadImage } from "../services/gemini.js";

export async function createProject(req: Request, res: Response) {
  try {
    let isCreditsDeducted = false;
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const images = req.files as Express.Multer.File[];

    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.credits < 5) {
      return res.status(400).json({ error: 'Not enough credits' });
    }

    isCreditsDeducted = false;

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        credits: {
          decrement: 5
        }
      },
    }).then(() => { isCreditsDeducted = true; });

    if (!isCreditsDeducted) {
      return res.status(400).json({ error: 'Failed to deduct credits' });
    }

    const imageUrls = await Promise.all(images.map(async (image: Express.Multer.File) => {
      const result = await cloudinary.uploader.upload(
        image.path,
        {
          resource_type: 'image',
          folder: 'ads-video-generator'
        }
      );
      return result.secure_url;
    }));

    const project = await prisma.project.create({
      data: {
        name: req.body.name,
        userId: userId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        userPrompt: req.body.userPrompt,
        aspectRatio: req.body.aspectRatio,
        targetLength: parseInt(req.body.targetLength),
        uploadedImages: imageUrls,
        isGenerating: false
      },
    });

    const img1base64 = loadImage(images[0].path, images[0].mimetype);
    const img2base64 = loadImage(images[1].path, images[1].mimetype);

    const prompt = {
      text: `Combine the person and product into a realistic photo.
      Make the person naturally hold or use the product.
      Match lighting, shadows, scale and perspective.
      Make the person stand in professional studio lighting.
      Output ecommerce-quality photo realistic imagery.
      ${req.body.userPrompt}`
    }

    const response: any = await GeminiModel.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: [img1base64, img2base64, prompt],
      config: generationConfig
    });

    if (!response.candidates[0].content.parts[0].inlineData.data) {
      return res.status(400).json({ error: 'Failed to generate image' });
    }

    const generatedImage = response.candidates[0].content.parts[0].inlineData.data;
    let finalBuffer: Buffer | null = null;

    for (const part of generatedImage) {
      if (part.inlineData) {
        finalBuffer = Buffer.from(part.inlineData.data, 'base64')
      }
    }

    if (!finalBuffer) {
      return res.status(400).json({ error: 'Failed to generate image' });
    }

    const base64Image = `data:image/png;base64,${finalBuffer.toString('base64')}`;
    const uploadResult = await cloudinary.uploader.upload(base64Image, { resource_type: 'image' });

    await prisma.project.update({
      where: {
        id: project.id
      },
      data: {
        generatedImage: uploadResult.secure_url,
        isGenerating: false
      }
    });

    return res.status(200).json({ project });
  } catch (error: any) {
    const { userId } = req.auth();
    if (userId) {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          credits: {
            increment: 5
          }
        },
      });
    }
    console.error(error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

export async function generateVideo(req: Request, res: Response) {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: String(req.body.id),
        userId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!project.generatedImage) {
      return res.status(400).json({ error: 'Project has no generated image' });
    }

    const prompt = `make the person showcase the product which is ${project.productName} ${project.productDescription && `and Product Description: ${project.productDescription}`}`;
    const model = 'veo-3.1-generate-preview';

    const image = await axios.get(project.generatedImage, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(image.data);

    let operation = await GeminiModel.models.generateVideos({
      model: model,
      prompt: prompt,
      image: {
        imageBytes: imageBuffer.toString('base64'),
        mimeType: 'image/png'
      },
      config: {
        aspectRatio: project?.aspectRatio || '9:16',
        numberOfVideos: 1,
        resolution: '720p'
      }
    });

    while (operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      operation = await GeminiModel.operations.getVideosOperation({
        operation: operation
      })
    }

    const filename = `${userId}-${Date.now()}•mp4`
    const filePath = path.join('videos', filename)

    // fs.mkdirsync('videos', (recursive: true?)

    if (!operation.response?.generatedVideos || operation.response.generatedVideos.length === 0) {
      throw new Error(operation.response?.raiMediaFilteredReasons?.[0] || 'Failed to generate video');
    }

    await GeminiModel.files.download({
      file: operation.response.generatedVideos[0].video!,
      downloadPath: filePath
    })


    const uploadResult = await cloudinary.uploader.upload(filePath,
      { resource_type: 'video' });


    await prisma.project.update({
      where: { id: project.id },
      data: {
        generatedVideo: uploadResult.secure_url,
        isGenerating: false
      }
    })

    fs.unlinkSync(filePath);

    return res.status(200).json({ videoUrl: uploadResult.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllProjects(req: Request, res: Response) {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: String(req.params.id),
        userId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export async function deleteProject(req: Request, res: Response) {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const project = await prisma.project.delete({
      where: {
        id: String(req.params.id),
        userId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
