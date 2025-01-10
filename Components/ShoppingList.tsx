"use client";
import React, { useState, useEffect } from "react";
import { retrieveLocalData, updateLocalData } from "../lib/utils";
import { ListItem } from "../@types/types";
import Button from "./Button";
import DecrementIcon from "./SVGs/DecrementIcon";
import IncrementIcon from "./SVGs/IncrementIcon";
import { useSession } from "next-auth/react";

type Props = {
  shared: boolean;
};

export default function ShoppingList({ shared }: Props) {
  const session = useSession();
  // const [list, setList] = useState<ListItem[]>([]);
  const [sharedList, setSharedList] = useState<ListItem[]>([]);
  const [privateList, setPrivateList] = useState<ListItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    window.location.origin ||
    "localhost:3000";

  useEffect(() => {
    if (shared == true) {
      if (session.data?.user?.householdId) {
        const retrieveShoppingList = async () => {
          const response = await fetch(
            `${baseUrl}/api/ingredients?householdId=${session.data?.user?.householdId}`
          );
          const data = await response.json();
          console.log(data);
          setSharedList(data);
        };
        retrieveShoppingList();
      }
    } else {
      const savedList = retrieveLocalData("shoppingList");
      if (savedList) {
        setPrivateList(savedList);
      }
    }
  }, [session]);

  const addListing = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (input.trim() !== "") {
      const newItem: ListItem = {
        name: input.trim(),
        quantity: quantity,
      };
      if (shared) {
      } else {
        setPrivateList((prevList) => [...prevList, newItem]);
        setInput("");
        setQuantity(1);
        updateLocalData("shoppingList", [...privateList, newItem]);
      }
    }
  };

  const removeItem = (index: number): void => {
    const newList = [...privateList];
    newList.splice(index, 1);
    setPrivateList(newList);
    if (shared) {
    } else {
      updateLocalData("shoppingList", newList);
    }
  };

  const clearList = (): void => {
    setPrivateList([]);
    if (shared) {
    } else {
      updateLocalData("shoppingList", []);
    }
  };

  const handleIncrementQuantity = (index: number): void => {
    const newList = [...privateList];
    newList[index].quantity++;
    setPrivateList(newList);
    if (shared) {
    } else {
      updateLocalData("shoppingList", newList);
    }
  };

  const handleDecrementQuantity = (index: number): void => {
    const newList = [...privateList];
    if (newList[index].quantity > 1) {
      newList[index].quantity--;
      setPrivateList(newList);
      if (shared) {
      } else {
        updateLocalData("shoppingList", newList);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center">
      <div className="bg-primaryLight shadow-md rounded-md p-8 mt-24">
        <h1 className="text-3xl font-bold mb-6 text-white">Shopping List</h1>
        <form onSubmit={addListing} className="flex mb-4">
          <input
            type="text"
            value={input}
            placeholder="Item"
            className="input input-bordered w-full md:max-w-xs mr-2 "
            onChange={(event) => setInput(event.target.value)}
          />
          <select
            className="select select-bordered w-16 md:w-full md:max-w-xs mr-2"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          >
            <option disabled>Quantity</option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <Button isSubmit={true} text="Add" />
        </form>
        <Button
          text="Clear List"
          callback={clearList}
          styles="bg-red-500 hover:bg-red-800 text-white"
        />
        <ul className="mt-6">
          {shared
            ? sharedList.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center py-2"
                >
                  <span className="flex">
                    <DecrementIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDecrementQuantity(idx);
                      }}
                    />
                    <IncrementIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleIncrementQuantity(idx);
                      }}
                    />
                    <span className=" ml-4 w-28">
                      {item.name}: {item.quantity}
                    </span>
                  </span>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))
            : privateList.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center py-2"
                >
                  <span className="flex">
                    <DecrementIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDecrementQuantity(idx);
                      }}
                    />
                    <IncrementIcon
                      onClick={(event) => {
                        event.stopPropagation();
                        handleIncrementQuantity(idx);
                      }}
                    />
                    <span className=" ml-4 w-28">
                      {item.name}: {item.quantity}
                    </span>
                  </span>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
