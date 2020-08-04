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

const Table = ({ countries }) => {
  return (
    <div className="t-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Total Recovered</th>
            <th>Total Deaths</th>
          </tr>
        </thead>
        <hr />
        <tbody>
          {countries.map(
            ({ country, cases, countryInfo, recovered, deaths }, i) => (
              <tr>
                <td>
                  <img src={`${countryInfo.flag}`} />
                </td>
                <td>{country}</td>
                <td>{cases}</td>
                <td>{recovered}</td>
                <td>{deaths}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
    // <List className="table">
    //   {countries.map(({ country, cases, countryInfo }, i) => (
    //     <Fragment key={i}>
    //       <ListItem button className="tableRowItem">
    //         <img src={`${countryInfo.flag}`} />
    //         <ListItemText className="tableRowData" secondary={country} />
    //         <ListItemText
    //           className="tableRowData"
    //           secondary={numeral(cases).format('0,0')}
    //         />
    //       </ListItem>
    //       <Divider />
    //     </Fragment>
    //   ))}
    // </List>
  );
};

export default Table;
