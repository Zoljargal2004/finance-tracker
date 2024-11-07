"use client";

import { getRecentRecords } from "@/app/services/record";
import { useEffect, useState } from "react";
import { CustomCard } from "../heroChunks/hero";
import { useUser } from "@clerk/nextjs";

export const RecentRecords = () => {
  const { user } = useUser();
  const [number, setNumber] = useState(10);
  const [data, setData] = useState([]);
  const getRecords = async () => {
    if (!user) return [];
    const res = await getRecentRecords(user.id, number);
    setData(res);
  };
  useEffect(() => {
    getRecords();
  }, [number, user]);
  return (
    <div className="w-full">
      <span className="text-2xl">Recent Records</span>
      {data.map((item) => (
        <CustomCard
          key={item.id}
          item={item}
          recent={true}
          reset={getRecords}
        />
      ))}
    </div>
  );
};
