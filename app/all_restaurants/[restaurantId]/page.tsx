import ImageUpload from "@/components/ImageUpload";
import { itemColumns as columns } from "./columns";
import { ItemsTable } from "./data-table-items";


async function getData(restaurantId: string) {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    if (!base_url) throw new Error('BASE_URL is not defined')
    const res = await fetch(`${base_url}/restaurants/${restaurantId}/items?limit=200`, {
        method: 'GET',
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const responseData = await res.json();

    // Extract only the id and name from each item
    const extractedData = responseData.data.map(({ id, name }: { id: string, name: string }) => ({ id, name }));

    console.log('Extracted data:', extractedData);

    return extractedData;
}

export default async function Restaurant({ params }: any) {
    const data = await getData(params.restaurantId)
    return (
        <main className="bg-white flex flex-col items-center gap-2">
            <div className="text-xl">
                Restaurant Detail
            </div>
            <ImageUpload id={params.restaurantId} item={false} restaurant={true} />
            <div className="text-lg">
                Items in this restaurant
            </div>
            <ItemsTable columns={columns} data={data} />
        </main>
    );
}