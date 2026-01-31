export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-70 ${className}`} {...props} >
    <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-indigo-700 transition-all group-hover:scale-105" />
    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/20" />
    <span className="relative flex items-center gap-2">{children}</span>
  </button>
);

export const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm active:scale-95 transition-all duration-300 ${className}`} {...props} >
    {children}
  </button>
);