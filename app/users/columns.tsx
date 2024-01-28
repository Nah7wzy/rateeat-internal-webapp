"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    id: string
    first_name: string,
    last_name: string,
}

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({row}) => {
            const user = row.original as User
            return (
                <>
                    <Link href={`/users/${user.id}`}>
                        {user.id}
                    </Link>
                </>
            );
        }
    },
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
]
