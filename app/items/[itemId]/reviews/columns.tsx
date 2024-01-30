"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Review = {
    id: string,
    user_name: string,
    comment: string,
    rating: number
}

export const columns: ColumnDef<Review>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({row}) => {
            const review = row.original as Review
            console.log(review)
            return <>
                <Link href={`reviews/${review.id}`} legacyBehavior>
                    {review.id}
                </Link>
            </>;
        }
    },
    {
        accessorKey: "user_name",
        header: "Username",
    },
    {
        accessorKey: "comment",
        header: "Comment",
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
]
