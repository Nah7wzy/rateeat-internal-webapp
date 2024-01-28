"use client"

import { getData as getRestaurantItems } from "@/app/all_restaurants/[restaurantId]/page"
import { Star } from "lucide-react"
import Link from "next/link"
import { ChangeEvent, useEffect, useState } from "react"

interface Item {
    id: string,
    name: string
}

export default function RestaurantDropdown({ restaurantData }: { restaurantData: { id: string, name: string }[] }) {
    const [restaurantId, setRestaurantId] = useState<string>('')
    const [restaurantName, setRestaurantName] = useState<string>('')

    const [items, setItems] = useState<Item[]>([])
    const [itemId, setItemId] = useState<string>('')
    const [itemName, setItemName] = useState<string>('')

    const [review, setReview] = useState<string>('')
    const [rating, setRating] = useState<number>(0)


    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await getRestaurantItems(restaurantId);
            console.log('here are the items of selected restaurant', allItems)
            setItems(allItems);
        };
        if (restaurantId) fetchItems();
    }, [restaurantId]);

    function handleSubmit() {
        console.log('You clicked the button', restaurantName, itemId)
    }

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        setRestaurantId(e.target.value)
        setRestaurantName(e.target.selectedOptions[0].text)
    }

    function handleItemChange(e: ChangeEvent<HTMLSelectElement>) {
        setItemId(e.target.value)
        setItemName(e.target.selectedOptions[0].text)
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div>
                <select name="restaurants" value={restaurantId} onChange={handleChange}>
                    <option value="">--Choose restaurant--</option>
                    {
                        restaurantData.map(({ id, name }: { id: string, name: string }) =>
                            <option
                                key={id}
                                value={id}
                            >
                                {name}
                            </option>)}
                </select>
            </div>

            {items.length > 0 && (
                <div>
                    <select value={itemId} onChange={handleItemChange}>
                        <option value="">--Choose item--</option>
                        {
                            items.map(({ id, name }: { id: string, name: string }) =>
                                <option
                                    key={id}
                                    value={id}
                                >
                                    {name}
                                </option>)}
                    </select>
                </div>

            )}
            {(items.length > 0 && restaurantId) && (
                <>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                        <textarea
                            value={review}
                            className="bg-gray-100 p-10 rounded-lg"
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Enter your review here"
                        />
                        <div className="flex gap-1">
                            <div className="mr-10">
                                Give a rating:
                            </div>
                            {
                                Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                                    <Star
                                        key={num}
                                        size={30}
                                        className={rating >= num ? "text-yellow-500" : "text-gray-300"}
                                        onClick={() => setRating(num)}
                                    />
                                ))
                            }
                        </div>
                        <input type="submit" value="Share" className="bg-gray-300 hover:bg-gray-200 p-4 rounded-lg" />
                    </form>
                </>
            )}
        </div>
    )
}