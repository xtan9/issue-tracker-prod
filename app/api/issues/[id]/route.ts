import { patchIssueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}
export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const { title, description, assigneeId } = body;
  if (assigneeId) {
    const user = await db.user.findUnique({ where: { id: assigneeId } });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await db.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await db.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assigneeId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await db.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await db.issue.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({});
}
