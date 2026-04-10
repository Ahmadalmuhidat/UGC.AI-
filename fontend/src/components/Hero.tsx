import {
  ArrowRightIcon,
  PlayIcon,
  ZapIcon,
  CheckIcon,
  SparkleIcon
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
  const mainImageUrl = '/assets/hero.png';
  const galleryStripImages = [
    '/assets/tests/product1.jpg',
    '/assets/tests/product2.jpg',
    '/assets/tests/product3.jpg',
  ];
  const trustedLogosText = [
    'Shopify Plus',
    'Amazon FBA',
    'TikTok Shop',
    'Instagram Business',
    'DTC Brands'
  ];

  return (
    <>
      <section id="home" className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 min-h-[90vh] pt-32 md:pt-40 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <motion.div className="inline-flex items-center gap-3 pl-3 pr-4 py-2 rounded-full bg-indigo-50/50 border border-indigo-100 mb-8 hover:bg-indigo-50 transition-colors shadow-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {trustedUserImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Member ${i + 1}`}
                      className="size-6 rounded-full border-2 border-white shadow-sm"
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-black text-indigo-600">
                    Trusted by 12,000+ DTC Brands
                  </span>
                </div>
              </motion.div>

              <motion.h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 tracking-tight text-zinc-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Turn product photos into <br />
                <span className="text-indigo-600 italic">
                  viral video ads.
                </span>
              </motion.h1>

              <motion.p className="text-zinc-600 text-xl max-w-lg mb-12 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our AI agents analyze your products and instantly generate cinematic UGC videos optimized for TikTok, Reels, and Meta Ads. No studio required.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row items-center gap-5 mb-14"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/generate" className="w-full sm:w-auto">
                  <PrimaryButton className="w-full sm:w-auto !py-4.5 !px-10 text-lg shadow-xl shadow-indigo-100">
                    Get Started Free
                    <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                  </PrimaryButton>
                </Link>

                <GhostButton className="w-full sm:w-auto justify-center !py-4.5 !px-10 border-zinc-200">
                  <PlayIcon className="size-5 fill-zinc-900 text-zinc-900" />
                  See Examples
                </GhostButton>
              </motion.div>

              <motion.div className="flex flex-wrap items-center gap-x-10 gap-y-6 text-sm text-zinc-400 font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <ZapIcon className="size-5 text-indigo-600" />
                  <span>Render in 60s</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="size-5 text-emerald-600" />
                  <span>No Subscription Needed</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Premium mock-up using hero.png */}
            <motion.div className="relative group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative premium-card !rounded-[2.5rem] border-zinc-100 overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] transition-all duration-700 hover:shadow-[0_32px_64px_-12px_rgba(79,70,229,0.12)]">
                <div className="relative aspect-[4/5] md:aspect-[3/4] bg-zinc-50">
                  <img
                    src={mainImageUrl}
                    alt="AI Ad Platform Preview"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* High-end floating overlay */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="size-10 rounded-full bg-indigo-600 flex items-center justify-center">
                              <SparkleIcon className="size-5 text-white" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Processing Status</p>
                              <p className="text-sm font-black text-zinc-900">AI Scripting Complete</p>
                           </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">Ready</div>
                     </div>
                     <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-indigo-600 rounded-full" />
                     </div>
                  </div>
                </div>
              </div>

              {/* Smaller secondary assets */}
              <div className="mt-8 flex gap-4 items-center justify-start">
                {galleryStripImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="w-20 h-16 rounded-2xl overflow-hidden border-2 border-zinc-100 shadow-sm transition-transform hover:-translate-y-1"
                  >
                    <img
                      src={src}
                      alt="Product input"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </motion.div>
                ))}
                <div className="text-sm text-zinc-400 font-black ml-2 uppercase tracking-tighter">
                  + 2,400 datasets
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUSTED PLATFORMS */}
      <section className="border-y border-zinc-100 bg-zinc-50/20 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-10">Optimized for every platform</p>
          <div className="flex flex-wrap gap-12 md:gap-24 items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {trustedLogosText.map((logo, i) => (
              <span
                key={i}
                className="text-lg md:text-xl font-black text-zinc-900 tracking-tighter"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}