import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getYourIcon, icons } from "../../app/data/icons";
import { fetchCategories } from "@/app/services/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddRecordForum = () => {
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [categories, setCategories] = useState([]);

  const load = async () => {
    setCategories(await fetchCategories());
    console.log(categories);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="w-full max-w-[792px]">
        <DialogHeader>
          <DialogTitle className="py-5 border-[#E2E8F0] border-b-[1px]">
            Add Records
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 py-5">
          <div className="flex flex-col gap-5">
            <TypePicker
              active={type}
              change={(val) => {
                setType(val);
              }}
            />
            <InputAmount
              change={(val) => {
                setAmount(val);
              }}
            />
            <CategoryPicker
              items={categories}
              active={activeCategory}
              chanage={(val) => setActiveCategory(val)}
            />
          </div>
          <div></div>
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
    const value = parseFloat(event.target.value) || 0; // Convert to number, default to 0 if NaN
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
      <Select selected={props.active} className={``}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder="Find or choose category"
            className="w-full"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
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
    <SelectItem
      value={categoryid}
      onClick={() => {
        console.log("chnage");
        props.change({
          categoryid: categoryid,
          name: name,
          color: color,
          icon_name: icon_name,
        });
      }}
    >
      <div className="flex items-center gap-3 p-4">
        <Component size={24} style={{ color: color }} />
        <span>{name}</span>
      </div>
    </SelectItem>
  );
};

export { AddRecordForum };
