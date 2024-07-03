import BlurPage from "@/components/global/blur-page";
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
      <BlurPage>{children}</BlurPage>
    </div>
  );
};

export default layout;
