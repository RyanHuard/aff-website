type ContentLayoutProps = {
  children: React.ReactNode;
};

export default function ContentLayout({ children }: ContentLayoutProps) {
  return <div className="mx-auto max-w-7xl pb-12">{children}</div>;
}
