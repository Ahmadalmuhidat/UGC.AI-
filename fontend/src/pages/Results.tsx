import {
  useEffect,
  useState
} from "react";
import type { Project } from "../types";
import {
  ImageIcon,
  Loader2Icon,
  RefreshCwIcon,
  SparkleIcon,
  VideoIcon
} from "lucide-react";
import { PrimaryButton } from "../components/Buttons";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import { GhostButton } from "../components/Buttons";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useAxios } from "../hooks/useAxios";

export default function Results() {
  const [project, setProjectData] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { projectId } = useParams();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const axios = useAxios();

  const fetchProjectData = async () => {
    try {
      setIsGenerating(true);
      setLoading(true);

      const { data, status } = await axios.get(`/api/projects/${projectId}`);

      if (status === 200) {
        setProjectData(data.project);
        setIsGenerating(data.project.isGenerating);
        setLoading(false);
      } else {
        toast.error('Failed to fetch project data');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsGenerating(false);
      setLoading(false);
    }
  }

  const handleGenerateVideo = async () => {
    try {
      if (!project.id) return

      setIsGenerating(true);
      setLoading(true);

      const { data, status } = await axios.post(`/api/projects/video`, {
        id: project.id
      });

      if (status == 200) {
        setProjectData(prev => ({ ...prev, generatedVideo: data.videoUrl, isGenerating: false }));
        setIsGenerating(false);
        setLoading(false);
        toast.success("Video generated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsGenerating(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchProjectData()
    } else if (isLoaded && !user) {
      navigate('/')
    }
  }, [user])

  useEffect(() => {
    if (user && isGenerating) {
      const interval = setInterval(() => {
        fetchProjectData()
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isGenerating])

  return loading ? (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <Loader2Icon className='animate-spin text-indigo-600 size-12' />
    </div >
  ) : (
    <div className="min-h-screen p-6 md:p-12 mt-20 bg-white">
      <div className="max-w-6xl mx-auto mb-20">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">Your Result</h1>
          <Link to="/generate" className="btn-secondary text-sm flex items-center gap-2 shadow-sm">
            <RefreshCwIcon className="size-4" />
            <span className="max-sm:hidden font-bold uppercase tracking-wider text-[10px]">New Project</span>
          </Link>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="premium-card p-4 !rounded-[2.5rem] border-zinc-100 shadow-sm">
              <div className={`${project?.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'} max-h-[800px] rounded-[1.5rem] bg-zinc-50 overflow-hidden relative shadow-inner`}>
                {project?.generatedVideo ? (
                  <video src={project.generatedVideo} controls autoPlay loop className="w-full h-full object-cover" />
                ) : (
                  <img src={project.generatedImage} alt="Generated Result" className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="premium-card p-10 !rounded-[2.5rem] border-zinc-100 shadow-sm">
              <h3 className="text-xl font-bold mb-8 text-zinc-900">Download Assets</h3>
              <div className="flex flex-col gap-6">
                <a href={project.generatedImage} download className="w-full">
                  <GhostButton disabled={!project.generatedImage} className="w-full justify-center !rounded-2xl !py-5 font-bold disabled:opacity-50 text-sm">
                    <ImageIcon className="size-5" /> Image HD
                  </GhostButton>
                </a>
                <a href={project.generatedVideo} download className="w-full">
                  <GhostButton disabled={!project.generatedVideo} className="w-full justify-center !rounded-2xl !py-5 font-bold disabled:opacity-50 text-sm">
                    <VideoIcon className="size-5" /> Video 1080p
                  </GhostButton>
                </a>
              </div>
            </div>

            <div className="premium-card p-10 !rounded-[2.5rem] border-zinc-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-zinc-900">AI Video Engine</h3>
              <p className="text-zinc-500 text-sm mb-10 font-medium leading-relaxed">Our AI agents can animate this scene into a viral TikTok ad with cinematic motion. </p>
              {!project.generatedVideo ? (
                <PrimaryButton onClick={handleGenerateVideo} disabled={isGenerating} className="w-full !rounded-2xl !py-5 shadow-xl shadow-indigo-100 text-lg">
                  {isGenerating ? (
                    <><Loader2Icon className="size-6 animate-spin" /> Animating...</>
                  ) : (
                    <><SparkleIcon className="size-6" /> Animate Scene</>
                  )}
                </PrimaryButton>
              ) : (
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl text-emerald-700 text-center text-base font-bold shadow-sm">
                  Video Rendered 🚀
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}