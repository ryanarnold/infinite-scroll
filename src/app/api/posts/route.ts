import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const skip = parseInt(url.searchParams.get('page') as string);
  const posts = await prisma.post.findMany({
    take: 10,
    skip: (skip - 1) * 10,
  });
  return NextResponse.json(posts);
}
