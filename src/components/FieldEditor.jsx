import React from "react";
import { Input, Select, Switch, Space, Card, Button, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";

const { Option } = Select;

const FieldEditor = ({ fields, onChange, path = [] }) => {
  const updateField = (index, newField) => {
    const updated = [...fields];
    updated[index] = newField;
    onChange(updated);
  };

  const addField = () => {
    const newField = {
      id: uuid(),
      name: "field_" + fields.length,
      type: "string",
      data: "",
      show: true,
      children: [],
    };
    onChange([...fields, newField]);
  };

  const deleteField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    onChange(updated);
  };

  const toggleField = (index) => {
    const updated = [...fields];
    updated[index].show = !updated[index].show;
    onChange(updated);
  };

  const validateData = (value, type) => {
    if (!value) return true; // Allow empty values

    switch (type) {
      case "number":
        return !isNaN(Number(value)) && value.trim() !== "";
      case "float":
        return !isNaN(parseFloat(value)) && value.trim() !== "";
      case "boolean":
        return value === "true" || value === "false";
      case "objectId":
        return value === "" || /^[0-9a-fA-F]{24}$/.test(value); // Allow empty or valid ObjectId
      case "array":
        return true; // Accept any string, will split on output
      case "string":
      default:
        return true; // Allow any string
    }
  };

  const handleDataChange = (index, value, type) => {
    if (validateData(value, type)) {
      updateField(index, { ...fields[index], data: value });
    } else {
      if (type === "objectId") {
        message.warning(
          "Please enter a valid 24-character ObjectId (hex string)"
        );
      } else {
        message.warning(`Please enter a valid ${type} value`);
      }
    }
  };

  const getInputType = (type) => {
    switch (type) {
      case "number":
      case "float":
        return "number";
      case "boolean":
      case "objectId":
      case "array":
        return "text";
      default:
        return "text";
    }
  };

  const getPlaceholder = (type) => {
    switch (type) {
      case "number":
        return "Enter number (e.g., 42)";
      case "float":
        return "Enter decimal (e.g., 3.14)";
      case "boolean":
        return "Select true or false";
      case "objectId":
        return "Enter 24-character ObjectId";
      case "array":
        return "Enter values separated by ','";
      case "string":
      default:
        return "Enter text";
    }
  };

  const renderDataInput = (field, index) => {
    if (field.type === "boolean") {
      return (
        <Select
          value={field.data}
          onChange={(value) => handleDataChange(index, value, field.type)}
          placeholder="Select true or false"
          style={{ flex: 1, minWidth: 120 }}
          allowClear
        >
          <Option value="true">true</Option>
          <Option value="false">false</Option>
        </Select>
      );
    } else {
      return (
        <Input
          value={field.data}
          onChange={(e) => handleDataChange(index, e.target.value, field.type)}
          placeholder={getPlaceholder(field.type)}
          type={field.type === "objectId" ? "text" : getInputType(field.type)}
          style={{ flex: 1, minWidth: 120 }}
        />
      );
    }
  };

  return (
    <div className="editor">
      {fields.map((field, index) => (
        <Card
          key={field.id}
          className="field-card"
          size="small"
          title={`${path.join(".") || "root"} > ${field.name}`}
          extra={
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteField(index)}
              size="small"
              danger
            />
          }
        >
          <div className="field-controls">
            <Input
              value={field.name}
              onChange={(e) =>
                updateField(index, { ...field, name: e.target.value })
              }
              placeholder="Field name"
              style={{ flex: 1, minWidth: 120 }}
            />
            <Select
              value={field.type}
              onChange={(val) => {
                updateField(index, {
                  ...field,
                  type: val,
                  data: "", // Clear data when type changes
                  children: val === "nested" ? field.children || [] : undefined,
                });
              }}
              style={{ width: 100 }}
            >
              <Option value="string">string</Option>
              <Option value="number">number</Option>
              <Option value="float">float</Option>
              <Option value="boolean">boolean</Option>
              <Option value="objectId">objectId</Option>
              <Option value="array">array</Option>
              <Option value="nested">nested</Option>
            </Select>
            {field.type !== "nested" && renderDataInput(field, index)}
            <Space>
              <span>Show</span>
              <Switch
                checked={field.show}
                onChange={() => toggleField(index)}
              />
            </Space>
          </div>

          {field.type === "nested" && field.show && (
            <FieldEditor
              fields={field.children || []}
              onChange={(childFields) =>
                updateField(index, { ...field, children: childFields })
              }
              path={[...path, field.name]}
            />
          )}
        </Card>
      ))}
      <Button className="add-btn" onClick={addField} icon={<PlusOutlined />}>
        Add Field
      </Button>
    </div>
  );
};

export default FieldEditor;
