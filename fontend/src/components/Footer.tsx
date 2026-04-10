import { footerLinks } from '../assets/dummy-data';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function Footer() {
  return (
    <motion.footer className="bg-white border-t border-zinc-100 pt-16 pb-8 text-zinc-600"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 pb-16 border-b border-zinc-100">
          <div className="flex-1">
            <Logo className="mb-8" />
            <p className="max-w-[440px] text-base leading-relaxed text-zinc-500 font-medium">
              The ultimate AI studio for creators and brands. Transform your product photos into viral social ads with high-quality voiceovers and cinematic motion in seconds.
            </p>
          </div>

          <div className="flex flex-wrap justify-between w-full md:w-1/2 gap-10">
            {footerLinks.map((section, index) => (
              <div key={index} className="min-w-[140px]">
                <h3 className="font-bold text-lg text-zinc-900 mb-6 uppercase tracking-wider text-[10px]">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map(
                    (link: { name: string; url: string }, i) => (
                      <li key={i}>
                        <a
                          href={link.url}
                          className="text-sm font-medium hover:text-indigo-600 transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400 font-medium">
            © {new Date().getFullYear()} AI Ad Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-400 hover:text-zinc-600 text-sm font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-zinc-600 text-sm font-medium transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};