import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { showMoreTickets } from '../../shared/services/slice/getTicketsSlice';
import { RootSt } from "../../shared/services/store/store";
 const ShowMore: React.FC = () => {
    const dispatch = useDispatch();
    const tickets = useSelector((state: RootSt) => state.tickets.tickets);
    const displayCount = useSelector((state: RootSt) => state.tickets.displayCount);
 
       return (
       <div>
 {(displayCount < tickets.length )&& (<div style={{
            backgroundColor: '#2196F3',
            color: 'white',
             padding: '15px',
             marginLeft: '20px',
             borderRadius: '5px',
             textAlign: 'center',
             marginTop: '20px',
             cursor: 'pointer'
        }} onClick={() => dispatch(showMoreTickets())}>
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </div>)
       }
       </div>
     );
    
};
export default ShowMore;