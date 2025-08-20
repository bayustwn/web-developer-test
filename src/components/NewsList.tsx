import type { News } from "../model/News";
import AuthorDate from "./AuthorDate";

interface NewsList{
    news: News[]
}

export default function NewsList({news}: NewsList) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-3 gap-10 md:gap-y-10">
                        {news.map((news, index) => {
                            return (
                              <div key={index} className="flex flex-col gap-3">
                                <img
                                  src={news.image}
                                  className="w-full rounded-lg h-50 object-cover"
                                  alt="news"
                                />
                                <AuthorDate author={news.author} date={news.published_at} />
                                <h1 className="font-bold text-lg line-clamp-2">
                                  {news.title}
                                </h1>
                                <p className="line-clamp-2 text-sm">{news.description}</p>
                                <a
                                  href={news.url}
                                  target="_blank"
                                  className="underline text-primary cursor-pointer font-semibold text-sm"
                                >
                                  Read More →
                                </a>
                              </div>
                            );
                          })}
                      </div>
    )
}