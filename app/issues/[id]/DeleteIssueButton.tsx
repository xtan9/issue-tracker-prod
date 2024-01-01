import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

interface Props {
  id: string;
}
const DeleteIssueButton = ({ id }: Props) => {
  return (
    <Button color="red">
      <TrashIcon />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
