import React from "react";
import { HashLoader } from "react-spinners";

export default function Loading() {
  return <div className="flex items-center justify-center h-screen">
    <HashLoader color="4f46e5" size={60} />
  </div>;
}
