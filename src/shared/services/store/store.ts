import { configureStore } from '@reduxjs/toolkit';


import filterReducer from '../slice/filterSlice';
import searchReducer from '../slice/searchIdSlice';
import ticketReducer from '../slice/getTicketsSlice';
import loaderReducer from '../slice/loaderSlice';

import sortReducer from '@/shared/services/slice/SortSlice';

export const store = configureStore({
    reducer: {  
        sort: sortReducer,
        filters: filterReducer,
        search: searchReducer,
        tickets: ticketReducer,
        loader: loaderReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat()
    
});

export const options: Intl.DateTimeFormatOptions ={
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day:'numeric'
};
export type RootSt = ReturnType<typeof store.getState>;
// Тип Dispatch
export type AppDispatch = typeof store.dispatch;

export default store;