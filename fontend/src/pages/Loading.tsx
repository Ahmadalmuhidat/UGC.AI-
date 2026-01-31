import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-center flex-1">
        <Loader2Icon className='size-7 animate-spin text-indigo-200' />
      </div>
    </div>
  )
}