import UserDetails from "@/components/forms/user-details";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  //If there is no user then return  to sign in page.
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <UserDetails clerkEmail={user.emailAddresses[0].emailAddress} />
    </div>
  );
}
