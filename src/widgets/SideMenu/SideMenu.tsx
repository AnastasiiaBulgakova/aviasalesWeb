import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import './SideMenu.scss';
import { toggleFilter, toggleAll, FiltersState } from "../../shared/services/slice/filterSlice";
import { RootSt } from "../../shared/services/store/store";

import Wrapper from "./Wrapper";
type Option = { 
    id: string;
    label: string
}
const SideMenu: React.FC = () => {
  const options: Option[] = [
    { id: 'all', label: "Все" },
    { id: 'noTransfers', label: "Без пересадок" },
    { id: 'oneTransfer', label: "1 пересадка" },
    { id: 'twoTransfers', label: "2 пересадки" },
    { id: 'threeTransfers', label: "3 пересадки" },
  ];

  
  const dispatch = useDispatch();
  const filters = useSelector((state: RootSt) => state.filters || {});

  const checkboxList = options.map(({ id, label }, index) => {
    return (
      <label
        htmlFor={`checkbox${index}`}
        key={id}
        className="label"
        style={{ padding: '10px', paddingLeft: '20px' }}
      >
        <input
          type="checkbox"
          checked={filters[id as keyof FiltersState]}
          id={`checkbox${index}`}
          name="checkbox"
          style={{
            accentColor: 'green',
          }}
          onChange={() => {
            if (id === 'all') {
              dispatch(toggleAll());
            } else {
              dispatch(toggleFilter(id as keyof FiltersState));
            }
          }}
        />
        <div className="custom-checkbox"></div>
        {label}
      </label>
    );
  });

  return (
    <React.Fragment>
      <p
        style={{
          letterSpacing: '0.5px',
          padding: '20px',
          paddingBottom: '0px',
          margin: 0,
          marginBottom: '10px',
        }}
      >
        КОЛИЧЕСТВО ПЕРЕСАДОК
      </p>
      <div className="sideMenuInput">
        {checkboxList}
      </div>
    </React.Fragment>
  );
};

export default Wrapper(SideMenu, 'sideMenu');
