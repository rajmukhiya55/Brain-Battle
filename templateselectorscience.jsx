import React, { useState } from "react";

const templates = [
  { id: 1, name: "Template 1", image: "/science/template1.jpg" },
  { id: 2, name: "Template 2", image: "/science/template2.jpg" },
  { id: 3, name: "Template 3", image: "/science/template3.jpg" },
  { id: 4, name: "Template 4", image: "/science/template4.jpg" },
  { id: 5, name: "Template 5", image: "/science/template5.jpg" },
  { id: 6, name: "Template 6", image: "/science/template6.jpg" },
  { id: 7, name: "Template 7", image: "/science/template7.jpg" },
  { id: 8, name: "Template 8", image: "/science/template8.jpg" },
  { id: 9, name: "Template 9", image: "/science/template9.jpg" },
  { id: 10, name: "Template 10", image: "/science/template10.jpg" }
];

const TemplateSelectorScience = ({ onSelect }) => {
  const [customImage, setCustomImage] = useState(null);

  const handleCustomImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
      onSelect({ id: "custom-image", name: "Custom Image", image: imageUrl });
    }
  };

  return (
    <div className="container mt-4">
      <h3>Select a Background Template For Science Quiz</h3>

      <br/>
      <br/>

      {/* Template Images */}
      <div className="d-flex gap-3 flex-wrap">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            style={{
              width: "200px",
              height: "120px",
              backgroundImage: `url(${template.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "2px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "end",
              padding: "8px",
              color: "#fff",
              fontWeight: "bold",
              textShadow: "1px 1px 4px black"
            }}
          >
            {template.name}
          </div>
        ))}
      </div>

      <br/>
      <br/>

      {/* Custom Image Upload */}
      <div className="mt-4">
        <h4>Upload Your Own Background</h4>
        <input
          type="file"
          accept="image/*"
          onChange={handleCustomImage}
          style={{ cursor: "pointer" }}
        />
        {customImage && (
          <div
            className="mt-2"
            style={{
              width: "200px",
              height: "120px",
              backgroundImage: `url(${customImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              border: "2px solid #ccc"
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelectorScience;
