// scripts/deletePost.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const slug = 'hello-world'

  await prisma.post.delete({
    where: { slug },
  })

  console.log(`✅ Post "${slug}" deleted.`)
}

main().finally(() => prisma.$disconnect())

//Run this
// npx tsx scripts/deletePost.ts

//GUI
//npx prisma studio
