"use client";
import { Heading } from "@/components/ui/heading";
import { Store } from "@prisma/client";
import React from "react";

interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  return (
    <div className="flex items-center justify-between">
      <Heading title="Settings" description="Manage store preferences" />
    </div>
  );
};
