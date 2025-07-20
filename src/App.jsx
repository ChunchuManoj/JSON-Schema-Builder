import React, { useState } from "react";
import { Tabs, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import SchemaBuilder from "./components/SchemaBuilder";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [schema, setSchema] = useState({});

  const handleSubmit = () => {
    console.log("Submitted Schema:", schema);
    alert("Schema submitted! Check console.");
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
      message.success("JSON copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy JSON");
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <div className="parent">
        <div className="left-panel">
          <SchemaBuilder onSchemaChange={setSchema} />
          <Button type="primary" onClick={handleSubmit} className="submit-btn">
            Submit
          </Button>
        </div>
        <div className="right-panel">
          <div className="json-header-row">
            <h4 style={{ margin: 0 }}>JSON Preview</h4>
            <Button
              icon={<CopyOutlined />}
              onClick={handleCopyJSON}
              className="copy-btn"
              size="small"
            >
              Copy
            </Button>
          </div>
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
