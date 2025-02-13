import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const InputWrapper = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row gap-5", className)}>
      {children}
    </div>
  );
};

export default InputWrapper;
