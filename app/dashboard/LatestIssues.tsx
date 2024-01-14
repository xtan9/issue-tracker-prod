import {
  Table,
  TableCaption,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import prisma from "@/prisma/client";

import React from "react";
import { IssueStatusBadge } from "../components";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "asc" },
    take: 5,
    include: {
      assignee: true,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {latestIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="flex justify-between">
                  <div className="flex flex-col items-start space-y-2">
                    <Link
                      className="font-medium hover:text-teal-600"
                      href={`/issues/${issue.id}`}
                    >
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                  {issue.assignee && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={issue.assignee.image!} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestIssues;
