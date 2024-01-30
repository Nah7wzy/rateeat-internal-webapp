export async function getReviewDetails(reviewId: string | string[] | undefined){
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base_url) throw new Error('BASE_URL is not defined')
    const res = await fetch(`${base_url}/reviews/item_reviews/${reviewId}`, {
        method: 'GET',
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const responseData = await res.json();
    console.log('Response Data:', responseData)

    return responseData;
    
}