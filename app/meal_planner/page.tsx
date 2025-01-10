"use client";
import React, { useEffect, useState } from "react";
import Calendar from "../../Components/Calendar";
import { useSession } from "next-auth/react";

type Props = {};

export default function MealPlannerPage({}: Props) {
  const session = useSession();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  // useEffect(() => {
  //   if (session.data?.user?.id !== undefined) {
  //     fetch(
  //       `${baseUrl}/api/planned-meals?householdId=${session.data?.user?.id}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setData(data);
  //         setLoading(false);
  //         console.log(data);
  //       });
  //   }
  // }, [session]);

  return (
    <div className="w-screen bg-primary h-min p-6">
      <Calendar data={{}} />
    </div>
  );
}
