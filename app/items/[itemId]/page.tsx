"use client"

import ImageUpload from "@/components/ImageUpload";
import { useParams } from "next/navigation";
export default function ItemDetail() {
    const itemId = useParams().itemId;

    return (
        <div className="flex flex-col items-center">
            <div className="text-lg">Item Detail</div>
            <ImageUpload id={itemId} item={true} restaurant={false}/>
        </div>
    );
}