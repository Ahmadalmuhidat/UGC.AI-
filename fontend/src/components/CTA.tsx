import { ArrowRightIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20 2xl:pb-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-panel !rounded-[2.5rem] border-white/10 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <motion.h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
              Ready to go viral?
            </motion.h2>
            <motion.p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
            >
              Join thousands of brands using our AI to generate high-converting ads in minutes. Start creating your first ad studio session today.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
            >
              <Link to="/generate">
                <PrimaryButton className="px-10 py-4 text-base shadow-2xl shadow-indigo-500/20">
                  Start Creating Now
                  <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                </PrimaryButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};