"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";

export function DatePickerDemo(props) {
  const [date, setDate] = React.useState(null);
  if (date != props.date) {
    props.setDate(date);
  }

  return (
    <div className="flex flex-col gap-2">
      <span>Date</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4" />
            {props.activeDate ? (
              format(props.activeDate, "PP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(event) => {
              
              const date = new Date(
                event
              );

              // Extract year, month, and day
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
              const day = String(date.getDate()).padStart(2, "0");

              // Format as YYYY-MM-DD
              const formattedDate = `${year}-${month}-${day}`;
              props.setDate(formattedDate);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
export const TimePicker = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <span>Time</span>
      <Input
        onChange={(event) => {
          props.change(event.target.value);
        }}
        type="time"
      />
    </div>
  );
};
