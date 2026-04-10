export default function SoftBackdrop() {
  return (
    <div className="fixed inset-0 -z-1 pointer-events-none overflow-hidden">
      <div className="absolute left-1/4 top-0 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-100/10 rounded-full blur-[100px]" />
      <div className="absolute right-0 top-1/4 w-[600px] h-[300px] bg-violet-100/10 rounded-full blur-[80px]" />
    </div>
  )
}