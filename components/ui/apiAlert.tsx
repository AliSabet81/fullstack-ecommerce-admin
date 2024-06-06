"use client";
import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  descrition: string;
  varient: "public" | "admin";
}

const textMap: Record<ApiAlertProps["varient"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["varient"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: FC<ApiAlertProps> = ({ descrition, title, varient }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(descrition);
    toast.success("API Route copied to the clipboard");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[varient]}>{textMap[varient]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {descrition}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
