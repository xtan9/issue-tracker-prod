import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { number } from "zod";
import { Heading } from "@radix-ui/themes";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (isNaN(parseInt(id, 10))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
