import React from "react";
import './FlightFilter.scss';
import { useSelector, useDispatch } from 'react-redux';

import { setSortBy } from "@/shared/services/slice/SortSlice";
import { RootSt } from "@/shared/services/store/store";
const FlightFilter: React.FC = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector((state: RootSt) => state.sort.sortBy);
    const handleSortChange = (type: "cheap" | "fast" | "optimal") => {
        dispatch(setSortBy(type));
    };
    
    return(
       <ul>
        <li className={sortBy === 'cheap' ? 'active' : undefined} onClick={() => handleSortChange('cheap')}>САМЫЙ ДЕШЕВЫЙ</li>
        <li className={sortBy === 'fast' ? 'active' : undefined} onClick={() => handleSortChange('fast')}>САМЫЙ БЫСТРЫЙ</li>
        <li className={sortBy === 'optimal' ? 'active' : undefined}  onClick={() => handleSortChange('optimal')}>ОПТИМАЛЬНЫЙ</li>
       </ul>
    );
};
export default FlightFilter;