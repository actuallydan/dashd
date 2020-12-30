import React, { useState, useEffect, useRef } from "react";

import ChartistGraph from "react-chartist";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Update from "@material-ui/icons/Update";
import {
  barOptions,
  getAnimationFromChartType,
  getLineOptions,
} from "variables/charts.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function ChartDashet({
  title,
  data = null,
  query = null,
  units = "",
  color = "success",
  icon = "file_copy",
  chartType,
  subtitle = "",
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

  const animation = getAnimationFromChartType(chartType);
  const capitalizeFirstLetter = ([first, ...rest]) =>
    first.toLocaleUpperCase() + rest.join("");

  let options = null;

  switch (chartType) {
    case "line":
      options = getLineOptions(data);
      break;
    case "bar":
      options = barOptions;
      break;
    default:
      options = getLineOptions(data);
  }

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
  return (
    <Card chart>
      <CardHeader color={colorType}>
        <ChartistGraph
          className="ct-chart"
          data={data}
          type={capitalizeFirstLetter(chartType)}
          options={options}
          listener={animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title}</h4>
        <p className={classes.cardCategory}>{subtitle}</p>
      </CardBody>
      <CardFooter chart>
        <div className={classes.stats}>
          <Update />
          {fetchedTime.current}
        </div>
      </CardFooter>
    </Card>
  );
}
