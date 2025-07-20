import React, { useState, useEffect } from "react";
import FieldEditor from "./FieldEditor";

const SchemaBuilder = ({ onSchemaChange }) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const buildSchema = (fieldsList) => {
      const obj = {};
      for (let field of fieldsList) {
        if (!field.show) continue; // Skip hidden fields
        if (field.type === "nested") {
          obj[field.name] = buildSchema(field.children || []);
        } else if (field.type === "array") {
          obj[field.name] = field.data
            ? field.data.split(",").map((item) => item.trim())
            : [];
        } else {
          obj[field.name] = field.data;
        }
      }
      return obj;
    };
    onSchemaChange(buildSchema(fields));
  }, [fields, onSchemaChange]);

  return (
    <div>
      <FieldEditor fields={fields} onChange={setFields} />
    </div>
  );
};

export default SchemaBuilder;
