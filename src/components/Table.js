import React, { Fragment } from 'react';
import { ListItem, ListItemText, List, Divider } from '@material-ui/core';
import numeral from 'numeral';
import '../styles/Table.css';

const Table = ({ countries }) => {
  return (
    <List className="table">
      {countries.map(({ country, cases }, i) => (
        <Fragment key={i}>
          <ListItem button className="tableRowItem">
            <ListItemText className="tableRowData" secondary={country} />
            <ListItemText
              className="tableRowData"
              secondary={numeral(cases).format('0,0')}
            />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default Table;
