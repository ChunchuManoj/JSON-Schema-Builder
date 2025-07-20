# JSON Schema Builder

A modern, responsive web app for interactively building and previewing JSON schemas and data. Built with React and Ant Design, this tool lets you visually construct complex JSON objects, including nested fields, arrays, booleans, and more.

![screenshot](public/vite.svg)

## Features

- **Visual Schema Editing:** Add, remove, and nest fields with intuitive controls.
- **Supported Types:** string, number, float, boolean, objectId, array, nested objects.
- **Array Support:** Enter comma-separated values to create arrays.
- **Boolean Dropdown:** Select true/false from a dropdown.
- **ObjectId Validation:** Ensures valid 24-character hex strings for objectId fields.
- **Live JSON Preview:** See your schema/data as formatted JSON in real time.
- **Copy to Clipboard:** One-click copy of the generated JSON.
- **Responsive Design:** Works beautifully on desktop and mobile.
- **Modern UI:** Clean, card-based layout with a professional color palette.
- **Favicon:** Custom `{}` logo in the browser tab.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ChunchuManoj/JSON-Schema-Builder.git
   cd JSON-Schema-Builder
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Usage

- **Add Fields:** Click "Add Field" to create a new field. Set its name and type.
- **Supported Types:**
  - `string`, `number`, `float`, `boolean`, `objectId`, `array`, `nested`
- **Array Fields:**
  - Select `array` as the type. Enter values separated by commas (e.g., `a, b, c`).
- **Boolean Fields:**
  - Select `boolean` as the type. Choose `true` or `false` from the dropdown.
- **ObjectId Fields:**
  - Select `objectId` as the type. Enter a 24-character hex string.
- **Nested Fields:**
  - Select `nested` as the type to add sub-fields.
- **Show/Hide Fields:**
  - Use the toggle to include/exclude fields from the output.
- **Copy JSON:**
  - Click the "Copy" button in the JSON preview panel to copy the output.

## Tech Stack

- **Frontend:** React, Ant Design, Vite
- **Styling:** Custom CSS, Ant Design
- **Icons:** Ant Design Icons

## Customization

- **Color Palette:** Easily change colors in `src/styles/custom.css`.
- **Favicon:** Replace `public/favicon.svg` for a different logo.
- **Schema Logic:** Extend `FieldEditor.jsx` and `SchemaBuilder.jsx` for more types or validation.

## Folder Structure

```
Frontend/
  public/
    favicon.svg
    vite.svg
  src/
    components/
      FieldEditor.jsx
      SchemaBuilder.jsx
      Header.jsx
      Footer.jsx
    styles/
      custom.css
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
```

## License

MIT
