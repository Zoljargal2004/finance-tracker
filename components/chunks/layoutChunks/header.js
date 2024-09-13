import { UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="p-4">
      <div className="max-w-[1200px] w-full m-auto flex justify-between items-center">
        <div className="flex gap-6">
          <span>LOGO</span>
          <Link href="/">Dashboard</Link>
          <Link href="/records">Records</Link>
        </div>
        <div className="flex gap-6">
          <button className="items-center flex gap-1 bg-[#0166FF] text-[#FFF] rounded-full px-4 py-1.5  ">
            <Plus size={20} />
            <span>Record</span>
          </button>
          <UserButton className="size-10" />
        </div>
      </div>
    </div>
  );
};
