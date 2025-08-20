import { useEffect, useRef, useState } from "react";
import AuthorDate from "./components/AuthorDate";
import SkeletonHero from "./components/SkeletonHero";
import SkeletonGrid from "./components/SkeletonGrid";
import Navbar from "./components/Navbar";
import axios from "axios";
import type { News } from "./model/News";
import { mappers } from "./utils/Mapper";
import NewsList from "./components/NewsList";

function App() {
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<News[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [debounce, setDebounce] = useState("");
  const limit = 3;
  const language = "en";
  const prevNewsCountRef = useRef(0);
  const shouldScrollOnAppendRef = useRef(false);

  const getNewsKey = (item: News): string => {
    const byUrl = item.url?.trim();
    if (byUrl && byUrl.length > 0) return byUrl;
    const byId = item.id?.toString().trim();
    if (byId && byId.length > 0) return byId;
    const byTitleDate = `${item.title ?? ""}|${item.published_at ?? ""}`.trim();
    return byTitleDate;
  };

  const getAllNews = async () => {
    try {
      setLoading(true);
      const [news1, news2, news3] = await Promise.all([
        axios.get(`https://api.thenewsapi.com/v1/news/all?`, {
          params: {
            page,
            limit,
            language,
            search: "artificial intelligence AI",
            api_token: import.meta.env.VITE_PUBLIC_THENEWSAPI,
          },
        }),
        axios.get(`https://eventregistry.org/api/v1/article/getArticles?`, {
          params: {
            apiKey: import.meta.env.VITE_PUBLIC_EVENTREGISTRY,
            articlesPage: page,
            articlesCount: limit,
            keyword: "artificial intelligence AI",
            language: "eng",
            articlesSortBy: "date",
          },
        }),
        axios.get(`https://news.fcsapi.com/api/news?`, {
          params: {
            find: "artificial intelligence AI",
            language,
            limit,
            offset: (page - 1) * limit,
            access_key: import.meta.env.VITE_PUBLIC_FCAPI,
          },
        }),
      ]);

      const allNews = [
        ...news1.data.data.map(mappers.news1),
        ...news2.data.articles.results.map(mappers.news2),
        ...news3.data.response.map(mappers.news3),
      ];

      setNews((old) => {
        const seen = new Set<string>();
        const result: News[] = [];
        const addUnique = (items: News[]) => {
          for (const n of items) {
            const key = getNewsKey(n);
            if (!key || seen.has(key)) continue;
            seen.add(key);
            result.push(n);
          }
        };

        if (page === 1) {
          addUnique(allNews);
        } else {
          addUnique(old);
          addUnique(allNews);
        }

        return result;
      });
    } catch (error) {
      alert("Something went wrong, please try again later." + error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchNews = async (keyword: string, page: number) => {
    try {
      setSearchLoading(true);
      const query = `"artificial intelligence" OR AI AND ${keyword}`;

      const [news1, news2, news3] = await Promise.all([
        axios.get(`https://api.thenewsapi.com/v1/news/all?`, {
          params: {
            page,
            limit,
            language,
            search: query,
            api_token: import.meta.env.VITE_PUBLIC_THENEWSAPI,
          },
        }),
        axios.get(`https://eventregistry.org/api/v1/article/getArticles?`, {
          params: {
            apiKey: import.meta.env.VITE_PUBLIC_EVENTREGISTRY,
            articlesPage: page,
            articlesCount: limit,
            keyword: query,
            language: "eng",
            articlesSortBy: "date",
          },
        }),
        axios.get(`https://news.fcsapi.com/api/news?`, {
          params: {
            find: query,
            language,
            limit,
            offset: (page - 1) * limit,
            access_key: import.meta.env.VITE_PUBLIC_FCAPI,
          },
        }),
      ]);

      const allNews = [
        ...news1.data.data.map(mappers.news1),
        ...news2.data.articles.results.map(mappers.news2),
        ...news3.data.response.map(mappers.news3),
      ];

      setSearchResults((old) => {
        if (page === 1) return allNews;
        return [...old, ...allNews];
      });
    } catch (error) {
      alert("Search failed: " + error);
    } finally {
      setSearchLoading(false);
    }
  };

  const nextPage = () => {
    if (loading || searchLoading) return;
    shouldScrollOnAppendRef.current = true;

    const next = page + 1;
    setPage(next);

    if (search) {
      getSearchNews(search, next);
    } else {
      getAllNews();
    }
  };

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
  };

  useEffect(() => {
    getAllNews();
  }, [page]);

  useEffect(() => {
    if (debounce) {
      setPage(1);
      setSearchResults([]);
      getSearchNews(debounce, 1);
    }
  }, [debounce]);

  useEffect(() => {
    const bounce = setTimeout(() => {
      setDebounce(search);
    }, 500);

    return () => {
      clearTimeout(bounce);
    };
  }, [search]);

  useEffect(() => {
    const prevCount = prevNewsCountRef.current;
    if (shouldScrollOnAppendRef.current && news.length > prevCount) {
      window.scrollBy({ top: -300, behavior: "smooth" });
      shouldScrollOnAppendRef.current = false;
    }
    prevNewsCountRef.current = news.length;
  }, [news.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src="/icons/grid.svg"
        className="absolute -z-99 -bottom-70 right-0 scale-x-[1.2] transform rotate-180"
        alt="grid"
      />
      <section className="z-10">
        <div className="mb-10 ">
          <Navbar onSearch={handleSearch} />
        </div>
        {search ? (
          <div className="min-h-screen flex flex-col">
            <div className="w-full flex-start">
              <p className="font-semibold text-2xl">{!searchLoading && searchResults.length === 0 ? "No " : ""}Results for "{search}":</p>
            </div>
            <div className="w-full mt-5">
              {searchLoading && searchResults.length === 0 ? (
                <SkeletonGrid />
              ) : (
                <NewsList news={searchResults} />
              )}
            </div>
            <div className="flex justify-center items-center mt-10">
              <p
                onClick={nextPage}
                className={`bg-primary/5 w-fit px-5 font-semibold text-primary py-2 rounded-full text-sm text-black/50 mt-5 ${
                  searchLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {searchLoading ? "Loading..." : "Show More →"}
              </p>
            </div>
            <div className="mt-auto">
              <div className="flex h-[1px] mx-20 my-15 bg-black/30 rounded-full"></div>
              <div className="flex flex-col md:flex-row md:gap-0 gap-10 md:justify-between w-full items-center flex-col mb-10">
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
                <div className="flex w-full md:justify-end justify-start flex-row gap-3">
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
                      className={`w-4`}
                      alt={icons.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img
              src="/icons/grid.svg"
              className="absolute -z-99 -top-40 scale-x-[1.2]"
              alt="grid"
            />
            <div className="mb-10">
              <div className="text-center">
                <div className="flex justify-center items-center flex-col gap-3">
                  <h1 className="font-semibold text-lg">
                    Welcome to <span className="text-primary">N</span>ews.
                  </h1>
                  <p className="w-80">
                    Your{" "}
                    <span className="text-primary font-bold">Ultimate</span>{" "}
                    Destination for the Latest Breakthroughs, Innovations, and
                    Insights in{" "}
                    <span className="text-primary font-bold">
                      Artificial Intelligence
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {loading && news.length === 0 ? (
              <SkeletonHero />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-3">
                <div className="w-full flex flex-col gap-3">
                  <img
                    src={news[0]?.image}
                    className="rounded-lg object-cover w-full md:h-[50%]"
                    alt="news"
                  />
                  <AuthorDate
                    author={news[0]?.author}
                    date={news[0]?.published_at}
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="line-clamp-2 font-bold text-xl">
                      {news[0]?.title}
                    </h1>
                    <p className="line-clamp-2 text-sm">
                      {news[0]?.description}
                    </p>
                  </div>
                  <a
                    href={news[0]?.url}
                    target="_blank"
                    className="underline text-primary cursor-pointer font-semibold text-sm"
                  >
                    Read More →
                  </a>
                </div>
                <div className="w-full h-130 md:col-span-2 rounded-lg relative overflow-hidden">
                  <img
                    src={news[1]?.image}
                    className="rounded-lg object-cover w-full h-full"
                    alt="placeholder"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg"></div>
                  <div className="absolute flex flex-col gap-2 bottom-0 left-0 p-5 text-white text-sm z-10">
                    <div className="flex items-center flex-row gap-2">
                      <img
                        src="/icons/author.svg"
                        alt="search"
                        className="w-3 h-3"
                      />
                      <p>{news[1]?.author}</p>
                    </div>
                    <h1 className="leading-6 line-clamp-2 text-xl font-semibold">
                      {news[1]?.title}
                    </h1>
                    <p className="line-clamp-2 text-sm">
                      {news[1]?.description}
                    </p>
                    <div className="flex flex-row justify-between items-center">
                    <div className="flex mt-2 items-center flex-row gap-2">
                      <img
                        src="/icons/date.svg"
                        alt="search"
                        className="w-3 h-3"
                      />
                      <p className="text-xs text-white/80">
                        {news[1]?.published_at}
                      </p>
                    </div>
                    <a
                    href={news[1]?.url}
                    target="_blank"
                    className="underline text-primary cursor-pointer font-semibold text-sm"
                  >
                    Read More →
                  </a>
                    </div>
                  </div>
                </div>
                <div className="w-full flex gap-5 flex-col">
                  <div onClick={()=>window.open(news[2]?.url,"_blank")} className="cursor-pointer flex flex-col gap-2">
                    <img
                      src={news[2]?.image}
                      className="w-full rounded-lg h-35 object-cover"
                      alt="news"
                    />
                    <AuthorDate
                      author={news[2]?.author}
                      date={news[2]?.published_at}
                    />
                    <h1 className="font-bold text-xl line-clamp-2">
                      {news[2]?.title}
                    </h1>
                  </div>
                  <div onClick={()=>window.open(news[2]?.url,"_blank")} className="cursor-pointer flex flex-col gap-2">
                    <img
                      src={news[3]?.image}
                      className="w-full rounded-lg h-35 object-cover"
                      alt="news"
                    />
                    <AuthorDate
                      author={news[3]?.author}
                      date={news[3]?.published_at}
                    />
                    <h1 className="font-bold text-xl line-clamp-2">
                      {news[3]?.title}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            <div className="flex h-[1px] mx-20 my-15 bg-black/30 rounded-full"></div>
            <div>
              <h1 className="font-bold text-2xl mb-10">Lastest News.</h1>
              {loading && news.length === 0 ? (
                <SkeletonGrid />
              ) : (
                <>
                  <NewsList news={news.filter((_, index) => index >= 4)} />
                  {loading ? (
                    <div className="mt-8">
                      <SkeletonGrid count={4} />
                    </div>
                  ) : null}
                </>
              )}
              <div className="flex justify-center items-center mt-10">
                <p
                  onClick={nextPage}
                  className={`bg-primary/5 w-fit px-5 font-semibold text-primary py-2 rounded-full text-sm text-black/50 mt-5 ${
                    loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {loading ? "Loading..." : "Show More →"}
                </p>
              </div>
            </div>
            <div className="flex h-[1px] mx-20 my-15 bg-black/30 rounded-full"></div>
            <div className="flex flex-col md:flex-row md:gap-0 gap-10 md:justify-between w-full items-center flex-col mb-10">
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
              <div className="flex w-full md:justify-end justify-start flex-row gap-3">
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
                    className={`w-4`}
                    alt={icons.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <p className="text-black/50 text-center mb-3 text-sm">
        © News. All Right Reserved | Bayu Setiawan 2025
      </p>
    </div>
  );
}

export default App;
