import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white flex flex-col items-center">
      <div className="mb-">
        RateEat Internal Dashboard
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Link href="/all_restaurants" className="hover:bg-blue-100 p-5 text-black"> All Restaurants</Link>
        <Link href="/users" className="hover:bg-blue-100 p-5 text-black"> All Users</Link>
      </div>
    </div>
  );
}
