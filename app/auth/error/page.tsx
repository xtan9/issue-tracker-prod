import { Button } from "@/components/ui/button";
import Link from "next/link";

const error = () => {
  return (
    <div className="text-center">
      Opps! Something went wrong!
      <Button variant="link" className="font-normal w-full" size="sm" asChild>
        <Link href="/auth/login">Back to login</Link>
      </Button>
    </div>
  );
};

export default error;
