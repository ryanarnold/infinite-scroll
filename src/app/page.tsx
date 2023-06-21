'use client';

import { Post } from '@prisma/client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
  });

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts-query'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/api/posts?page=${pageParam}`);
      return data as Post[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
  });

  const posts = data?.pages.flatMap((page) => page);

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
      console.log(entry.target.innerHTML);
    }
  }, [entry, fetchNextPage]);

  return (
    <main className="min-h-screen w-1/3 mt-5">
      <h1 className="text-3xl font-bold tracking-tigh mb-5">Infinite Scrolling App</h1>
      <ul className="flex flex-col gap-3">
        {posts?.map((post, index) => {
          if (index === posts.length - 5) {
            return (
              <li
                key={post.id}
                className="transition text-lg border border-zinc-200 rounded-md px-5 py-20 bg-zinc-50 hover:bg-zinc-100 duration-300 cursor-pointer"
                ref={ref}
              >
                {post.content}
              </li>
            );
          } else {
            return (
              <li
                key={post.id}
                className="transition text-lg border border-zinc-200 rounded-md px-5 py-20 bg-zinc-50 hover:bg-zinc-100 duration-300 cursor-pointer"
              >
                {post.content}
              </li>
            );
          }
        })}
      </ul>
    </main>
  );
}
