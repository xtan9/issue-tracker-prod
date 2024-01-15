import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import prisma from "@/prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { IssueStatusBadge } from "../components";

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
