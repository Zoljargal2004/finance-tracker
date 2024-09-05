import Records from "@/components/chunks/heroChunks/hero";
import AddNewCatForum from "../components/chunks/sidebarChunks/dialog";
import Header from "../components/chunks/sidebarChunks/header";
import SideBar from "../components/chunks/sidebarChunks/sidebar";

const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <Records />
    </div>
  );
};

export default Home;
