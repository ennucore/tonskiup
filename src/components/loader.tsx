import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-10 w-10 text-telegram-accent-text" />
    </div>
  );
};
