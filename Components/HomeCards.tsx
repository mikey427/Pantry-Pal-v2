"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlannedMonth, ListItem } from "../@types/types";
import { getMonthName } from "../lib/utils";
import { useSession } from "next-auth/react";

export default function Home() {
  const [plannedMonth, setPlannedMonth] = useState<PlannedMonth>({});
  const [plannedMeals, setPlannedMeals] = useState<String[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(
    getMonthName(new Date().getMonth())
  );
  const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
  const [shoppingList, setShoppingList] = useState<ListItem[]>([]);
  const session = useSession();
  console.log(session);

  useEffect(() => {
    // console.log(session);
    let savedMeals = localStorage.getItem(currentMonth);
    let list = localStorage.getItem("shoppingList");
    setShoppingList(list ? JSON.parse(list) : []);

    if (savedMeals !== null) {
      savedMeals = JSON.parse(savedMeals);
      let temp: String[] = [];
      for (let i = 1; i <= Object.keys(savedMeals || {}).length; i++) {
        if (typeof savedMeals?.[i] === "string") {
          temp.push(savedMeals?.[i]);
        }
      }
      setPlannedMeals(temp);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col sm:flex-row h-full w-full container justify-center px-4 sm:px-0 mx-auto">
      <Link
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full sm:w-1/3 h-1/2 sm:mr-4 my-6 sm:my-auto mx-auto"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Upcoming Meals
        </h5>
        <ul className="w-full font-normal text-gray-700 dark:text-gray-400">
          {plannedMeals.length > 0 ? (
            plannedMeals.map((meal: String, idx: number) => {
              if (idx >= currentDay && idx < currentDay + 7) {
                console.log("here");
                return (
                  <li
                    key={idx}
                    className="px-2"
                  >{`${currentMonth} ${idx}: ${meal}`}</li>
                );
              } else {
                return (
                  <p key={idx} className="w-max px-2">
                    No upcoming meals!
                  </p>
                );
              }
            })
          ) : (
            <p className="w-max px-2">No upcoming meals!</p>
          )}
        </ul>
      </Link>

      <Link
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full sm:w-1/3 h-1/2 my-6 sm:my-auto mx-auto"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Shopping List
        </h5>
        <ul className="font-normal text-gray-700 dark:text-gray-400">
          {shoppingList.map((item: ListItem, idx: number) => {
            if (idx % 2 === 0) {
              return (
                <li className="flex justify-between px-2" key={idx}>
                  <span className="w-full">{`${item.name}: `}</span>{" "}
                  <span>{`${item.quantity}`}</span>
                </li>
              );
            } else {
              return (
                <li className="flex justify-between px-2" key={idx}>
                  <span className="w-full">{`${item.name}: `}</span>{" "}
                  <span>{`${item.quantity}`}</span>
                </li>
              );
            }
          })}
        </ul>
      </Link>
    </div>
  );
}
