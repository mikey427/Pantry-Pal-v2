"use client";
import React, { useState } from "react";
import Calendar from "../../Components/Calendar";

type Props = {};

export default function MealPlannerPage({}: Props) {
  return (
    <div className="w-screen bg-primary h-min p-6">
      <Calendar />
    </div>
  );
}
