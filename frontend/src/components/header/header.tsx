import React from "react";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="bg-white sm:pt-12 border-b border-aff-blue sm:mb-12 px-6">
      <div className="m-auto max-w-7xl">
        <div className="hidden text-3xl font-bold sm:block">{title}</div>
        <div className="mt-6 h-[2px] bg-aff-blue hidden sm:block" />
        {children && (
          <div className="flex justify-center gap-6 border-b-2 py-2 sm:justify-normal sm:border-0 sm:py-6">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
