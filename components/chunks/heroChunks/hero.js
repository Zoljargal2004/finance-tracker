"use client";

import { getYourIcon, icons } from "@/app/data/icons";
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

const CustomCard = (props) => {
  console.log("sd")
  const {icon_name, color, name, amount, transactiontype, transactiontime, id} = props.item
  const TheIcon = getYourIcon(icon_name);
  const time = transactiontime;
  const type = transactiontype;

  return (
    <div className="rounded-[12px] w-full flex justify-between items-center border-[#E5E7EB] border-[1px] py-3 px-6">
      <div className="flex gap-4 items-center">
        <Checkbox className={`size-6`} />
        <div className={`size-10 content-center rounded-full`} style={{background: color}}>
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


const TheDay =  () => {
  const [list, setList] = useState([]);
  const day = "2024-09-04";
  
  const load = async() => {
    setList(await getRecords(day))
  };
  

  useEffect(() => {
    load()
  }, []);
  console.log(list)

  return (
    <div className="flex flex-col gap-3">
      <span className="">{day}</span>
      {list.map(item => (
        <CustomCard key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default Records;
