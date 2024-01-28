import { getAllRestaurantData } from "../all_restaurants/page";
import { userColumns as columns } from "./columns";
import RestaurantDropdown from "./components/RestaurantDropdown";
import { UsersTable } from "./data-table-users";

async function getData() {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    if (!base_url) throw new Error('BASE_URL is not defined')
    const res = await fetch(`${base_url}/users?limit=200`, {
        method: 'GET',
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    const responseData = await res.json();

    const extractedData = responseData.users.map(({ id, first_name, last_name }: { id: string, first_name: string, last_name: string }) => ({ id, first_name, last_name }));

    console.log("Extracted Data:", extractedData);

    return extractedData;

}

export default async function UsersPage() {
    const data = await getData()
    const restaurantData = await getAllRestaurantData() // {id, name} 
    return (
        <div className="flex flex-col items-center gap-3">
            <div>
                Share User Experience
            </div>
            <div className="flex">
                <RestaurantDropdown restaurantData={restaurantData} />
            </div>
            <UsersTable columns={columns} data={data} />
        </div>
    );
}