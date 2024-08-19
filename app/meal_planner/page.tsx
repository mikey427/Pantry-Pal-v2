"use client";
import React, { useState } from "react";
import Calendar from "../../Components/Calendar";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="w-screen h-min p-6">
      <Calendar />
    </div>
  );
}
