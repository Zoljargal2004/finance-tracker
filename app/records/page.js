import Records from "@/components/chunks/heroChunks/hero";
import SideBar from "@/components/chunks/sidebarChunks/sidebar";

const Page = () => {
  return (
    <div className="flex max-w-[1200px] m-auto gap-6">
      <SideBar />
      <Records />
    </div>
  );
};

export default Page;
