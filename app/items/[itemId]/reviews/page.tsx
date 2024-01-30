import { ReviewsTable } from "./data-table-reviews";
import { columns } from "./columns";

export async function getAllReviewsData(itemId: string | string[] | undefined) {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!base_url) throw new Error('BASE_URL is not defined')
    const res = await fetch(`${base_url}/items/${itemId}/reviews`, {
        method: 'GET',
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const responseData = await res.json();
    console.log(responseData)

     // Extract id, comment, rating, and user_name from each review
    const extractedData = responseData.data.itemReviews.map(
        ({ id, comment, rating, user }: { id: string, comment: string, rating: number, user: { firstName: string, lastName: string } }) => ({
            id,
            comment,
            rating,
            user_name: `${user.firstName} ${user.lastName}`, // Combine first and last name
        })
    );
    console.log("Extracted Data:", extractedData);

    return extractedData;
}

export default async function AllReviews({ params }: { params: any }) {
    const itemId: string | string[] | undefined = params.itemId
    const data = await getAllReviewsData(itemId)
    return (
        <main className="flex flex-col items-center">
            <div className="text-6xl font-bold">All Reviews</div>
            <ReviewsTable columns={columns} data={data} />
        </main>
    );
}