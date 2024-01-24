"use client"

import { useParams, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
export default function ItemDetail() {
    const itemId = useParams().itemId;
    const [file, setFile] = useState<File>();
    
    function handleChange(files: FileList | null) {
        console.log(files);
        if (files) setFile(files[0]);
    }
    
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(file);
        let formData = new FormData();
        
        const base_url = process.env.BASE_URL;
        if (!base_url)  throw new Error('BASE_URL is not defined')

        if (file) formData.append("item_images", file);
        
        formData.append('Content-Type', 'multipart/form-data; boundary=---------------' + Date.now())

        console.log(formData)
        const req = fetch(`${base_url}/items/${itemId}/media`, {
            method: "POST",
            body: formData,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={(e) => handleChange(e.target.files)} />
            <img src={file && URL.createObjectURL(file)} width={60}/>
            <button type="submit">
                SUBMIT
            </button>
        </form>
    );
}