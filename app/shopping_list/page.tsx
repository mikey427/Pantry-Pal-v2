"use client";
import React from "react";
import ShoppingList from "../../Components/ShoppingList";
import PageHeader from "../../Components/PageHeader";

type Props = {};

export default function ShoppingListPage({}: Props) {
  const desc =
    "This is where you will track all of the ingredients you will need to buy for your upcoming meals. The default is currently 1 week. (You will be able to adjust this in the future)";
  return (
    <div className="w-3/4 flex flex-col mx-auto">
      <PageHeader title="Shopping List" description={desc} />
      <ShoppingList />
    </div>
  );
}
