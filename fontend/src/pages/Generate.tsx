import { useState } from "react";
import Title from "../components/Title";
import UploadZone from "../components/UploadZone";
import {
  Loader2Icon,
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SparkleIcon,
  Wand2Icon
} from "lucide-react";
import { PrimaryButton } from "../components/Buttons";
import {
  useUser
} from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useAxios } from "../hooks/useAxios";
import {
  useNavigate,
  useParams
} from "react-router-dom";

export default function Generate() {
  const [name] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [aspectRatio, setAspectRatio] = useState("9:16");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [userprompt, setUserprompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const axios = useAxios();
  const { user } = useUser();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleFilechange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'model') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'product') {
        setProductImage(e.target.files[0]);
      }
      else {
        setModelImage(e.target.files[0]);
      }
    }
  }

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      if (!user) {
        toast.error('Please sign in to generate');
        return;
      }

      if (!productImage || !modelImage) {
        toast.error('Please upload both product and model images');
        return;
      }

      if (!productName) {
        toast.error('Please enter product name');
        return;
      }

      if (!userprompt) {
        toast.error('Please enter user prompt');
        return;
      }

      setIsGenerating(true);

      const formData = new FormData();

      formData.append('id', projectId!);
      formData.append('name', name);
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('aspectRatio', aspectRatio);
      formData.append('userPrompt', userprompt);
      formData.append('images', productImage!);
      formData.append('images', modelImage!);

      const { data, status } = await axios.post('/api/projects', formData);

      if (status === 200) {
        toast.success('Video generated successfully');
      }

      setIsGenerating(false);
      navigate('/results/' + data.project.id);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-12 pt-32 bg-white">
      <div className="max-w-6xl mx-auto mb-40">
        <Title
          heading="AI Ad Studio"
          description="Transform your product photos into high-converting UGC videos using advanced AI agents." />

        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Left: Uploads */}
          <div className="lg:col-span-4 space-y-8">
            <div className="premium-card p-8 !rounded-3xl space-y-10 border-zinc-100 shadow-sm">
              <UploadZone
                label="Product Image"
                file={productImage}
                onClear={() => setProductImage(null)}
                onChange={(e) => handleFilechange(e, "product")} />
              <UploadZone
                label="Model Image"
                file={modelImage}
                onClear={() => setModelImage(null)}
                onChange={(e) => handleFilechange(e, "model")} />
            </div>

            <div className="premium-card p-8 !rounded-3xl border-zinc-100 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6">Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl transition-all border-2 ${aspectRatio === '9:16' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200 hover:bg-zinc-50'}`}
                >
                  <RectangleVerticalIcon className="size-6" />
                  <span className="text-[10px] font-bold">9:16 Portrait</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl transition-all border-2 ${aspectRatio === '16:9' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm' : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200 hover:bg-zinc-50'}`}
                >
                  <RectangleHorizontalIcon className="size-6" />
                  <span className="text-[10px] font-bold">16:9 Cinema</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="premium-card p-10 !rounded-[2.5rem] space-y-10 border-zinc-100 shadow-sm">
              <div className="space-y-4">
                <label htmlFor="productName" className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Product Identity</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Urban Nomad Backpack"
                  required
                  className="w-full bg-zinc-50 rounded-2xl border border-zinc-200 p-5 text-base font-bold focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="productDescription" className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Product Features <span className="text-zinc-400 font-normal ml-2">(Optional)</span></label>
                <textarea
                  id="productDescription"
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Describe your product's unique selling points..."
                  className="w-full bg-zinc-50 rounded-2xl border border-zinc-200 p-5 text-base font-bold focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none resize-none transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="userPrompt" className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Creative Direction <span className="text-zinc-400 font-normal ml-2">(Optional)</span></label>
                <textarea
                  id="userPrompt"
                  rows={4}
                  value={userprompt}
                  onChange={(e) => setUserprompt(e.target.value)}
                  placeholder="How should the AI agent pitch your product? e.g. 'Energetic, modern, focused on durability'"
                  className="w-full bg-white rounded-3xl border-2 border-indigo-100 p-6 text-base font-bold text-zinc-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none resize-none transition-all placeholder:text-zinc-400 shadow-sm"
                />
              </div>

              <div className="pt-4">
                <PrimaryButton disabled={isGenerating} className="w-full !rounded-2xl !py-5 text-lg shadow-xl shadow-indigo-100">
                  {isGenerating ? (
                    <>
                      <Loader2Icon className="size-6 animate-spin" /> Generating Magic...
                    </>
                  ) : (
                    <>
                      <Wand2Icon className="size-6" /> Generate Viral Ad
                    </>
                  )}
                </PrimaryButton>
              </div>
            </div>

            <div className="flex items-center gap-6 px-10 py-8 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 shadow-sm">
              <SparkleIcon className="size-6 text-indigo-600 shrink-0" />
              <p className="text-sm text-indigo-900 font-bold leading-relaxed">
                Our AI agents will analyze your images, write a script, and generate a video with high-quality voiceover and transitions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}