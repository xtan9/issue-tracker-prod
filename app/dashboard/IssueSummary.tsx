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
import Link from "next/link";
import React from "react";

interface issueStatus {
  value: Status;
  label: string;
}
const statuses: issueStatus[] = [
  {
    value: "OPEN",
    label: "Open",
  },
  {
    value: "IN_PROGRESS",
    label: "In-Progress",
  },
  {
    value: "CLOSED",
    label: "Closed",
  },
];
const IssueSummary = () => {
  return (
    <div className="flex space-x-4">
      {statuses.map((status) => (
        <SummaryCard key={status.value} status={status} />
      ))}
    </div>
  );
};

const SummaryCard = async ({ status }: { status: issueStatus }) => {
  const count = await prisma.issue.count({ where: { status: status.value } });
  return (
    <Card>
      <CardHeader>
        <Link
          className="text-sm font-medium"
          href={"/issues?status=" + status.value}
        >{`${status.label} Issues`}</Link>
      </CardHeader>
      <CardContent className="text-3xl font-semibold">{count}</CardContent>
    </Card>
  );
};

export default IssueSummary;
