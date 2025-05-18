// src/components/ui/Card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#334155] rounded-2xl p-6 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`text-white ${className}`}>{children}</div>;
}
