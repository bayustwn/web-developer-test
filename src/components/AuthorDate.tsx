
interface AuthorDateProps {
    author?: string;
    date?: string;
}

export default function AuthorDate({ author, date }: AuthorDateProps) {
    return (
        <div className="flex mt-1 flex-row items-center gap-2">
              <img src="/icons/author.svg" alt="search" className="w-3 h-3" />
              <p className="text-xs">{author}</p>
              <div className="bg-black/30 w-1 h-1 rounded-full"/>
              <p className="text-xs text-black/50">{date}</p>
            </div>
    )
}