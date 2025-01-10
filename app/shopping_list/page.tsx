"use client";
import React, { useState, useEffect } from "react";
import ShoppingList from "../../Components/ShoppingList";
import PageHeader from "../../Components/PageHeader";

type Props = {};

export default function ShoppingListPage({}: Props) {
  const [selectedShoppingList, setSelectedShoppingList] = useState("shared"); // private || multiview || shared

  // useEffect(() => {}, []);
  const handleListSelection = (event: any): void => {
    // console.log(event.target.innerText);
    setSelectedShoppingList(event.target.innerText.toLowerCase());
    console.log(event.target.innerText.toLowerCase());
  };

  const desc =
    "This is where you will track all of the ingredients you will need to buy for your upcoming meals. The default is currently 1 week. (You will be able to adjust this in the future)";
  return (
    <div className="w-3/4 flex flex-col mx-auto">
      <PageHeader title="Shopping List" description={desc} />
      {/* <div>
        <fieldset>
          <legend className="text-sm/6 font-semibold text-gray-900">
            Selected Shopping List
          </legend>
          <p className="mt-1 text-sm/6 text-gray-600">
            Which shopping list would you like to view?
          </p>
          <div className="mt-6 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
            <div className="flex items-center">
              <input
                id="Shared"
                type="radio"
                defaultChecked
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label
                htmlFor="email"
                className="ml-3 block text-sm/6 font-medium text-gray-900"
              >
                Shared Shopping List
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="person"
                type="radio"
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label
                htmlFor="sms"
                className="ml-3 block text-sm/6 font-medium text-gray-900"
              >
                Private Shopping list
              </label>
            </div>
          </div>
        </fieldset>
      </div> */}
      <div className="flex items-center justify-between">
        <span className="flex grow flex-col">
          <span className="text-sm/6 font-medium text-white">View Toggle</span>
          <span className="text-sm text-gray-400">
            Toggle between the viewing your shared shopping list, multiview, or
            private shopping list.
          </span>
        </span>

        <div className="inline-flex h-9 w-full items-baseline rounded-lg  bg-primaryLight border-opacity-30 p-1 sm:w-auto">
          <button
            type="button"
            aria-disabled="false"
            className={
              selectedShoppingList == "shared"
                ? "group inline-flex items-center justify-center whitespace-nowrap py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-indigo-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400 h-7 text-white w-full rounded-md bg-accent px-3 drop-shadow sm:w-auto"
                : // ? "group inline-flex items-center justify-center whitespace-nowrap py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-blue-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400 hover:stroke-blue-950 hover:text-blue-950 h-7 text-slate-950 w-full rounded-md bg-white px-3 drop-shadow sm:w-auto bg-indigo-400"
                  "group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-blue-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400  hover:text-accent h-7 w-full bg-transparent px-3 text-slate-300 sm:w-auto"
            }
            onClick={handleListSelection}
          >
            <div>Shared</div>
          </button>
          {selectedShoppingList == "private" ? (
            <hr className="m-auto h-3 border-r-2 border-gray-300 border-opacity-35" />
          ) : null}
          <button
            type="button"
            aria-disabled="false"
            className={
              selectedShoppingList == "multiview"
                ? "group inline-flex items-center justify-center whitespace-nowrap py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-indigo-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400  h-7 text-white w-full rounded-md bg-accent px-3 drop-shadow sm:w-auto"
                : "group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-blue-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400  hover:text-accent h-7 w-full bg-transparent px-3 text-slate-300 sm:w-auto"
            }
            onClick={handleListSelection}
          >
            <div>Multiview</div>
          </button>
          {selectedShoppingList == "shared" ? (
            <hr className="m-auto h-3 border-r-2 border-gray-300 border-opacity-35" />
          ) : null}
          <button
            type="button"
            aria-disabled="false"
            className={
              selectedShoppingList == "private"
                ? "group inline-flex items-center justify-center whitespace-nowrap py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-indigo-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400  h-7 text-white w-full rounded-md bg-accent px-3 drop-shadow sm:w-auto"
                : "group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-blue-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400  hover:text-accent h-7 w-full bg-transparent px-3 text-slate-300 sm:w-auto"
            }
            onClick={handleListSelection}
          >
            <div>Private</div>
          </button>
        </div>
      </div>
      {selectedShoppingList == "shared" ? (
        <ShoppingList shared={true} />
      ) : selectedShoppingList == "multiview" ? (
        <div className="flex justify-evenly">
          <ShoppingList shared={true} />
          <ShoppingList shared={false} />
        </div>
      ) : (
        <ShoppingList shared={false} />
      )}
    </div>
  );
}
