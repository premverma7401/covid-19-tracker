import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../styles/InfoBox.css';

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
        <Typography
          className={`infoBox__cases ${!isRed && 'infoBox--cases--green'}`}
        >
          Today-<strong>{cases}</strong>
        </Typography>

        <Typography className="infoBox__total" color="textSecondary">
          Total so far-{total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
