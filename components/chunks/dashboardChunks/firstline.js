import { ArrowDown, ArrowUp } from "lucide-react";
import { getAmount } from "@/app/services/record";

export default function FirstLineOfItems() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <div className="rounded-[18px] bg-[#0166FF]">Your Card</div>
      <IncomeAndExpense type={"INCOME"} />
      <IncomeAndExpense type={"EXPENSE"} />
    </div>
  );
}

const IncomeAndExpense = async ({ type }) => {
  const thisMonthData = await getAmount(
    type,
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const lastMonthData = await getAmount(
    type,
    String(new Date().getMonth()).padStart(2, "0")
  );
  const comparasionPercent = (
    (Math.abs(thisMonthData - lastMonthData) * 100) /
    lastMonthData
  ).toFixed(0);

  return (
    <div className="rounded-[18px] flex flex-col bg-white">
      <div className="py-4 px-6 flex items-center gap-3 font-semibold border-[1px] border-[#E2E8F0]">
        <div
          className={`size-2 rounded-full ${
            (type == "INCOME" && `bg-[#84CC16]`) || `bg-[#0166FF]`
          }`}
        />
        <span>Your {(type == "INCOME" && "Income") || "Expense"}</span>
      </div>
      <div className="py-5 px-6 flex flex-col gap-4">
        <IncomeShow amount={thisMonthData} type={type} />
        <Comparasion
          percent={comparasionPercent}
          status={thisMonthData >= lastMonthData}
          type={type}
        />
      </div>
    </div>
  );
};

const IncomeShow = ({ amount, type }) => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold">
        {type == "EXPENSE" && "-"}
        {amount}₮
      </span>
      <span className="text-[#64748B] text-lg">
        Your {(type == "INCOME" && "Income") || "Expense"} Amount
      </span>
    </div>
  );
};

const Comparasion = ({ percent, status, type }) => {
  return (
    <div className="flex items-center gap-2">
      <RedAndGreenArrow status={status} type={type} />
      <span>{percent}% from last month</span>
    </div>
  );
};

const RedAndGreenArrow = ({ status, type }) => {
  const bool = type == "INCOME";
  return (
    <div
      className={`size-5 rounded-full flex items-center justify-center text-white ${
        (((bool && status) || !status) && "bg-[#84CC16]") || "bg-red-600"
      }`}
    >
      {(status && <ArrowUp size={16} />) || <ArrowDown size={16} />}
    </div>
  );
};
