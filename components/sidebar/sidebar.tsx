import MenuItems from "./menu-items";

const sidebar = () => {
  return (
    <>
      <MenuItems defaultOpen={true} />
      <MenuItems defaultOpen={false} />
    </>
  );
};

export default sidebar;
