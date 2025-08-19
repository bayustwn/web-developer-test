import AuthorDate from "./components/AuthorDate";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="relative overflow-hidden">
      <img src="/icons/grid.svg" className="absolute -top-40 scale-x-[1.2]" alt="grid" />
      <img src="/icons/grid.svg" className="absolute -bottom-70 right-0 scale-x-[1.2] transform rotate-180" alt="grid" />
      <section>
        <div className="mb-10 ">
          <Navbar />
        </div>
        <div className="mb-10">
          <div className="text-center">
            <div className="flex justify-center items-center flex-col gap-3">
              <h1 className="font-semibold text-lg">
                Welcome to <span className="text-primary">N</span>ews.
              </h1>
              <p className="w-80">
                Your <span className="text-primary font-bold">Ultimate</span>{" "}
                Destination for the Latest Breakthroughs, Innovations, and
                Insights in{" "}
                <span className="text-primary font-bold">
                  Artificial Intelligence
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="w-full flex flex-col gap-3">
            <img
              src="/image/placeholder.webp"
              className="rounded-lg object-cover w-full h-[50%]"
              alt="placeholder"
            />
            <AuthorDate author="Aswin Pranaja" date="20 Juli 2025" />
            <div className="flex flex-col gap-2">
              <h1 className="line-clamp-2 font-bold text-xl">
                Berita Tentang AI yang menjarah Tempat Umum, Akibatkan Kerugian
                2 Miliar
              </h1>
              <p className="line-clamp-2 text-sm">
                Berita Tentang AI yang menjarah Tempat Umum yang susah dan
                melihat semuanya, kuasai pernafasan udara untuk mengendalikan
                dunia agar kamu tahu rasanya.
              </p>
            </div>
            <p className="underline text-primary cursor-pointer font-semibold text-sm">
              Read More →
            </p>
          </div>
          <div className="w-full h-130 col-span-2 rounded-lg relative overflow-hidden">
            <img
              src="/image/placeholder.webp"
              className="rounded-lg object-cover w-full h-full"
              alt="placeholder"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg"></div>
            <div className="absolute flex flex-col gap-2 bottom-0 left-0 p-5 text-white text-sm z-10">
              <div className="flex items-center flex-row gap-2">
                <img src="/icons/author.svg" alt="search" className="w-3 h-3" />
                <p>Aswin Pranaja</p>
              </div>
              <h1 className="leading-6 line-clamp-2 text-xl font-semibold">
                Berita Tentang AI yang menjarah Tempat Umum, Akibatkan Kerugian
                2 Miliar
              </h1>
              <p className="line-clamp-2 text-sm">
                Berita Tentang AI yang menjarah Tempat Umum yang susah dan
                melihat semuanya, kuasai pernafasan udara untuk mengendalikan
                dunia agar kamu tahu rasanya.
              </p>
              <div className="flex mt-2 items-center flex-row gap-2">
                <img src="/icons/date.svg" alt="search" className="w-3 h-3" />
                <p className="text-xs text-white/80">20 Juli 2025</p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-5  flex-col">
            <div className="flex flex-col gap-2">
              <img
                src="/image/placeholder.webp"
                className="w-full rounded-lg h-35 object-cover"
                alt="news"
              />
              <AuthorDate author="Aswin Pranaja" date="20 Juli 2025" />
              <h1 className="font-bold text-xl line-clamp-2">
                Berita Tentang AI yang menjarah Tempat Umum, Akibatkan Kerugian
                2 Miliar{" "}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <img
                src="/image/placeholder.webp"
                className="w-full rounded-lg h-35 object-cover"
                alt="news"
              />
              <AuthorDate author="Aswin Pranaja" date="20 Juli 2025" />
              <h1 className="font-bold text-xl line-clamp-2">
                Berita Tentang AI yang menjarah Tempat Umum, Akibatkan Kerugian
                2 Miliar{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex h-[1px] mx-30 my-15 bg-black/30 rounded-full"></div>
        <div>
          <h1 className="font-bold text-2xl mb-10">Lastest News.</h1>
          <div className="grid grid-cols-4 gap-x-3 gap-y-10">
            {Array.from({ length: 8 }).map((_, index) => {
              return (
                <div key={index} className="flex flex-col gap-3">
                  <img
                    src="/image/placeholder.webp"
                    className="w-full rounded-lg h-50 object-cover"
                    alt="news"
                  />
                  <AuthorDate author="Aswin Pranaja" date="20 Juli 2025" />
                  <h1 className="font-bold text-lg line-clamp-2">
                    Berita Tentang AI yang menjarah Tempat Umum, Akibatkan
                    Kerugian 2 Miliar{" "}
                  </h1>
                  <p className="line-clamp-2 text-sm">
                    Berita Tentang AI yang menjarah Tempat Umum yang susah dan
                    melihat semuanya, kuasai pernafasan udara untuk
                    mengendalikan dunia agar kamu tahu rasanya.
                  </p>
                  <a className="underline text-primary cursor-pointer font-semibold text-sm">
                    Read More →
                  </a>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center mt-10">
            <p className="cursor-pointer bg-primary/5 w-fit px-5 font-semibold text-primary py-2 rounded-full text-sm text-black/50 mt-5">
              Show More →
            </p>
          </div>
        </div>
        <div className="flex h-[1px] mx-30 my-15 bg-black/30 rounded-full"></div>
        <div className="flex flex-row justify-between w-full items-center flex-col mb-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">N</span>ews.
            </h1>
            <p className="w-80">
              Latest Breakthroughs, Innovations, and Insights in{" "}
              <span className="text-primary font-semibold">
                Artificial Intelligence
              </span>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            {Array.from([
              {
                name: "X",
                icons: "x.svg",
              },
              {
                name: "Instagram",
                icons: "ig.svg",
              },
              
              {
                name: "Email",
                icons: "email.svg",
              },
            ]).map((icons, index) => (
              <img
                key={index}
                src={`/icons/${icons.icons}`}
                className={`w-` + (5 + index-1)}
                alt={icons.name}
              />
            ))}
          </div>
        </div>
        <div>
        </div>
      </section>
      <p className="text-black/50 text-center mb-3 text-sm">© News. All Right Reserved | Bayu Setiawan 2025</p>
    </div>
  );
}

export default App;
