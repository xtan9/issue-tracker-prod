import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";

const Dashboard = () => {
  return (
    <>
      <IssueSummary />
      <LatestIssues />
    </>
  );
};

export default Dashboard;
