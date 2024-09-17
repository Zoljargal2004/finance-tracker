"use client";

import { Chart } from "@/components/customUI/chart";
import { Diagram } from "@/components/customUI/diagram";

export default function SecondLineOFItems() {
  return (
    <div className="grid grid-cols-2 gap-6 w-full">
      <Chart />
      <Diagram />
    </div>
  );
}
