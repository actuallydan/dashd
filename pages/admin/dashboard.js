import React, { useState, useEffect, useRef, useContext } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ChartDashet from "components/Dashets/ChartDashet";
import ValueDashet from "components/Dashets/ValueDashet";

import { bugs, website, server } from "variables/general.js";

import { useDrag, useDrop } from "react-dnd";
import GridContext, { GridProvider } from "../../components/GridContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragItem from "components/DragItem";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function DashboardWrapper() {
  const myItems = [
    {
      size: "small",
      type: "value",
      title: "Used Space",
      data: "49/50",
      units: "GB",
      color: "orange",
      id: "k34jv53v4",
    },
    {
      size: "small",
      type: "value",
      title: "Revenue",
      data: "$34,245",
      color: "black",
      icon: "store",
      id: "3i4u5hot3i45",
    },
    {
      size: "small",
      type: "value",
      title: "Fixed Issues",
      data: 75,
      color: "red",
      icon: "info_outline",
      id: "39845v3345",
    },
    {
      size: "small",
      type: "value",
      title: "Followers",
      data: "+245",
      color: "blue",
      icon: "accessibility",
      id: "87df9g8b7d",
    },
    {
      size: "medium",
      type: "chart",
      title: "Daily Sales",
      data: dailySalesChart.data,
      color: "green",
      chartType: "line",
      subtitle: "55% increase in today sales.",
      id: "d87fygb87df",
    },
    {
      size: "medium",
      type: "chart",
      title: "Email Subscriptions",
      data: emailsSubscriptionChart.data,
      color: "orange",
      chartType: "bar",
      subtitle: "Last Campaign Performance",
      id: "8d7fg0b87dfgb",
    },
    {
      size: "medium",
      type: "chart",
      title: "Completed Tasks",
      data: completedTasksChart.data,
      color: "black",
      chartType: "line",
      subtitle: "Last Campaign Performance",
      id: "d7fgm087dmf0gndmgn",
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <GridProvider items={myItems} saveNewOrder={null}>
        <Dashboard />
      </GridProvider>
    </DndProvider>
  );
}

function Dashboard() {
  const classes = useStyles();

  const { items, moveItem } = useContext(GridContext);

  return (
    <div>
      <GridContainer>
        {items.map((item) => (
          <DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
            <Dashet key={item.id} {...item} />
          </DragItem>
        ))}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

DashboardWrapper.layout = Admin;

export default DashboardWrapper;

function Dashet({
  type = "value",
  forwardedRef,
  size = "large",
  id,
  ...props
}) {
  let widths = { xs: 12, sm: 6, md: 3 };

  switch (size) {
    case "large":
      widths = { xs: 12, sm: 12, md: 12 };
      break;
    case "medium":
      widths = { xs: 12, sm: 6, md: 6 };
      break;
    case "small":
      widths = { xs: 12, sm: 6, md: 3 };
      break;
  }

  let cardType = <ValueDashet {...props} />;
  // switch on type
  switch (type) {
    case "value":
      cardType = <ValueDashet {...props} />;
      break;
    case "chart":
      cardType = <ChartDashet {...props} />;
      break;
    // case "small":
    //   cardType = { xs: 12, sm: 6, md: 3 };
    //   break;
  }

  return (
    <GridItem
      xs={widths.xs}
      sm={widths.sm}
      md={widths.md}
      forwardedRef={forwardedRef}
    >
      {cardType}
    </GridItem>
  );
}
