'use client';

import { Post } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['postsQuery'],
    queryFn: async () => {
      const { data } = await axios.get('/api/posts');
      return data as Post[];
    },
  });

  return (
    <main className="min-h-screen w-1/3 mt-5">
      <h1 className="text-3xl font-bold tracking-tigh mb-5">Infinite Scrolling App</h1>
      <ul className="flex flex-col gap-3">
        {data?.map((post) => (
          <li
            key={post.id}
            className="transition text-lg border border-zinc-200 rounded-md p-5 bg-zinc-50 hover:bg-zinc-100 duration-300 cursor-pointer"
          >
            {post.content}
          </li>
        ))}
      </ul>
    </main>
  );
}
