"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);

  const addToList = () => {
    const item = prompt();
    fetch(`http://localhost:4000/category/add?name=${item}`);
    loadItems();
  };

  const editItem = async (name) => {
    const newName = prompt();
    await fetch(
      `http://localhost:4000/category/edit?oldName=${name}&newName=${newName}`
    );
    loadItems();
  };

  const delItem = async (name) => {
    await fetch(`http://localhost:4000/category/del?name=${name}`);
    loadItems();
  };

  async function loadItems() {
    const res = await fetch(`http://localhost:4000/category/list`);
    const data = await res.json();
    setCategories(data);
  }
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main>
      <button
        className="px-10 py-2 bg-slate-800 rounded-[12px]"
        onClick={addToList}
      >
        Add
      </button>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div
            className="flex gap-2 mt-4 items-center ml-4"
            key={category.name}
          >
            <span>{category.name}</span>
            <button
              onClick={() => {
                editItem(category.name);
              }}
              className="px-10 py-2 bg-slate-800 rounded-[12px]"
            >
              Edit
            </button>
            <button
              onClick={() => {
                delItem(category.name);
              }}
              className="px-10 py-2 bg-slate-800 rounded-[12px]"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
