import React, { useState, useEffect, useRef } from "react";

import Icon from "@material-ui/core/Icon";

import Update from "@material-ui/icons/Update";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function ValueDashet({
  title,
  data,
  units = "",
  color = "success",
  icon = "file_copy",
  ...props
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const fetchedTime = useRef("");

  useEffect(() => {
    fetchedTime.current = new Date().toLocaleString();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  let colorType = "warning";

  switch (color) {
    case "orange":
      colorType = "warning";
      // #ffa726
      break;
    case "red":
      colorType = "danger";
      // #ef5350
      break;
    case "black":
      colorType = "dark";
      break;
    // #263238
    case "theme":
      colorType = "primary";
      break;
    case "green":
      colorType = "success";
      // #66bb6a
      break;
    case "blue":
      colorType = "info";
      // #26c6da
      break;
    case "pink":
      colorType = "rose";
      // #ec407a
      break;
  }

  const content = loading ? (
    <CircularProgress color="primary" />
  ) : (
    <h3 className={classes.cardTitle}>
      {data} <small>{units}</small>
    </h3>
  );

  return (
    <Card>
      <CardHeader color={colorType} stats icon>
        {icon && (
          <CardIcon color={colorType}>
            <Icon>{icon}</Icon>
          </CardIcon>
        )}
        <p className={classes.cardCategory}>{title}</p>
      </CardHeader>
      <div className="card-body">{content}</div>
      <CardFooter stats>
        <div className={classes.stats}>
          <Update />
          {fetchedTime.current}
        </div>
      </CardFooter>
    </Card>
  );
}
