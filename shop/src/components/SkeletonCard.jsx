export default function SkeletonCard() {
  return (
    <div className="bg-navy-2 border border-white/5 rounded-xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-52 shimmer-bg" />

      {/* Content placeholders */}
      <div className="p-4 space-y-3">
        {/* Category pill */}
        <div className="h-4 w-20 shimmer-bg rounded-full" />
        {/* Title */}
        <div className="h-4 w-3/4 shimmer-bg rounded" />
        {/* Price + rating row */}
        <div className="flex justify-between">
          <div className="h-5 w-16 shimmer-bg rounded" />
          <div className="h-4 w-12 shimmer-bg rounded" />
        </div>
        {/* Button */}
        <div className="h-9 w-full shimmer-bg rounded-lg" />
      </div>
    </div>
  )
}
