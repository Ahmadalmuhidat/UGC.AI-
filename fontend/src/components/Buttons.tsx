export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-70 ${className}`} {...props} >
    <div className="absolute inset-0 bg-indigo-600 transition-all group-hover:bg-indigo-700" />
    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
    <span className="relative flex items-center gap-2">{children}</span>
  </button>
);

export const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-900 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md ${className}`} {...props} >
    {children}
  </button>
);