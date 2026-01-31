import { motion } from 'framer-motion';

interface TitleProps {
  title?: string;
  heading?: string;
  description?: string;
}

export default function Title({ title, heading, description }: TitleProps) {
  return (
    <div className="text-center mb-16">
      {title && (
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
          className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4 bg-indigo-500/10 inline-block px-4 py-1.5 rounded-full border border-indigo-500/20"
        >
          {title}
        </motion.p>
      )}
      {heading && (
        <motion.h2 className="text-3xl md:text-5xl text-white font-bold tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
        >
          {heading}
        </motion.h2>
      )}
      {description && (
        <motion.p className='max-w-2xl mx-auto text-base text-gray-400 mt-4 leading-relaxed'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}