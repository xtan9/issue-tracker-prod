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

interface summaryData {
  value: number;
  label: string;
}

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}
const IssueSummary = ({ open, in_progress, closed }: Props) => {
  const statuses: summaryData[] = [
    {
      value: open,
      label: "Open",
    },
    {
      value: in_progress,
      label: "In-Progress",
    },
    {
      value: closed,
      label: "Closed",
    },
  ];
  return (
    <div className="flex space-x-4">
      {statuses.map((status) => (
        <SummaryCard key={status.label} status={status} />
      ))}
    </div>
  );
};

const SummaryCard = async ({ status }: { status: summaryData }) => {
  return (
    <Card>
      <CardHeader>
        <Link
          className="text-sm font-medium"
          href={"/issues?status=" + status.label.toUpperCase()}
        >{`${status.label} Issues`}</Link>
      </CardHeader>
      <CardContent className="text-3xl font-semibold text-teal-600">
        {status.value}
      </CardContent>
    </Card>
  );
};

export default IssueSummary;