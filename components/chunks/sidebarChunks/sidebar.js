"use client";

import Image from "next/image";
import AddNewCatForum from "./dialog";
import { useEffect, useState } from "react";
import { getYourIcon } from "../../../app/data/icons";
import {
  deleteCategories,
  fetchCategories,
} from "../../../app/services/category";
import { Pencil, Plus, Trash } from "lucide-react";
import { AddRecordForum } from "./addRecordForum";

import { useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();

  return (
    <aside className="py-6 px-4 flex flex-col gap-6 rounded-lg max-w-[282px] w-full border border-gray-300 bg-gray-100">
      <h1 className="text-2xl font-semibold">Records</h1>
      <button
        className="bg-blue-600 rounded-full flex items-center justify-center py-1 text-white text-base gap-1"
        onClick={() => {
          router.push("?createRecord=new");
        }}
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
      <AddRecordForum />
    </aside>
  );
};

const CategorySideBar = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [datas, setData] = useState([]);
  const [dialogType, setDialogType] = useState(0);
  const [initData, setInitData] = useState({
    icon: "",
    color: "",
    name: "",
    id: "",
  });

  const load = async () => {
    setData(await fetchCategories());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h1 className="font-semibold text-base">Categories</h1>
      <div className="mt-[-8px] flex flex-col gap-2">
        {datas.map(({ categoryid, name, icon_name, color }) => (
          <SideBarCatItem
            key={`cat${categoryid}`}
            id={categoryid}
            name={name}
            icon_name={icon_name}
            color={color}
            reset={load}
            edit={(id, name, icon_name, color) => {
              setInitData({
                icon: icon_name,
                name: name,
                color: color,
                id: id,
              });
              setDialogType(1);
              setOpenDialogue(true);
            }}
          />
        ))}
        <button
          className="flex items-center gap-2"
          onClick={() => {
            setOpenDialogue(true);
            setDialogType(0);
          }}
        >
          <Plus width={20} height={20} alt="Add" style={{ color: "#0166FF" }} />
          Add
        </button>
      </div>
      <AddNewCatForum
        open={openDialogue}
        controlParent={() => {
          setOpenDialogue(false);
        }}
        type={dialogType}
        reset={() => {
          load();
          setInitData({ icon: "", color: "", name: "", id: "" });
        }}
        initData={initData}
      />
    </>
  );
};

const SideBarCatItem = (props) => {
  const Icon_component = getYourIcon(props.icon_name);
  return (
    <div className="flex justify-between items-center">
      <button className="flex items-center gap-2">
        <Icon_component size={20} style={{ color: props.color }} />
        {props.name}
      </button>
      <div className="flex items-center gap-2">
        <Pencil
          size={15}
          onClick={() => {
            props.edit(props.id, props.name, props.icon_name, props.color);
          }}
        />
        <Trash
          onClick={async () => {
            await deleteCategories(props.id);
            props.reset();
          }}
          size={15}
        />
      </div>
    </div>
  );
};

export default SideBar;
