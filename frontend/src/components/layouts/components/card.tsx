import React from "react";

type CardProps = {
  children: React.ReactNode;
};

function Card({ children }: CardProps) {
  return <div className="drop-shadow-md rounded-sm bg-white">{children}</div>;
}

export default Card;
