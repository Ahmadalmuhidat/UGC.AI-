import { SparklesIcon, VideoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link 
      to="/" 
      onClick={() => window.scrollTo(0, 0)} 
      className={`flex items-center gap-2 group transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="relative">
        <div className="size-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
          <VideoIcon className="size-5 text-white fill-white/20" />
        </div>
        <div className="absolute -top-1 -right-1 size-4 rounded-full bg-white flex items-center justify-center border border-indigo-50 shadow-sm">
          <SparklesIcon className="size-2.5 text-indigo-600 fill-indigo-600" />
        </div>
      </div>
      <span className="text-xl font-black tracking-tighter text-zinc-900">
        ViralAds<span className="text-indigo-600 italic">.ai</span>
      </span>
    </Link>
  );
}
