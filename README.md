## R1 – Image Upload
**Description:** Allow users to upload `.png` and `.jpg` images from their local device.

**Acceptance Criteria:**

1. Users can select multiple images at once.
2. Uploaded images are previewed as thumbnails.
3. File type validation is applied.

**Subtasks:**

1. Add file input element supporting multiple selection.
2. Implement file type validation for `.png` and `.jpg`.
3. Render image thumbnails after selection.
4. Store uploaded images in memory for further processing.

## R2 – Template Selection
**Description:** Enable users to select from predefined photo adjustment templates.

**Acceptance Criteria:**

1. At least 2 example templates available (Warm, Cool).
2. Template shows parameters: size, contrast, saturation, color temperature, brightness.
3. Selecting a template highlights it in the UI.

**Subtasks:**

1. Create a data structure for templates.
2. Render template selection buttons/cards.
3. Add click event to select template and update active state.
4. Display template parameters in a sidebar or modal.

## R3 – Apply Template to Image
**Description:** Apply the selected template’s adjustments to uploaded images in real-time.

**Acceptance Criteria:**

1. Live preview of each image with applied template.
2. Adjustments include size, contrast, saturation, color temperature, brightness.
3. Switching templates updates previews instantly.

**Subtasks:**

1. Implement canvas or CSS/JS filters to apply template adjustments.
2. Loop through all uploaded images and apply effects.
3. Update preview thumbnails dynamically on template change.
4. Ensure performance is smooth for multiple images.

## R4 – Export/Download Images
**Description:** Allow users to download all edited images to their local device.

**Acceptance Criteria:**

1. Single click “Export All” downloads images.
2. Multiple images are zipped into a single file.
3. Exported images retain template effects.

**Subtasks:**

1. Use Canvas API to generate final image data.
2. Implement image conversion to `.png` or `.jpg`.
3. Integrate `JSZip` to bundle multiple images.
4. Trigger download automatically after zip is created.

## R5 – Basic Template Management
**Description:** Allow users to create and save their own templates.

**Acceptance Criteria:**

1. Users can adjust parameters.
2. Save custom template to localStorage.
3. Custom templates appear in the selection list.

**Subtasks:**

1. Add input box for all editable parameters.
2. Capture the input values and construct a template object.
3. Save template object in localStorage.
4. Load saved templates and append to template selection list.