import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { icons } from "../data/icons";

const AddRecordForum = () => {
  const [type, setType] = useState("EXPENSE");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(icons[0].Icon);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  console.log(amount);
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

export { AddRecordForum };
