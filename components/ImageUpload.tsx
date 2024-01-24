"use client"
import { FormEvent, useState } from "react";

export default function ImageUpload({ id, item, restaurant }: { id: string | string[], item: boolean, restaurant: boolean }) {
    const [file, setFile] = useState<FileList>();

    function handleChange(files: FileList | null) {
        console.log(files);
        if (files) setFile(files);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(file);
        let formData = new FormData();

        const base_url = process.env.NEXT_PUBLIC_BASE_URL;
        if (!base_url) throw new Error('BASE_URL is not defined')

        if (file) {
            for (let i = 0; i < file.length; i++) {
                formData.append('item_images', file[i]);
            }
        }

        formData.append('Content-Type', 'multipart/form-data; boundary=---------------' + Date.now())

        console.log(formData)

        const entity = item ? "items" : "restaurants";

        const req = fetch(`${base_url}/${entity}/${id}/media`, {
            method: "POST",
            body: formData,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="App">
                <h2>Add Image:</h2>
                <input type="file" onChange={(e) => handleChange(e.target.files)} multiple />

                <div className="flex gap-2">
                    {
                        file && Array.from(file).map((f, idx) => (
                            <img key={idx} src={file && URL.createObjectURL(f)} width={60} />
                        ))
                    }
                </div>
                <button type="submit">
                    SUBMIT
                </button>
            </form>
        </>
    )
}