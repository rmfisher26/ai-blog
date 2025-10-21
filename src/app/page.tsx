
import AuthButton from "@/components/AuthButton";
import Search from "@/components/Search";
import { prisma } from "@/lib/prisma";
import {
  Typography,
  Box,
  Grid
} from "@mui/material";
import PostCard, { Post } from '@/components/PostCard';
import MainContent from "@/components/MainContent";
import FooterContent from "@/components/FooterContent";
import LatestContent from "@/components/LatestContent";



export default async function HomePage() {
  /*const posts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
*/
  return (
    <main>
      {/*<AuthButton />*/}
      <MainContent />
      <LatestContent />
      <FooterContent />
      {/*{<Search posts={posts} />}*/}
    </main>
  );
}
