"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Restaurant = {
    id: string
    name: string
}

export const columns: ColumnDef<Restaurant>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({row}) => {
            const restaurant = row.original as Restaurant
            return <>
                <Link href={`/all_restaurants/${restaurant.id}`} legacyBehavior>
                    {restaurant.id}
                </Link>
            </>;
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
]
