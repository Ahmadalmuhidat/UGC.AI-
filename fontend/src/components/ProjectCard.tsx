import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import {
  EllipsisIcon,
  ImageIcon,
  Loader2Icon,
  PlaySquareIcon,
  TrashIcon
} from "lucide-react";
import {
  GhostButton
} from "./Buttons";
import { useAxios } from "../hooks/useAxios";
import toast from "react-hot-toast";

export default function ProjectCard({ gen, setGenerations }: { gen: Project; setGenerations?: React.Dispatch<React.SetStateAction<Project[] | null>>; }) {
  const axios = useAxios();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      if (!setGenerations) return;

      const confirmed = window.confirm('Are you sure you want to delete this project? This action cannot be undone.');
      if (!confirmed) return;

      const { status } = await axios.delete(`/api/projects/${id}`);

      if (status === 200) {
        setGenerations((prevGens) => prevGens ? prevGens.filter((gen) => gen.id !== id) : null);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  return (
    <div key={gen.id} className="mb-4 break-inside-avoid">
      <div className="premium-card rounded-3xl overflow-hidden group">
        <div className={`${gen?.aspectRatio === '9:16' ? 'aspect-9/16' : 'aspect-video'} relative overflow-hidden bg-zinc-100`}>
          {gen.generatedImage && (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              className={`absolute inset-0 w-full h-full object-cover transition duration-700 ${gen.generatedVideo ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`} />
          )}

          {gen.generatedVideo && (
            <video
              src={gen.generatedVideo}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-700"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()} />
          )}

          {!gen.generatedImage && !gen.generatedVideo && (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-zinc-900/10 backdrop-blur-sm">
              <Loader2Icon className="size-10 animate-spin text-indigo-600" />
            </div>
          )}

          <div className="absolute left-4 top-4 flex gap-2 items-center">
            {gen.isGenerating && (
              <span className="text-[10px] font-bold px-3 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded-full shadow-sm">Generating</span>
            )}
          </div>

          <div className="absolute right-4 top-4 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)} className="relative">
              <button className="bg-white/90 backdrop-blur-md rounded-full p-2 text-zinc-900 shadow-lg border border-zinc-100 hover:bg-white transition-colors">
                <EllipsisIcon className="size-5" />
              </button>
              
              <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden py-1 transition-all duration-300 origin-top-right ${menuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                {gen.generatedImage && (
                  <a href={gen.generatedImage} download className="flex gap-3 items-center px-4 py-3 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors">
                    <ImageIcon size={16} className="text-zinc-400" /> Download Image
                  </a>
                )}
                {gen.generatedVideo && (
                  <a href={gen.generatedVideo} download className="flex gap-3 items-center px-4 py-3 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors">
                    <PlaySquareIcon size={16} className="text-zinc-400" /> Download Video
                  </a>
                )}
                <button onClick={() => handleDelete(gen.id)} className="w-full flex gap-3 items-center px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                  <TrashIcon size={16} /> Delete Project
                </button>
              </div>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 flex -space-x-4">
             {gen.uploadedImages.map((img, i) => (
                <img key={i} src={img} alt="upload" className="w-14 h-14 object-cover rounded-2xl border-4 border-white shadow-xl" />
             ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xl text-zinc-900 truncate mb-1">{gen.productName}</h3>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                {new Date(gen.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex-shrink-0">
               <span className="text-[10px] font-bold px-3 py-1 bg-zinc-50 text-zinc-600 border border-zinc-100 rounded-full shadow-sm uppercase tracking-widest">{gen.aspectRatio}</span>
            </div>
          </div>

          {gen.productDescription && (
            <div className="mb-4" >
              <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Description</p>
              <div className="text-sm text-zinc-600 line-clamp-2 leading-relaxed font-medium">{gen.productDescription}</div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <GhostButton
              className="text-xs px-6 py-3 w-full justify-center !rounded-xl font-bold"
              onClick={() => {
                navigate(`/results/${gen.id}`);
                scrollTo(0, 0)
              }}>
              View Full Details
            </GhostButton >
          </div>
        </div>
      </div>
    </div >
  )
}