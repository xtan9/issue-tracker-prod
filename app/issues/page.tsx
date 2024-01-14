import { IssueStatusBadge, Link, Pagination } from "@/app/components";
import prisma from "@/prisma/client";

import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import IssueTable, { columnKeys } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: number;
}
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const pageSize = 10;
  const currentPage = searchParams.page || 1;

  const orderBy = columnKeys.map((col) => col).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const statuses = Object.values(Status);
  const status = statuses.some((status) => status === searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where: { status } });
  return (
    <Flex direction={"column"} gap="4">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
