import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="flex items-center justify-center flex-1">
        <Loader2Icon className='size-12 animate-spin text-indigo-600' />
      </div>
    </div>
  )
}