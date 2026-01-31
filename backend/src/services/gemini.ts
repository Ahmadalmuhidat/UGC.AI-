import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";
import * as fs from "node:fs";

export const GeminiModel = new GoogleGenAI({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY!,
});

export const loadImage = (path: string, mimeType: string) => {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString('base64'),
      mimeType
    }
  }
}

export const generationConfig = {
  maxOutputTokens: 32768,
  temperature: 1,
  topP: 0.95,
  responseModalities: ['IMAGE'],
  imageConfig: {
    imageSize: '1K'
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.OFF,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.OFF,
    },
    {
      category: HarmCategory.HARM_CATEGORY_IMAGE_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.OFF,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.OFF,
    }
  ]
}