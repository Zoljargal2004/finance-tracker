"use client";

import { icons } from "@/app/data/icons";
import { getRecords } from "@/app/services/record";
import { Checkbox } from "@/components/ui/checkbox";
import { getDate } from "date-fns";
import { useEffect, useState } from "react";

const Records = () => {
  return (
    <div className="w-full">
      <TheDay />
    </div>
  );
};

const CustomCard = () => {
  const TheIcon = icons[0].Icon;
  const color = "#0166FF";
  const name = "Lending and  Renting";
  const time = "14:00";
  const amount = 1000;
  const type = "INCOME";

  return (
    <div className="rounded-[12px] w-full flex justify-between items-center border-[#E5E7EB] border-[1px] py-3 px-6">
      <div className="flex gap-4 items-center">
        <Checkbox className={`size-6`} />
        <div className="size-10 bg-[#0166FF] content-center rounded-full">
          <TheIcon size={24} className="rounded-full m-auto text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-[#6B7280] text-[12px]">{time}</span>
        </div>
      </div>
      <span
        className={
          (amount == "EXPENSE" && "text-[#F54949]") || "text-[#23E01F]"
        }
      >
        {(type == "EXPENSE" && "-") || "+"}
        {amount}
      </span>
    </div>
  );
};

const load = () => {};

const TheDay = async () => {
  const [list, setList] = useState([]);
  const day = "2024-9-4";
  useEffect(() => {
    async () => {
      setList(await getRecords(day));
    };
  }, []);
  console.log(list);

  return (
    <div className="flex flex-col gap-3">
      <span className="">{day}</span>
      <CustomCard />
    </div>
  );
};

export default Records;
