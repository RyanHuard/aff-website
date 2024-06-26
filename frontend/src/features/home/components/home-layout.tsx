type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div
      className="mobile-homepage-divide  
            block grid-cols-9 gap-6 lg:grid lg:divide-none"
    >
      {children}
    </div>
  );
};

export default HomeLayout;
