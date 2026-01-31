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

  const feTchGenerations = async () => {
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
      feTchGenerations();
    } else if (isLoaded && !user) {
      navigate('/');
    }
  }, [isLoaded, user]);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2Icon className='size-7 animate-spin text-indigo-400' />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12 my-28">
      <div className="max-w-6x] mx-auto">
        <header className="mb-12" >
          <h1 className="text-3x1 md:text-4xl font-semibold mb-4">My Generations</h1>
          <p className="text-gray-400">View and manage your AI-generated content</p>
        </header >

        <div>
          {generations?.map((generation) => {
            return (
              <ProjectCard key={generation.id} gen={generation} setGenerations={setGenerations} />
            )
          })}
        </div>

        {generations && generations.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-x1 border border-white/10">
            <h3 className="text-xl font-medium mb-2">No generations yet</h3>
            <p className="text-gray-400 mb-6">Start creating stunning product photos</p>
            <PrimaryButton onClick={() => window.location.href = '/generate'}>Create New Generation</PrimaryButton >
          </div>
        )}
      </div>
    </div >
  )
}