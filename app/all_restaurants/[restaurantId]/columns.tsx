"use client"
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Item = {
  id: string;
  name: string;
};

// Extract the Link creation logic into a separate functional component
const ItemLink: React.FC<{ itemId: string }> = ({ itemId }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>
    {isClient && (
      <Link href={`/items/${itemId}`}>
        {itemId}
      </Link>
    )}
  </>;
};

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const item = row.original as Item;
      return <ItemLink itemId={item.id} />;
    },
  },
  {
    accessorKey: "name",
    header: "Item",
  },
];
