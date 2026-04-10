import {
  useEffect,
  useState
} from "react";
import type { Project } from "../types/index";
import ProjectCard from "../components/ProjectCard";
import { Loader2Icon } from "lucide-react";
import { PrimaryButton } from "../components/Buttons";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import toast from "react-hot-toast";

export default function MyGenerations() {
  const axios = useAxios();
  const [generations, setGenerations] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const fetchGenerations = async () => {
    try {
      const { data, status } = await axios.get("/api/projects");
      if (status === 200) {
        setGenerations(data.projects);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchGenerations();
    } else if (isLoaded && !user) {
      navigate('/');
    }
  }, [isLoaded, user]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Loader2Icon className='size-12 animate-spin text-indigo-600' />
    </div>
  ) : (
    <div className="min-h-screen p-6 md:p-12 my-28 bg-zinc-50/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16" >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">My Generations</h1>
          <p className="text-zinc-600 text-lg font-medium">View and manage your AI-generated content</p>
        </header >

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {generations?.map((generation) => {
            return (
              <ProjectCard key={generation.id} gen={generation} setGenerations={setGenerations} />
            )
          })}
        </div>

        {generations && generations.length === 0 && (
          <div className="text-center py-32 premium-card rounded-[2.5rem] border-zinc-100">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">No generations yet</h3>
            <p className="text-zinc-500 mb-10 font-medium">Start creating stunning product photos today.</p>
            <PrimaryButton onClick={() => navigate('/generate')}>
              Create New Generation
            </PrimaryButton >
          </div>
        )}
      </div>
    </div >
  )
}