import { useState } from "react";
import Events from "../components/Events";
import MeetingInfo from "../components/MeetingInfo";
import AboutUs from "../components/AboutUs";
import Sidebar from "../components/UI/sidebar/Sidebar";
import ButtonBurger from "../components/UI/button/ButtonBurger";
import Header from "../components/Header";
import EventsPast from "../components/EventsPast";
import Actions from "../components/Actions";

const Home = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <div className="mt-10">
      <div className="flex justify-end w-1/1 px-10">
        <ButtonBurger onClick={() => setSidebarActive(true)} />
      </div>
      <Sidebar active={sidebarActive} setActive={setSidebarActive} />
      <Header />
      <Events />
      <AboutUs />
      <MeetingInfo />
      <Actions />
      <EventsPast />
    </div>
  );
};

export default Home;
