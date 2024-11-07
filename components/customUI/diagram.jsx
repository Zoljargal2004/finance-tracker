"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

import { getRecordsGroupByCategory } from "@/app/services/record";
import { useUser } from "@clerk/nextjs";

export const description = "A donut chart with text";

export function Diagram() {
  const [chartData, setChartData] = React.useState([]);
  const [chartConfig, setChartConfig] = React.useState({});
  const { user } = useUser();

  const getData = async () => {
    if (!user) return;
    const datas = await getRecordsGroupByCategory();
    const updatedConfig = {};

    const updatedData = datas.map((data, index) => {
      const color = `hsl(var(--chart-${(index % 12) + 1}))`;
      updatedConfig[data.name] = {
        label: data.name,
        color,
      };
      // Add the fill key with the corresponding color value
      return {
        ...data,
        fill: color,
      };
    });

    setChartConfig(updatedConfig);
    setChartData(updatedData);
  };

  React.useEffect(() => {
    getData();
  }, [user]);

  const totalSum = chartData.reduce(
    (acc, cur) => acc + parseFloat(cur.sum || 0),
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="sum"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSum.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sum
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
