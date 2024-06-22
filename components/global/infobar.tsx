import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import { currentUser } from "@clerk/nextjs/server";

const Infobar = async () => {
  const user = await currentUser();
  return (
    <div className="fixed z-[20] left-0 right-0 top-0 p-4 bg-background/30 backdrop-blur-md flex gap-4 items-center border-b-[1px] md:px-[100px] lg:px-[200px] md:left-[300px]">
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-muted-foreground">Hi! {user?.firstName}</span>
        <UserButton />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Infobar;
