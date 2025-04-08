import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getTickets } from "./getTickets";
interface Ticket {
    id?: string;
    [key: string]: any;
}
interface Ticket{
    tickets: Ticket[];
    stop: boolean;
    displayCount: number;
}
const initialState: Ticket= {
    
    tickets: [],
    stop: false,
    displayCount: 5
};
const getTicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTickets: (state, action: PayloadAction<Ticket[]>) => {
            state.tickets = [...state.tickets, ...action.payload];
        },
        showMoreTickets: (state) => {
            state.displayCount += 5;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTickets.fulfilled, (state, action) => {
            
          if (action.payload) {
        state.stop = action.payload.stop;
      } else {
        console.warn('Received undefined payload from getTickets.fulfilled');
      }
        });
    }
     
});

export const { showMoreTickets, addTickets } = getTicketSlice.actions;

export default getTicketSlice.reducer;