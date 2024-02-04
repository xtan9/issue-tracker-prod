import { CheckCircle } from "lucide-react";

interface Props {
  message?: string;
}

const FormSuccess = ({ message }: Props) => {
  if (!message) return null;

  return (
    <span className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle className="h-4 w-4" /> <p>{message}</p>
    </span>
  );
};

export default FormSuccess;
