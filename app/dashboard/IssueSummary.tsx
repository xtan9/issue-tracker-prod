import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import React from "react";

interface issueStatus {
  status: Status;
  title: string;
}
const statuses: issueStatus[] = [
  {
    status: "OPEN",
    title: "Open",
  },
  {
    status: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    status: "CLOSED",
    title: "Closed",
  },
];
const IssueSummary = () => {
  return (
    <div className="flex space-x-4">
      {statuses.map((status) => (
        <SummaryCard status={status} />
      ))}
    </div>
  );
};

const SummaryCard = ({ status }: { status: issueStatus }) => {
  const count = prisma.issue.count({ where: { status: status.status } });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${status.title} Issues`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{count}</p>
      </CardContent>
    </Card>
  );
};

export default IssueSummary;
