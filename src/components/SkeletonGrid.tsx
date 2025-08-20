interface SkeletonGridProps {
  count?: number;
}

export default function SkeletonGrid({ count = 8 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-3 gap-y-10 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-3">
          <div className="w-full rounded-lg h-50 bg-black/10" />
          <div className="flex mt-1 flex-row items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black/10" />
            <div className="h-3 bg-black/10 rounded w-2/5" />
            <div className="bg-black/30 w-1 h-1 rounded-full" />
            <div className="h-3 bg-black/10 rounded w-1/4" />
          </div>
          <div className="h-4 bg-black/10 rounded w-4/5" />
          <div className="h-3 bg-black/10 rounded w-3/5" />
          <div className="h-3 bg-black/10 rounded w-2/5" />
        </div>
      ))}
    </div>
  );
}


