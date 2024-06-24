import React from "react";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export function Header({ title, children }: HeaderProps) {
  return (
    <div className="bg-white sm:mt-0 sm:pt-12 border-b border-aff-blue sm:mb-12">
      <div className="m-auto max-w-7xl px-6">
        <header className="text-3xl font-bold">{title}</header>
        <div className="mt-6 h-[2px] bg-aff-blue" />
        {children && (
          <div className="flex justify-center gap-6 border-b-2 py-2 sm:justify-normal sm:border-0 sm:py-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
