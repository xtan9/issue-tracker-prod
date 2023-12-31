import { Card, Flex, Heading } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueDetailLoadingPage = () => {
  return (
    <div>
      <Heading>
        <Skeleton width="20rem" />
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width="4rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default IssueDetailLoadingPage;
