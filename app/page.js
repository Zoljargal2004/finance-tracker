import FirstLineOfItems from "@/components/chunks/dashboardChunks/firstline";
import { RecentRecords } from "@/components/chunks/dashboardChunks/recentRecords";
import SecondLineOFItems from "@/components/chunks/dashboardChunks/secontline";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  return (
    <div className="m-auto max-w-[1200px]  flex flex-col items-center gap-6">
      <FirstLineOfItems />
      <SecondLineOFItems />
      <RecentRecords />
    </div>
  );
};

export default Home;
