import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (isNaN(parseInt(id, 10))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  await delay(800);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
