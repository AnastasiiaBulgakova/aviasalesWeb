import React, { useEffect } from "react";
import { parseISO, format, addMinutes } from "date-fns";
import "./Ticket.scss";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

import { AppDispatch, RootSt } from "@/shared/services/store/store"; 
import { getSearchId } from "@/shared/services/slice/getSearchId";
import { setSearchId } from "@/shared/services/slice/searchIdSlice";
import { getTickets } from "@/shared/services/slice/getTickets";
import { setLoader } from "@/shared/services/slice/loaderSlice";    

interface Segment {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
}


const Ticket: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchId = useSelector((state: RootSt) => state.search.searchId);
  const tickets = useSelector((state: RootSt) => state.tickets.tickets);
  const displayCount = useSelector((state: RootSt) => state.tickets.displayCount);
  const loading = useSelector((state: RootSt) => state.loader.loading);
  const filters = useSelector((state: RootSt) => state.filters);
  const sorted = useSelector((state: RootSt) => state.sort.sortBy);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getSearchId()).then((result: any) => {
      if (result.payload) {
        dispatch(setSearchId(result.payload.searchId));
      }
      dispatch(setLoader(false));
    });
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      dispatch(setLoader(true));
      dispatch(getTickets(searchId)).finally(() => {
        dispatch(setLoader(false));
      });
    }
  }, [dispatch, searchId]);

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filters.noTransfers && ticket.segments.every((segment: Segment) => segment.stops.length === 0)) ||
      (filters.oneTransfer && ticket.segments.every((segment: Segment) => segment.stops.length === 1)) ||
      (filters.twoTransfers && ticket.segments.every((segment: Segment) => segment.stops.length === 2)) ||
      (filters.threeTransfers && ticket.segments.every((segment: Segment) => segment.stops.length === 3))
    );
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sorted === "cheap") {
      return a.price - b.price;
    }
    if (sorted === "fast") {
      const durationA = a.segments[0].duration + a.segments[1].duration;
      const durationB = b.segments[0].duration + b.segments[1].duration;
      return durationA - durationB;
    }
    if (sorted === "optimal") {
      const sumA = a.price + a.segments[0].duration + a.segments[1].duration;
      const sumB = b.price + b.segments[0].duration + b.segments[1].duration;
      return sumA - sumB;
    }
    return 0;
  });

  const formatDateAt = (date: string): string => {
    return format(parseISO(date), "HH:mm");
  };

  const formatDateTo = (date: string, duration: number): string => {
    const arrival = addMinutes(parseISO(date), duration);
    return format(arrival, "HH:mm");
  };

  const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const setTransfer = (stops: string[]): string => {
    const count = stops.length;
    if (count === 0) return "0 ПЕРЕСАДОК";
    if (count === 1) return "1 ПЕРЕСАДКА";
    return `${count} ПЕРЕСАДКИ`;
  };

  if (loading && tickets.length === 0) {
    return <Spin size="large" style={{ width: "100%", marginTop: "20px" }} />;
  }

  return (
    <>
      {sortedTickets.slice(0, displayCount).map((ticket, index) => (
        <div className="container" key={index}>
          <header>
            <p>{ticket.price} P</p>
            <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="carrier logo" />
          </header>

          {ticket.segments.map((segment: Segment, segIndex: number) => (
            <div className="inner" key={segIndex}>
              <div>
                <p>{segment.origin} - {segment.destination}</p>
                <p>{formatDateAt(segment.date)} - {formatDateTo(segment.date, segment.duration)}</p>
              </div>
              <div>
                <p>В ПУТИ</p>
                <p>{formatDuration(segment.duration)}</p>
              </div>
              <div>
                <p>{setTransfer(segment.stops)}</p>
                <p>{segment.stops.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Ticket;
