import React, { Fragment } from 'react';
import '../styles/Table.css';
import {
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemAvatar,
} from '@material-ui/core';
import numeral from 'numeral';

const TableData = ({ countries }) => {
  return (
    <div className="t-table">
      <ul className="t-table-header">
        <li># </li>
        <li>Country </li>
        <li>Total Cases </li>
        <li>Total Recovered </li>
        <li>Total Deaths </li>
      </ul>
      <hr />
      <div className="t-table-items">
        {countries.map(
          ({ country, cases, countryInfo, recovered, deaths }, i) => (
            <ul>
              <li>
                <img src={`${countryInfo.flag}`} />
              </li>
              <li>{country}</li>
              <li>{cases}</li>
              <li>{recovered}</li>
              <li>{deaths}</li>
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default TableData;
