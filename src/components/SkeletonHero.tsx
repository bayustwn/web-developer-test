export default function SkeletonHero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-3 animate-pulse">
      <div className="w-full flex flex-col gap-3">
        <div className="rounded-lg w-full md:h-[50%] bg-black/10" />
        <div className="flex mt-1 flex-row items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-black/10" />
          <div className="h-3 bg-black/10 rounded w-2/5" />
          <div className="bg-black/30 w-1 h-1 rounded-full" />
          <div className="h-3 bg-black/10 rounded w-1/4" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-5 bg-black/10 rounded w-4/5" />
          <div className="h-3 bg-black/10 rounded w-3/5" />
        </div>
        <div className="h-3 bg-black/10 rounded w-1/5" />
      </div>
      <div className="w-full h-130 col-span-2 rounded-lg relative overflow-hidden bg-black/10" />
      <div className="w-full flex gap-5 flex-col">
        <div className="flex flex-col gap-2">
          <div className="w-full rounded-lg h-35 bg-black/10" />
          <div className="flex mt-1 flex-row items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black/10" />
            <div className="h-3 bg-black/10 rounded w-2/5" />
            <div className="bg-black/30 w-1 h-1 rounded-full" />
            <div className="h-3 bg-black/10 rounded w-1/4" />
          </div>
          <div className="h-5 bg-black/10 rounded w-4/5" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full rounded-lg h-35 bg-black/10" />
          <div className="flex mt-1 flex-row items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black/10" />
            <div className="h-3 bg-black/10 rounded w-2/5" />
            <div className="bg-black/30 w-1 h-1 rounded-full" />
            <div className="h-3 bg-black/10 rounded w-1/4" />
          </div>
          <div className="h-5 bg-black/10 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}


