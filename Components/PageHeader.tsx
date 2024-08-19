"use client";
import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="border-b border-gray-700 pb-5 my-6">
      <h3 className="text-base font-semibold leading-6 text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  );
}
