
'use client';
import ImageUpload from "@/components/ImageUpload";
import { getItemDetails } from "@/components/data/GetItemDetail";
import { X } from "lucide-react";

export default async function ItemDetail({ params }: { params: any }) {
    const itemId: string | string[] | undefined = params.itemId

    const handleRemove = async (imageId: string) => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base_url) throw new Error('BASE_URL is not defined');

  const requestBody = { itemImageUrls: imageId };
  console.log('Request Payload:', JSON.stringify(requestBody));

  try {
    const res = await fetch(`${base_url}/medias/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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
    const itemImages = await getItemDetails(itemId)

    return (
        <div className="flex flex-col items-center">
            <div className="text-lg">Images for this item</div>
            <div className="flex flex-col gap-2">
                {
                    itemImages.map((image: any) => (
                        <div className="flex" key={image.id}>
                            <img key={image.id} src={image.url} alt={image.id} width={80} height={'auto'} />
                            <button key={image.url} onClick={() => handleRemove(image.url)} className="py-2 px-4 rounded hover:bg-[#fb9090]" type="button">
                                <X size={24} color="black" />
                            </button>
                        </div>
                    ))
                }
            </div>
            <ImageUpload id={itemId} item={true} restaurant={false} />
        </div>
    );
}