import React from "react";

function Card({
  hover = false,
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`
        bg-white 
        rounded-xl 
        border 
        border-gray-200 
        shadow-sm
        ${hover ? "transition-all duration-200 hover:shadow-lg hover:-translate-y-1" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;