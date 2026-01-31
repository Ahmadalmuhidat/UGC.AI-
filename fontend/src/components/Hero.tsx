import {
  ArrowRightIcon,
  PlayIcon,
  ZapIcon,
  CheckIcon
} from 'lucide-react';
import {
  PrimaryButton,
  GhostButton
} from './Buttons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  const trustedUserImages = [
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
  ];
  const mainImageUrl = 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1600&auto=format&fit=crop';
  const galleryStripImages = [
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=100',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=100',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=100',
  ];
  const trustedLogosText = [
    'Startups',
    'Scale-ups',
    'Founders',
    'Global teams',
    'Creative brands'
  ];

  return (
    <>
      <section id="home" className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 min-h-screen max-md:w-screen max-md:overflow-hidden pt-32 md:pt-26 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <motion.a href="#" className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 hover:bg-white/10 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
              >
                <div className="flex -space-x-2">
                  {trustedUserImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="size-6 rounded-full border-2 border-gray-900"
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => <div key={s} className="size-1 rounded-full bg-yellow-500" />)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-300">
                    Trusted by 10K+ creators
                  </span>
                </div>
              </motion.a>

              <motion.h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
              >
                Create viral UGC<br />
                <span className="text-gradient">
                  in seconds
                </span>
              </motion.h1>

              <motion.p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
              >
                Upload product images and a model photo - our AI instantly generates professional lifestyle
                imagery and short-form videos optimized for Reels & TikTok.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row items-center gap-4 mb-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
              >
                <Link to="/generate" className="w-full sm:w-auto">
                  <PrimaryButton className="w-full sm:w-auto">
                    Start generating
                    <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                  </PrimaryButton>
                </Link>

                <GhostButton className="w-full sm:w-auto justify-center">
                  <PlayIcon className="size-4 fill-white/20" />
                  Watch demo
                </GhostButton>
              </motion.div>

              <motion.div className="flex sm:inline-flex items-center gap-8 text-sm text-gray-400"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <ZapIcon className="size-4 text-indigo-400" />
                  <span>Blitz Fast Generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-emerald-400" />
                  <span>Commercial Rights</span>
                </div>
              </motion.div>
            </div>

            {/* Right: modern mockup card */}
            <motion.div className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.5 }}
            >
              <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div className="glass-panel !rounded-3xl border-white/10 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.02]">
                <div className="relative aspect-16/10 bg-gray-900">
                  <img
                    src={mainImageUrl}
                    alt="agency-work-preview"
                    className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100 transition-all"
                  />

                  <div className="absolute left-6 top-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                    Social-ready . 9:16 & 16:9
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                      <PlayIcon className="size-6 fill-white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-4 flex gap-3 items-center justify-start">
                {galleryStripImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                    className="w-14 h-10 rounded-lg overflow-hidden border border-white/6"
                  >
                    <img
                      src={src}
                      alt="project-thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
                <motion.div className="text-sm text-gray-400 ml-2 flex items-center gap-2"
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                >
                  <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300" />

                    <span className="relative inline-flex size-2 rounded-full bg-green-600" />
                  </div>
                  20+ more
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <motion.section className="border-y border-white/6 bg-white/1 max-md:mt-10"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full overflow-hidden py-6">
            <div className="flex gap-14 items-center justify-center animate-marquee whitespace-nowrap">
              {trustedLogosText.concat(trustedLogosText).map((logo, i) => (
                <span
                  key={i}
                  className="mx-6 text-sm md:text-base font-semibold text-gray-400 hover:text-gray-300 tracking-wide transition-colors"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};