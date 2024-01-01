import { Button } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
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
