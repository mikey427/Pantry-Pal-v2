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
  // const [sharedList, setSharedList] = useState<ListItem[]>([]);
  // const [privateList, setPrivateList] = useState<ListItem[]>([]);
  const [list, setList] = useState<ListItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    window.location.origin ||
    "localhost:3000";

  useEffect(() => {
    if (shared == true) {
      if (session.data?.user?.householdId) {
        console.log("session: ", session);
        const retrieveShoppingList = async () => {
          const response = await fetch(
            `${baseUrl}/api/shopping-list?householdId=${session.data?.user?.householdId}`
          );
          // if (response.status === 404) {
          //   const response = await fetch(
          //     `${baseUrl}/api/shopping-list?houseHoldId=${session.data?.user?.householdId}`,
          //     {
          //       method: "PUT",
          //       body: JSON.stringify({
          //         householdId: session.data?.user?.householdId,
          //       }),
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //     }
          //   );
          // }
          const data = await response.json();
          if (response.ok) {
            setList(data);
          } else {
            setList([]);
          }
          console.log("data: ", data);
          // setList(data);
        };
        retrieveShoppingList();
      }
    } else {
      const savedList = retrieveLocalData("shoppingList");
      if (savedList) {
        setList(savedList);
      }
    }
  }, [session]);

  // const addListing = async (
  //   event: React.FormEvent<HTMLFormElement>,
  //   listToUse?: string
  // ) => {
  //   event.preventDefault();
  //   if (input.trim() !== "") {
  //     const newItem: ListItem = {
  //       name: input.trim(),
  //       quantity: quantity,
  //     };
  //     const tempShoppingList = [...list, newItem];

  //     if (shared) {
  //       const response = await fetch(`${baseUrl}/api/shopping-list`, {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           householdId: session.data?.user?.householdId,
  //           data: tempShoppingList,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const data = await response.json();
  //       if (response.ok) {
  //         console.log(data);
  //         setList(data);
  //       }
  //     } else {
  //       setList((prevList) => [...prevList, newItem]);
  //       setInput("");
  //       setQuantity(1);
  //       updateLocalData("shoppingList", [...list, newItem]);
  //     }
  //   }
  // };
  const addListing = async (
    event: React.FormEvent<HTMLFormElement>,
    listToUse?: string
  ) => {
    event.preventDefault();
    if (input.trim() !== "") {
      const newItem: ListItem = {
        name: input.trim(),
        quantity: quantity,
      };
      const tempShoppingList = [...list, newItem];

      if (shared) {
        const response = await fetch(`${baseUrl}/api/shopping-list`, {
          method: "POST",
          body: JSON.stringify({
            householdId: session.data?.user?.householdId,
            newItem,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setList(data);
        } // Need to convert this to match the single record > shoppinglist item per household schema update
      } else {
        setList((prevList) => [...prevList, newItem]);
        setInput("");
        setQuantity(1);
        updateLocalData("shoppingList", [...list, newItem]);
      }
    }
  };

  const removeItem = async (index: number) => {
    if (shared) {
      const shoppingListItemId = list[index]?.id;
      console.log(list[index]);
      const response = await fetch(
        `${baseUrl}/api/shopping-list?id=${shoppingListItemId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.ok) {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
      }
    } else {
      const newList = [...list];
      newList.splice(index, 1);
      setList(newList);
      updateLocalData("shoppingList", newList);
    }
  };

  const clearList = async () => {
    if (shared) {
      const response = await fetch(`${baseUrl}/api/shopping-list?clear=TRUE`, {
        method: "DELETE",
      });
      if (response.ok) {
        setList([]);
      }
    } else {
      setList([]);
      updateLocalData("shoppingList", []);
    }
  };

  const handleIncrementQuantity = (index: number): void => {
    const newList = [...list];
    newList[index].quantity++;
    setList(newList);
    if (shared) {
    } else {
      updateLocalData("shoppingList", newList);
    }
  };

  const handleDecrementQuantity = (index: number): void => {
    const newList = [...list];
    if (newList[index].quantity > 1) {
      newList[index].quantity--;
      setList(newList);
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
          {list.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center py-2">
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
              <button onClick={() => removeItem(idx)} className="text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
