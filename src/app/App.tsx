import React from "react";
import { useSelector } from "react-redux";

import image from "@/assets/logo.png";
import SideMenu from "@/widgets/SideMenu/SideMenu";
import "./App.scss";
import FlightFilter from "@/widgets/FlightFilter/FlightFilter";
import Ticket from "@/widgets/Ticket/Ticket";
import ShowMore from "@/widgets/ShowMore/ShowMore";
import { RootSt } from "@/shared/services/store/store"; // путь укажи в соответствии со своим проектом

const App: React.FC = () => {
  const filters = useSelector((state: RootSt) => state.filters);
  const tickets = useSelector((state: RootSt) => state.tickets.tickets);

  const isActive = Object.values(filters).some((value) => value);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={image} alt="logo" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div>
          <SideMenu />
        </div>
        <div>
          <FlightFilter />
          <Ticket />
          {!isActive && tickets.length !== 0 ? <NoResults /> : <ShowMore />}
        </div>
      </div>
    </div>
  );
};

const NoResults: React.FC = () => {
  return (
    <p
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      Рейсов, подходящих под заданные фильтры, не найдено
    </p>
  );
};

export default App;
