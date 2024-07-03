type Props = {
  children: React.ReactNode;
};

const BlurPage = ({ children }: Props) => {
  return (
    <div
      className="h-screen overflow-y-scroll backdrop-blur-[30px] dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black  mx-auto pt-16 absolute top-0 right-0 left-0 botton-0 z-[11] md:ml-[300px]"
      id="blur-page"
    >
      {children}
    </div>
  );
};

export default BlurPage;
