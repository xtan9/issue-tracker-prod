import { AlertTriangle } from "lucide-react";

interface Props {
  message?: string;
}
const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <span className="flex items-center gap-x-2 p-3 text-sm text-destructive bg-destructive/15 rounded-md">
      <AlertTriangle className="h-4 w-4 mb-0.5" /> <p>{message}</p>
    </span>
  );
};

export default FormError;
