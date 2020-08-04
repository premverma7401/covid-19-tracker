import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && 'infoBox--cases--green'}`}>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          Total-{total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
