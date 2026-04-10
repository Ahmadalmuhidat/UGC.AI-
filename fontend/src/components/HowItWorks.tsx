import { UploadCloudIcon, SparklesIcon, Share2Icon } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <UploadCloudIcon className="size-6 text-indigo-600" />,
    title: "1. Upload Assets",
    description: "Drop your raw product photos and a model reference. Our vision model identifies key features instantly.",
    image: "/assets/tests/product7.png"
  },
  {
    icon: <SparklesIcon className="size-6 text-violet-600" />,
    title: "2. AI Agent Processing",
    description: "Our autonomous agents write scripts, select voices, and blend scenes with cinematic lighting.",
    isProcessing: true
  },
  {
    icon: <Share2Icon className="size-6 text-emerald-600" />,
    title: "3. Go Viral",
    description: "Download your high-converting UGC video in 9:16 or 16:9 formats, ready for TikTok & Reels.",
    image: "/assets/tests/generated1.png"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4">The Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">How it works</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col">
              <div className="premium-card !rounded-[2.5rem] p-4 mb-8 bg-zinc-50 border-zinc-100 shadow-sm relative overflow-hidden group">
                {step.image ? (
                  <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/5] rounded-[1.5rem] bg-white flex flex-col items-center justify-center p-8 text-center border border-zinc-100">
                    <div className="size-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6 relative">
                       <SparklesIcon className="size-10 text-indigo-600 animate-pulse" />
                       <div className="absolute inset-0 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                    </div>
                    <div className="w-full space-y-3">
                       <div className="h-2 bg-zinc-100 rounded-full w-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-indigo-600"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                       </div>
                       <div className="h-2 bg-zinc-50 rounded-full w-2/3 mx-auto" />
                    </div>
                    <p className="mt-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">Analyzing Scenery...</p>
                  </div>
                )}
                
                {/* Step number badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-900">
                  Step 0{i + 1}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                  {step.icon}
                </div>
                <h4 className="text-xl font-black text-zinc-900">{step.title}</h4>
              </div>
              <p className="text-zinc-500 font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
