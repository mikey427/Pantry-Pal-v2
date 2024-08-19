import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import HomeCards from "@/Components/HomeCards";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="w-screen h-screen bg-primary">
      <HomeCards />
    </div>
  );
}
