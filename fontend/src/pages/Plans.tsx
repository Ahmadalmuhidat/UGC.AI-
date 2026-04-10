import Pricing from "../components/Pricing";

export default function Plans() {
  return (
    <div className="pt-32 pb-20 bg-zinc-50/20 min-h-screen">
      <Pricing />
      <div className="max-w-2xl mx-auto px-8">
        <p className="text-center text-zinc-500 text-lg font-medium mt-16 leading-relaxed">
          Create stunning images for just <span className='text-indigo-600 font-bold'>5 credits</span>
          and generate immersive videos for <span className='text-indigo-600 font-bold'>10 credits</span>.
        </p>
      </div>
    </div>
  )
}