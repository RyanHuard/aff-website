import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className }: CardProps) {
  return (
    <div className={`drop-shadow-md rounded-sm bg-white ${className}`}>
      {children}
    </div>
  );
}

export default Card;
