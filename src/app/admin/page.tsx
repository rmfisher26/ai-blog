import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next"
import { handler } from "../api/auth/[...nextauth]/route"
import AuthButton from "@/components/AuthButton";
export default async function AdminPage() {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    const session = await getServerSession(handler)

    if (!session) {
        return <div>Access Denied. Please sign in.</div>
    }

    return (
        <div><AuthButton/>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <ul className="space-y-3">
                {posts.map((p) => (
                    <li key={p.id}>
                        <a href={`/posts/${p.slug}`} className="text-blue-600 hover:underline">
                            {p.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
