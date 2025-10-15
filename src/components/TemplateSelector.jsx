import { useState } from "react";
import EditIcon from "../assets/edit.png";

export default function TemplateSelector({ selectedTemplate, onSelect }) {
    const [templates, setTemplates] = useState([
        {
            id: 1,
            name: "Photo Print",
            ratio: "7:5",
            contrast: 1.0,
            saturation: 0.8,
            brightness: 1.0,
        },
        {
            id: 2,
            name: "Movie",
            ratio: "16:9",
            contrast: 1.0,
            saturation: 0.8,
            brightness: 1.0,
        },
        {
            id: 3,
            name: "Square",
            ratio: "1:1",
            contrast: 1.0,
            saturation: 0.8,
            brightness: 1.0,
        },
    ]);

    const [editingTemplate, setEditingTemplate] = useState(null);

    const handleDelete = (id) => {
        setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
        if (selectedTemplate?.id === id) onSelect(null);
    };

    const handleAdd = () => {
        const newTemplate = {
            id: Date.now(),
            name: "New",
            ratio: "1:1",
            contrast: 1.0,
            saturation: 1.0,
            brightness: 1.0,
        };
        setTemplates((prev) => [newTemplate, ...prev]);
        onSelect(newTemplate);
    };

    const handleSaveEdit = () => {
        setTemplates((prev) =>
            prev.map((tpl) => (tpl.id === editingTemplate.id ? editingTemplate : tpl))
        );
        setEditingTemplate(null);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 max-w-sm bg-gray-50 relative">
            {/* Header with + button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-700 font-bold">Templates</h2>
                <button
                    onClick={handleAdd}
                    className="text-white bg-gray-400 hover:bg-gray-600 rounded px-2 font-bold"
                >
                    +
                </button>
            </div>

            {/* Template cards */}
            <div className="flex flex-col gap-3">
                {templates.map((tpl) => (
                    <div
                        key={tpl.id}
                        className={`relative cursor-pointer border rounded p-3 bg-white hover:bg-gray-100 transition ${selectedTemplate?.id === tpl.id ? "border-gray-700" : "border-gray-200"
                            }`}
                        onClick={() => {
                            if (selectedTemplate?.id === tpl.id) {
                                onSelect(null); // deselect if clicked again
                            } else {
                                onSelect(tpl); // select this template
                            }
                        }}

                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-700">{tpl.name}</h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingTemplate({ ...tpl });
                                    }}
                                    className="bg-white rounded px-2 text-xs hover:bg-gray-200 transition"
                                >
                                    <img src={EditIcon} alt="edit" className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(tpl.id);
                                    }}
                                    className="bg-white rounded px-3 text-xs hover:bg-red-500 hover:text-white transition"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Ratio: {tpl.ratio}</p>
                        <p className="text-xs text-gray-500">
                            Contrast: {tpl.contrast}, Saturation: {tpl.saturation}, Brightness: {tpl.brightness}
                        </p>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingTemplate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setEditingTemplate(null)}
                            className="absolute top-2 right-2 bg-gray-200 rounded px-2 text-sm hover:bg-red-500 hover:text-white transition"
                        >
                            X
                        </button>

                        <h3 className="text-lg font-bold mb-6">Edit Template</h3>

                        <div className="flex flex-col gap-4">
                            {/* Name */}
                            <label className="flex justify-between items-center">
                                Name:
                                <input
                                    type="text"
                                    value={editingTemplate.name.slice(0, 20)} // always display first 20 chars
                                    maxLength={20} // prevent typing beyond 20 chars
                                    onChange={(e) =>
                                        setEditingTemplate({ ...editingTemplate, name: e.target.value })
                                    }
                                    className="border rounded px-2 py-1 w-48"
                                />

                            </label>

                            {/* Ratio Dropdown */}
                            <label className="flex justify-between items-center">
                                Ratio:
                                <select
                                    value={editingTemplate.ratio}
                                    onChange={(e) =>
                                        setEditingTemplate({ ...editingTemplate, ratio: e.target.value })
                                    }
                                    className="border rounded px-2 py-1 w-48"
                                >
                                    <option value="1:1">1:1 (Square)</option>
                                    <option value="16:9">16:9 (Movie)</option>
                                    <option value="7:5">7:5 (Photo print)</option>
                                </select>
                            </label>

                            {/* Contrast Slider */}
                            <div className="flex flex-col gap-1">
                                <span className="text-base text-gray-700">Contrast</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="3"
                                        step="0.05"
                                        value={editingTemplate.contrast}
                                        onChange={(e) =>
                                            setEditingTemplate({ ...editingTemplate, contrast: parseFloat(e.target.value) })
                                        }
                                        className="w-full h-2 rounded-lg accent-blue-300 bg-gradient-to-r from-green-200 to-blue-200"
                                    />
                                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                                        {editingTemplate.contrast.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Saturation Slider */}
                            <div className="flex flex-col gap-1">
                                <span className="text-base text-gray-700">Saturation</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="3"
                                        step="0.05"
                                        value={editingTemplate.saturation}
                                        onChange={(e) =>
                                            setEditingTemplate({ ...editingTemplate, saturation: parseFloat(e.target.value) })
                                        }
                                        className="w-full h-2 rounded-lg accent-blue-300 bg-gradient-to-r from-green-200 to-blue-200"
                                    />
                                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                                        {editingTemplate.saturation.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Brightness Slider */}
                            <div className="flex flex-col gap-1">
                                <span className="text-base text-gray-700">Brightness</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="3"
                                        step="0.05"
                                        value={editingTemplate.brightness}
                                        onChange={(e) =>
                                            setEditingTemplate({ ...editingTemplate, brightness: parseFloat(e.target.value) })
                                        }
                                        className="w-full h-2 rounded-lg accent-blue-300 bg-gradient-to-r from-green-200 to-blue-200"
                                    />
                                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                                        {editingTemplate.brightness.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Save button */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSaveEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
