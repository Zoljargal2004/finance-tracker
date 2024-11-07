import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="p-4">
      <div className="max-w-[1200px] w-full m-auto flex justify-between items-center">
        <div className="flex gap-6">
          <span>LOGO</span>
          <a href="/">Dashboard</a>
          <a href="/records">Records</a>
        </div>
        <div className="flex gap-6">
          <a
            href="/records?createRecord=true"
            className="items-center flex gap-1 bg-[#0166FF] text-[#FFF] rounded-full px-4 py-1.5  "
          >
            <Plus size={20} />
            <span>Record</span>
          </a>
          <UserButton className="size-10" />
        </div>
      </div>
    </div>
  );
};
