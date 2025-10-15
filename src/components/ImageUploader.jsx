import { useState } from "react";
import UploadIcon from "../assets/upload.png";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function ImageUploader({ selectedTemplate }) {
    const [images, setImages] = useState([]);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    // Function to calculate image display style based on template ratio
    const getImageStyle = () => {
        if (!selectedTemplate?.ratio) return {};

        const [ratioWidth, ratioHeight] = selectedTemplate.ratio.split(':').map(Number);
        const targetRatio = ratioWidth / ratioHeight;

        return {
            aspectRatio: `${ratioWidth} / ${ratioHeight}`,
            objectFit: 'cover',
            width: '100%',
            height: '100%'
        };
    };

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

    const handleDownloadAll = async () => {
    if (images.length === 0) return alert("No images to download.");

    const zip = new JSZip();
    const ratioMap = { "1:1": 1, "16:9": 16 / 9, "7:5": 7 / 5 };
    const aspectRatio = ratioMap[selectedTemplate?.ratio] || 7 / 5;

    for (let i = 0; i < images.length; i++) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = images[i].url;

        await new Promise((res) => (img.onload = res));

        // Match source resolution for quality
        const srcW = img.naturalWidth;
        const srcH = img.naturalHeight;
        const srcRatio = srcW / srcH;

        let cropW, cropH, offsetX, offsetY;

        if (srcRatio > aspectRatio) {
            // crop width
            cropH = srcH;
            cropW = cropH * aspectRatio;
            offsetX = (srcW - cropW) / 2;
            offsetY = 0;
        } else {
            // crop height
            cropW = srcW;
            cropH = cropW / aspectRatio;
            offsetX = 0;
            offsetY = (srcH - cropH) / 2;
        }

        const canvas = document.createElement("canvas");
        canvas.width = cropW;
        canvas.height = cropH;

        const ctx = canvas.getContext("2d");
        ctx.filter = `contrast(${selectedTemplate?.contrast ?? 1}) saturate(${selectedTemplate?.saturation ?? 1}) brightness(${selectedTemplate?.brightness ?? 1})`;
        ctx.drawImage(img, offsetX, offsetY, cropW, cropH, 0, 0, cropW, cropH);

        const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 1.0));
        zip.file(`edited-${i + 1}.jpg`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "edited_images.zip");
};

    return (
        <div className="border border-gray-300 rounded-lg p-4 max-w-xl mx-auto">
            {/* Top Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl text-gray-700 font-bold">Image</h1>
                    <button
                        onClick={handleDownloadAll}
                        className="px-3 py-1 border border-gray-400 rounded bg-white text-gray-700 hover:bg-gray-100 transition"
                    >
                        Download
                    </button>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4">
                {/* Inner Upload Box */}
<div
    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 bg-gray-100 rounded-lg p-6 cursor-pointer hover:bg-gray-200"
    onDrop={(e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(f =>
            ["image/png", "image/jpeg", "image/webp"].includes(f.type)
        );
        if (files.length === 0) return alert("Only image files allowed.");
        handleFiles({ target: { files } });
    }}
    onDragOver={(e) => e.preventDefault()}
>
    <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-700 font-semibold text-lg">
            <img src={UploadIcon} alt="upload" className="w-5 h-5" />
        </span>
        <span className="text-gray-700 font-semibold">Upload</span>
    </div>
    <p className="text-gray-500 text-sm">Click or drag & drop images here.</p>
    <p className="text-gray-400 text-xs mt-1">
        JPG, PNG, WEBP — Max 10 MB each.
    </p>
    <input
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.webp"
        onChange={handleFiles}
        className="hidden"
    />
</div>


                {/* Thumbnails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, idx) => {
                        const contrast = selectedTemplate?.contrast ?? 1;
                        const saturation = selectedTemplate?.saturation ?? 1;
                        const brightness = selectedTemplate?.brightness ?? 1;

                        // Map template ratio to numeric
                        const ratioMap = {
                            "1:1": 1,
                            "16:9": 16 / 9,
                            "7:5": 7 / 5,
                        };
                        const aspectRatio = ratioMap[selectedTemplate?.ratio] || 7 / 5;

                        return (
                            <div
                                key={idx}
                                className="relative border border-gray-300 bg-white rounded overflow-hidden w-full"
                                style={{ aspectRatio }}
                            >
                                <div className="w-full h-full">
                                    <img
                                        src={img.url}
                                        alt={`upload-${idx}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            filter: `contrast(${contrast}) saturate(${saturation}) brightness(${brightness})`,
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-white rounded px-1 text-sm hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    X
                                </button>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}