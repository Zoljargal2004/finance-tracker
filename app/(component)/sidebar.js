"use client";

import Image from "next/image";
import AddNewCatForum from "./dialog";
import { useEffect, useState } from "react";
import { getYourIcon } from "../data/icons";
import { fetchCategories } from "../services/category";

const SideBar = () => {
  const [addNewCat, setAddNewCat] = useState(false);

  return (
    <div className="py-6 px-4 flex flex-col gap-6 rounded-lg max-w-xs border border-gray-300 bg-gray-100">
      <h1 className="text-2xl font-semibold">Records</h1>
      <button
        className="bg-blue-600 rounded-full flex items-center justify-center py-1 text-white text-base gap-1"
        onClick={() => setAddNewCat(true)}
      >
        <Image width={20} height={20} src="/add.svg" alt="Add" />
        Add
      </button>
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 p-1 rounded-md"
        aria-label="Search"
      />
      <div>
        <h2 className="mb-4 font-semibold">Types</h2>
        <div>
          <input
            type="radio"
            id="all"
            name="select_type"
            value="All"
            aria-label="All"
          />
          <label htmlFor="all" className="ml-2">
            All
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="income"
            name="select_type"
            value="Income"
            aria-label="Income"
          />
          <label htmlFor="income" className="ml-2">
            Income
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="expenses"
            name="select_type"
            value="Expenses"
            aria-label="Expenses"
          />
          <label htmlFor="expenses" className="ml-2">
            Expenses
          </label>
        </div>
      </div>

      <CategorySideBar />

      <AddNewCatForum
        open={addNewCat}
        controlParent={() => {
          setAddNewCat(false);
        }}
      />
    </div>
  );
};

const CategorySideBar = () => {
  const [datas, setData] = useState([]);
  useEffect(() => {
    const load = async () => {
      setData(fetchCategories());
    };
    load();
  }, []);
  return (
    <div>
      {datas.map(({ name, icon_name, color }) => (
        <div>{name}</div>
      ))}
    </div>
  );
};

export default SideBar;
