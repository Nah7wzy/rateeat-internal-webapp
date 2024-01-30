
'use client';
import { getReviewDetails } from "@/components/data/GetReviewDetail";
import { X } from "lucide-react";
import Link from "next/link";

export default async function ReviewDetail({ params }: { params: any }) {
    const itemId: string | string[] | undefined = params.itemId
    const reviewId: string | string[] | undefined = params.reviewId

    const handleRemove = async () => {
        const base_url = process.env.NEXT_PUBLIC_BASE_URL;
        if (!base_url) throw new Error('BASE_URL is not defined');

        try {
            const res = await fetch(`${base_url}/items/${itemId}/reviews/${reviewId}`, {
            method: 'DELETE',
            });

            if (res.ok) {
            // Successful deletion
            const responseData = await res.json();
            console.log('Deleted item details:', responseData);
            } else {
            // Failed deletion
            console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
};



    console.log('this is the itemId', itemId)
    const review = await getReviewDetails(reviewId)
    const reviewData = review.result
    console.log("review:", reviewData)

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-lg">Review Detail</div>
            <div className="text-lg">{reviewData.id}</div>
            <div className="text-lg">{reviewData.comment}</div>
            <div className="text-lg">{reviewData.rating}</div>
            
            <div className="flex flex-col gap-2">
                {
                    
                        <div className="flex">
                            <button key={review.id} onClick={() => handleRemove()} className="py-2 px-4 rounded hover:bg-[#fb9090]" type="button">
                                <X size={24} color="black" />
                            </button>
                        </div>
                
                }
            </div>
        </div>
    );
}