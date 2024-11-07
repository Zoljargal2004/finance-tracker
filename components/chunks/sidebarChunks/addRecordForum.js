"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getYourIcon, icons } from "../../../app/data/icons";
import { fetchCategories } from "@/app/services/category";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo, TimePicker } from "../../customUI/datePicker";
import { Button } from "../../ui/button";
import { addRecord } from "@/app/services/record";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AddRecordForum = () => {
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useUser();

  const [categories, setCategories] = useState([]);
  const submit = async () => {
    await addRecord(
      user.id,
      name,
      amount,
      type,
      description,
      activeCategory,
      date,
      time
    );
  };

  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get("createRecord");

  const load = async () => {
    if (!user) {
      return;
    }
    try {
      const fetchedCategories = await fetchCategories(user.id);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    load();
  }, [user]);
  return (
    <Dialog
      open={search == "true"}
      onOpenChange={() => {
        router.push("?");
      }}
    >
      <DialogContent className="w-full max-w-[792px]">
        <DialogHeader>
          <DialogTitle className="py-5 border-[#E2E8F0] border-b-[1px]">
            Add Records
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-12 py-5">
          <div className="flex flex-col gap-5">
            <TypePicker active={type} change={(val) => setType(val)} />
            <InputAmount change={(val) => setAmount(val)} />
            <CategoryPicker
              items={categories}
              active={activeCategory}
              change={(val) => setActiveCategory(val)}
            />
            <div className="grid grid-cols-2 gap-4">
              <DatePickerDemo
                activeDate={date}
                setDate={(val) => {
                  setDate(val);
                }}
              />
              <TimePicker
                change={(val) => {
                  setTime(val);
                }}
              />
            </div>

            <Button
              className={`${
                type == "EXPENSE"
                  ? "bg-[#0166FF] text-[#F9FAFB]"
                  : "bg-[#16A34A] text-[#F9FAFB]"
              }`}
              onClick={submit}
            >
              Add Record
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <span>Payee</span>
            <Input
              type="text"
              className=" bg-[#F3F4F6]"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <span className="mt-[14px]">Note</span>
            <textarea
              placeholder="Note here"
              className="p-4 bg-[#F3F4F6] border-[1px] border-[#D1D5DB] h-full resize-none rounded-[8px]"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TypePicker = (props) => {
  return (
    <div className="flex rounded-full bg-[#F3F4F6] text-base text-[#1F2937] overflow-hidden gap-1">
      <button
        className={`rounded-full flex-1 py-2 text-center ${
          props.active == "EXPENSE" && "bg-[#0166FF] text-[#F9FAFB]"
        }`}
        onClick={() => {
          props.change("EXPENSE");
        }}
      >
        Expense
      </button>
      <button
        className={`rounded-full flex-1 py-2 text-center ${
          props.active == "INCOME" && "bg-[#16A34A] text-[#F9FAFB]"
        }`}
        onClick={() => {
          props.change("INCOME");
        }}
      >
        Income
      </button>
    </div>
  );
};

const InputAmount = (props) => {
  const handleChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    props.change(value);
  };

  return (
    <div className="py-3 px-4 flex flex-col bg-[#F3F4F6] border-[1px] border-[#D1D5DB] rounded-lg">
      Amount
      <span className="text-xl text-[#9CA3AF]">
        ₮
        <input
          className="ml-2 bg-transparent text-[#0F172A]"
          type="number"
          placeholder="000.00"
          onChange={handleChange}
        />
      </span>
    </div>
  );
};

const CategoryPicker = (props) => {
  return (
    <div className="flex flex-col gap-1">
      <span>Category</span>
      <Select
        selected={props.active}
        onValueChange={(event) => {
          props.change(event);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder="Find or choose category"
            className="w-full"
          />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="NEW_CAT">
            <div className="flex items-center gap-3 py-4">
              <SquarePlus size={24} />
              <span>Add Category</span>
            </div>
          </SelectItem> */}
          {props.items.map((item) => (
            <Item
              change={props.change}
              item={item}
              key={`pickCat${item.categoryid}`}
            />
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const Item = (props) => {
  const { categoryid, color, icon_name, name } = props.item;
  const Component = getYourIcon(icon_name);
  return (
    <SelectItem value={categoryid}>
      <div className="flex items-center gap-3 py-4">
        <Component size={24} style={{ color: color }} />
        <span>{name}</span>
      </div>
    </SelectItem>
  );
};

export default Item;

export { AddRecordForum };
