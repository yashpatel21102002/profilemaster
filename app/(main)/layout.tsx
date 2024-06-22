import Infobar from "@/components/global/infobar";
import Sidebar from "@/components/sidebar/sidebar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <Infobar />
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
