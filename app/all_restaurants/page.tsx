import { RestaurantsTable } from "./data-table-restaurants";
import { columns } from "./columns";

export async function getAllRestaurantData() {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!base_url) throw new Error('BASE_URL is not defined')
    const res = await fetch(`${base_url}/restaurants?limit=200`, {
        method: 'GET',
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const responseData = await res.json();

    // Extract only the id and name from each restaurant
    const extractedData = responseData.data.map(({ id, name }: { id: string, name: string }) => ({ id, name }));

    console.log("Extracted Data:", extractedData);

    return extractedData;
}

export default async function AllRestaurants() {
    const data = await getAllRestaurantData()
    return (
        <main className="flex flex-col items-center">
            <div className="text-6xl font-bold">All Restaurants</div>
            <RestaurantsTable columns={columns} data={data} />
        </main>
    );
}