import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return <div className="max-w-3xl mx-auto p-6">{children}</div>;
}
