interface TitleProps {
  title?: string;
  heading?: string;
  description?: string;
}

export default function Title({ title, heading, description }: TitleProps) {
  return (
    <div className="text-center mb-20">
      {title && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-6">
          {title}
        </span>
      )}
      {heading && (
        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 leading-tight tracking-tight">
          {heading}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl mx-auto text-xl text-zinc-500 mt-8 leading-relaxed font-medium">
          {description}
        </p>
      )}
    </div>
  );
}