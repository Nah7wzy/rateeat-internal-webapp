"use client"
import { FormEvent, useState } from "react";

export default function ImageUpload({ id, item, restaurant }: { id: string | string[] | undefined, item: boolean, restaurant: boolean }) {
    const [file, setFile] = useState<FileList>();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("Upload Image/s");

    function handleChange(files: FileList | null) {
        if (files) setFile(files);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setFile(droppedFiles);
        }
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
            if (res.status == 201) setUploadMessage("You did it! Upload Successful :)");
            else setUploadMessage("Nah, try again. Upload Failed :(");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`${isDragging ? 'border-dashed border-2 border-[#4caf50]' : ''}`}
                onDragOver={() => handleDragOver}
                onDragEnter={() => handleDragEnter}
                onDragLeave={() => handleDragLeave}
                onDrop={() => handleDrop}
            >
                <h2>
                    {uploadMessage}
                </h2>
                <input type="file" onChange={(e) => handleChange(e.target.files)} multiple className="w-full h-24 bg-slate-200 rounded-lg" />

                <div className="flex gap-2">
                    {file &&
                        Array.from(file).map((f, idx) => (
                            <img key={idx} src={file && URL.createObjectURL(f)} width={60} />
                        ))}
                </div>
                <button type="submit">SUBMIT</button>
            </form>
        </>
    );
}
