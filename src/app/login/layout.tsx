import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  //if session already exists, then go to admin page
  if (session) redirect("/admin")

  

  return <div className="max-w-3xl mx-auto p-6">{children}</div>;
}
