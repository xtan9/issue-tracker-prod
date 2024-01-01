import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
