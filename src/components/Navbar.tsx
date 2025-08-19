export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-black font-bold -tracking-[2px] text-2xl">
        <span className="text-primary">N</span>ews.
      </h1>
      <div className="relative w-70 h-fit">
        <img
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 inset-0"
          src="/icons/search.svg"
          alt="search icon"
        />
        <input
          type="text"
          placeholder="Search News.."
          className="bg-white text-md pl-9 pr-3 border border-1 rounded-full outline-none p-2 w-full h-full"
        />
      </div>
    </div>
  );
}
