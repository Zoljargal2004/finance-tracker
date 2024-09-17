"use client";

import { getRecentRecords } from "@/app/services/record";
import { useEffect, useState } from "react";
import { CustomCard } from "../heroChunks/hero";

export const RecentRecords = () => {
  const [number, setNumber] = useState(10);
  const [data, setData] = useState([]);
  const getRecords = async () => {
    const res = await getRecentRecords(number);
    setData(res);
  };
  useEffect(() => {
    getRecords();
  }, [number]);
  return (
    <div className="w-full">
      <span className="text-2xl">Recent Records</span>
      {data.map((item) => (
        <CustomCard key={item.id} item={item} recent={true} />
      ))}
    </div>
  );
};
