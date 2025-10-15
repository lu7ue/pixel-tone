import { useState } from "react";
import UploadIcon from "../assets/upload.png";

export default function ImageUploader() {
    const [images, setImages] = useState([]);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter((file) => {
            const isValidType = ["image/png", "image/jpeg", "image/webp"].includes(file.type);
            const isValidSize = file.size <= MAX_FILE_SIZE;
            return isValidType && isValidSize;
        });

        if (validFiles.length !== files.length) {
            alert("Some files were ignored due to invalid type or size > 10MB.");
        }

        const imagePreviews = validFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...imagePreviews]);
    };

    const removeImage = (idx) => {
        setImages((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 max-w-xl mx-auto">
            {/* Top Section */}
            <div className="mb-4">
                <h1 className="text-2xl text-gray-700 font-bold text-left">Image</h1>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4">
                {/* Inner Upload Box */}
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 bg-gray-100 rounded-lg p-6 cursor-pointer hover:bg-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-700 font-semibold text-lg"><img src={UploadIcon} alt="upload" className="w-5 h-5" /></span>
                        <span className="text-gray-700 font-semibold">Upload</span>
                    </div>
                    <p className="text-gray-500 text-sm">Choose images or drag & drop here.</p>
                    <p className="text-gray-400 text-xs mt-1">JPG, PNG, JPEG, WEBP. Max 10 MB for each file.</p>
                    <input
                        type="file"
                        multiple
                        accept=".png,.jpg,.jpeg,.webp"
                        onChange={handleFiles}
                        className="hidden"
                    />
                </label>

                {/* Thumbnails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative border border-gray-300 bg-white rounded overflow-hidden w-full"
                            style={{ aspectRatio: "7 / 5" }} // fixed 7:5 ratio
                        >
                            <div className="flex items-center justify-center w-full h-full">
                                <img
                                    src={img.url}
                                    alt={`upload-${idx}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <button
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-white rounded px-1 text-sm hover:bg-red-500 hover:text-white transition-colors"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
