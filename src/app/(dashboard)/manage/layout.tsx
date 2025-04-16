import PageNotFound from "@/app/not-found";
import { getUserInfor } from "@/lib/actions/user.action";
import { EUserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const user = await getUserInfor({ userId });
  if (user && user.role !== EUserRole.ADMIN) {
    return <PageNotFound></PageNotFound>;
  }
  return <>{children}</>;
};

export default AdminLayout;
