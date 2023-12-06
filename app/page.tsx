"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const query = useInfiniteQuery({
    queryKey: ["home"],
    queryFn: ({ pageParam = 0 }) => {
      const items = [];
      const size = 50;

      for (let i = 0; i < size; i++) {
        items.push(`item ${i + pageParam * size}`);
      }
      return items;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => {
      return pages.length + 1;
    },
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>{query.error.message}</div>;

  const itemFromPages = query.data.pages.flat();

  return (
    <div>
      <ul>
        {itemFromPages.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            query.fetchNextPage();
          }}
        >
          Load more
        </button>
      </div>
      <div>
        <Link href="/other-page">link to other page</Link>
      </div>
      <div>
        <button
          onClick={() => {
            router.push("/other-page");
          }}
        >
          router.push("/other-page")
        </button>
      </div>
    </div>
  );
}
