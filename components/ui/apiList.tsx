"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { useParams } from "next/navigation";
import { FC } from "react";
import { ApiAlert } from "./apiAlert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        varient="public"
        descrition={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        varient="public"
        descrition={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        varient="admin"
        descrition={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        varient="admin"
        descrition={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        varient="admin"
        descrition={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
