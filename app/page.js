import { stat } from "fs";
import { ArrowDown, ArrowUp } from "lucide-react";

const Home = () => {
  return (
    <div className="">
      <FirstLinOfItems />
    </div>
  );
};

const FirstLinOfItems = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="rounded-[18px]">Your Card</div>
      <IncomeCard />
    </div>
  );
};

const IncomeCard = () => {
  return (
    <div className="rounded-[18px] flex flex-col bg-white">
      <div className="py-4 px-6 flex items-center gap-3 font-semibold border-[1px] border-[#E2E8F0]">
        <div className="size-2 rounded-full bg-[#84CC16]" />
        <span>Your Income</span>
      </div>
      <div className="py-5 px-6 flex flex-col gap-4">
        <IncomeShow />
        <Comparasion />
      </div>
    </div>
  );
};

const IncomeShow = () => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold">1200</span>
      <span className="text-[#64748B] text-lg">Your Income Amount</span>
    </div>
  );
};

const RedAndGreenArrow = ({ status }) => {
  return (
    <div
      className={`size-5 rounded-full flex items-center justify-center text-white ${
        (status && "bg-[#84CC16]") || "bg-red-600"
      }`}
    >
      {(status && <ArrowUp size={16} />) || <ArrowDown size={16} />}
    </div>
  );
};

const Comparasion = ({}) => {
  return (
    <div className="flex items-center gap-2">
      <RedAndGreenArrow status={true} />
      <span>32% from last month</span>
    </div>
  );
};

export default Home;
