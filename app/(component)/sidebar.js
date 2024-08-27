'use client'


import Image from "next/image";
import AddNewCatForum from "./dialog";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SideBar = () => {
    const [AddNewCat, setAddNewCat] = useState(false)
  return (
    <div className="py-6 px-4 flex flex-col gap-6 rounded-[12px] max-w-[282px] border-[1px] border-[#E5E7EB] bg-[#F9FAFB]">
      <h1 className="text-2xl font-semibold">Records</h1>
      <button className="bg-[#0166FF] rounded-[9999px] flex items-center justify-center py-1 text-[#FFFFFF] text-base gap-1"
      onClick={()=>{setAddNewCat(true)}}>
        <Image width={20} height={20} src="./add.svg" className="bg" />
        Add
      </button>
      <input
        type="text"
        placeholder="Search"
        className="border-[1px] border-[#D1D5DB] p-1 rounded-[8px]"
      />
      <div className="">
        <h1 className="mb-4 font-semibold">Types</h1>
        <div>
          <input type="radio" name="select_type" value={`All`} />
          <label>All</label>
        </div>
        <div>
          <input type="radio" name="select_type" value={`Income`} />
          <label>Income</label>
        </div>
        <div>
          <input type="radio" name="select_type" value={`Expenses`} />
          <label>Expense</label>
        </div>
      </div>
      <AddNewCatForum open={AddNewCat}/>
    </div>
  );
};

export default SideBar;
