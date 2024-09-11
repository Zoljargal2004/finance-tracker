"use client";

import { getYourIcon, icons } from "@/app/data/icons";
import { getRecords } from "@/app/services/record";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

const Records = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  return (
    <div className="w-full">
      <TheDay category={category} type={type} min={min} max={max} />
    </div>
  );
};

const CustomCard = (props) => {
  const {
    icon_name,
    color,
    name,
    amount,
    transactiontype,
    transactiontime,
    id,
  } = props.item;
  const TheIcon = getYourIcon(icon_name);
  const time = transactiontime;
  const type = transactiontype;

  return (
    <div className="rounded-[12px] w-full flex justify-between items-center border-[#E5E7EB] border-[1px] py-3 px-6">
      <div className="flex gap-4 items-center">
        <Checkbox className={`size-6`} />
        <div
          className={`size-10 content-center rounded-full`}
          style={{ background: color }}
        >
          <TheIcon size={24} className="rounded-full m-auto text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-[#6B7280] text-[12px]">{time}</span>
        </div>
      </div>
      <span
        className={(type == "EXPENSE" && "text-[#F54949]") || "text-[#23E01F]"}
      >
        {(type == "EXPENSE" && "-") || "+"}
        {amount}
      </span>
    </div>
  );
};

const TheDay = (props) => {
  const [list, setList] = useState([]);
  const [day, setDay] = useState(formatDate(new Date()));

  const load = async () => {
    setList(
      await getRecords(day, props.category, props.type, props.min, props.max)
    );
  };

  useEffect(() => {
    load();
  }, [props, day]);

  if (!list) {
    load();
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Input
          type="date"
          className="w-[150px]"
          onChange={(e) => {
            setDay(e.target.value);
          }}
          value={day}
        />
      </div>

      {list.map((item) => (
        <CustomCard key={item.id} item={item} />
      ))}
    </div>
  );
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default Records;
