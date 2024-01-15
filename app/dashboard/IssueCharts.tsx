"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}
const IssueCharts = ({ open, in_progress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In-Progress", value: in_progress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar
              dataKey="value"
              barSize={60}
              style={{ fill: "var(--accent-9)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IssueCharts;
