import prisma from "@/prisma/client";
import IssueCharts from "./IssueCharts";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

const Dashboard = async () => {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closeCount = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <div className="container lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="flex flex-col gap-4">
        <IssueSummary
          open={openCount}
          in_progress={inProgressCount}
          closed={closeCount}
        />
        <IssueCharts
          open={openCount}
          in_progress={inProgressCount}
          closed={closeCount}
        />
      </div>

      <LatestIssues />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

export default Dashboard;
