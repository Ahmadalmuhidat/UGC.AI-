import { featuresData } from '../assets/dummy-data';

export default function Features() {
  const visuals = [
    '/assets/tests/generated2.png',
    '/assets/tests/generated3.png',
    '/assets/tests/generated4.png'
  ];

  return (
    <section id="features" className="py-24 bg-zinc-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6">Engineered for Performance</h2>
              <h3 className="text-4xl md:text-6xl font-black text-zinc-900 leading-tight mb-8">Built for high-volume advertising.</h3>
              <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-12 max-w-xl">
                 Our proprietary AI vision stack handles the heavy lifting, from scenic blending to cinematic camera motion, so you can focus on scaling.
              </p>

              <div className="space-y-10">
                {featuresData.map((feature, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="size-14 shrink-0 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-indigo-600 shadow-sm group-hover:border-indigo-600 transition-colors duration-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-zinc-900 mb-2">{feature.title}</h4>
                      <p className="text-zinc-500 font-medium leading-relaxed max-w-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <div className="premium-card !rounded-3xl overflow-hidden aspect-[4/5] shadow-xl border-white/50">
                       <img src={visuals[0]} alt="Ad Example 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="premium-card !rounded-3xl overflow-hidden aspect-[4/5] scale-90 translate-x-4 shadow-lg border-white/20 opacity-60">
                       <img src={visuals[1]} alt="Ad Example 2" className="w-full h-full object-cover" />
                    </div>
                 </div>
                 <div className="pt-12 space-y-4">
                    <div className="premium-card !rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border-white/80 translate-y-4">
                       <img src={visuals[2]} alt="Ad Example 3" className="w-full h-full object-cover" />
                    </div>
                    <div className="size-48 bg-indigo-600/5 rounded-full blur-3xl absolute -bottom-10 -right-10 -z-10" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}