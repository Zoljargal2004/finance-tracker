"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAmount } from "@/app/services/record";
import { getMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Spinner } from "./loadingSpinner";
import { useUser } from "@clerk/nextjs";

export const description = "A multiple bar chart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chartConfig = {
  desktop: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
};

export function Chart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();

  const GetDatas = async () => {
    const datas = [];
    for (let i = 1; i <= new Date().getMonth() + 1; i++) {
      const income = await getAmount(
        user.id,
        "INCOME",
        String(i).padStart(2, "0")
      );
      const outcome = await getAmount(
        user.id,
        "EXPENSE",
        String(i).padStart(2, "0")
      );
      const data = {
        month: months[i - 1],
        income: Number(income),
        expense: Number(outcome),
      };
      datas.push(data);
    }
    setChartData(datas);
    setLoading(false);
  };
  useEffect(() => {
    if (!user) return;
    GetDatas();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income - Expense</CardTitle>
      </CardHeader>
      {(isLoading && (
        <div>
          <Spinner />
        </div>
      )) || (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="income" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="expense" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
