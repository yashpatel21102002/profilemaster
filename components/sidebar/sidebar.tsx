import { currentUser } from "@clerk/nextjs/server";
import MenuItems from "./menu-items";

const sidebar = async () => {
  const user = await currentUser();
  return (
    <>
      <MenuItems defaultOpen={true} imageUrl={user?.imageUrl || ""} />
      <MenuItems defaultOpen={false} imageUrl={user?.imageUrl || ""} />
    </>
  );
};

export default sidebar;
