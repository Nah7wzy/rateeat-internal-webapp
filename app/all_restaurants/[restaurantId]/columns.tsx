"use client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useEffect, useState } from "react"

export type Item = {
    id: string
    name: string,
}

export const itemColumns: ColumnDef<Item>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const item = row.original as Item;
            const [isClient, setIsClient] = useState(false);

            useEffect(() => {
                setIsClient(true);
            }, []);

            return (
                <>
                    {isClient && (
                        <Link href={`/items/${item.id}`}>
                            {item.id}
                        </Link>
                    )}
                </>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Item",
    }
]