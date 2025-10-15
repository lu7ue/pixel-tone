import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import TemplateSelector from "./components/TemplateSelector";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="App">
      <div className="mt-12 flex justify-center items-start gap-4 px-4">
        {/* Left: Image Uploader */}
        <div className="w-[600px] flex-shrink-0">
          <ImageUploader />
        </div>

        {/* Right: Template Selector */}
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={setSelectedTemplate}
        />
      </div>
    </div>
  );
}

export default App;
