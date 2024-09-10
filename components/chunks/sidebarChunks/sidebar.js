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
import { UpdateIcon } from "@radix-ui/react-icons";

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
      <TypeChoose />
      <CategorySideBar />
      <ValueRange />

      {/* will pop */}
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
  const router = useRouter();

  return (
    <div
      className="flex justify-between items-center"
      onClick={() => {
        const currentQuery = new URLSearchParams(window.location.search);

        currentQuery.set("category", props.id);

        const newQueryString = currentQuery.toString();
        const newUrl = `${window.location.pathname}${
          newQueryString ? "?" + newQueryString : ""
        }`;

        router.push(newUrl);
      }}
    >
      <div className="flex items-center gap-2">
        <Icon_component size={20} style={{ color: props.color }} />
        {props.name}
      </div>
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

const TypeChoose = () => {
  const router = useRouter();
  const upadate = (event) => {
    //IDK WHAZ GOIN ON

    const currentQuery = new URLSearchParams(window.location.search);

    currentQuery.set("type", event.target.value);

    const newQueryString = currentQuery.toString();
    const newUrl = `${window.location.pathname}${
      newQueryString ? "?" + newQueryString : ""
    }`;

    router.push(newUrl);
  };
  return (
    <div>
      <h2 className="mb-4 font-semibold">Types</h2>
      <div>
        <input
          type="radio"
          id="all"
          name="select_type"
          value="ALL"
          aria-label="All"
          onChange={(e) => {
            upadate(e);
          }}
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
          value="INCOME"
          aria-label="Income"
          onChange={(e) => {
            upadate(e);
          }}
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
          value="EXPENSE"
          aria-label="Expenses"
          onChange={(e) => {
            upadate(e);
          }}
        />
        <label htmlFor="expenses" className="ml-2">
          Expenses
        </label>
      </div>
    </div>
  );
};

const ValueRange = () => {
  const router = useRouter();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10 ** 10);

  useEffect(() => {
    updateRange(min, max);
  }, [min, max]);

  const updateRange = (min, max) => {
    //IDK WHAZ GOIN ON

    const currentQuery = new URLSearchParams(window.location.search);

    currentQuery.set("min", min);
    currentQuery.set("max", max);

    const newQueryString = currentQuery.toString();
    const newUrl = `${window.location.pathname}${
      newQueryString ? "?" + newQueryString : ""
    }`;

    router.push(newUrl);
  };

  return (
    <div>
      <h2 className="mb-4 font-semibold">Range</h2>
      <div className="grid grid-cols-2 gap-2 max-w-[100px]">
        <label>Min</label>
        <label>Max</label>
        <input
          type="number"
          min={0}
          max={10 ** 10}
          onChange={(event) => {
            setMin(event.target.value);
          }}
        />
        <input
          type="number"
          min={0}
          max={10 ** 10}
          onChange={(event) => {
            setMax(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
