import React, { useState } from "react";

const DragAndDrop = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    // Process dropped files (you can upload or handle the files here)
    console.log("Dropped files:", files);

    setDragging(false);
  };

  return (
    <div
      className={`p-8 border-2 border-dashed border-gray-300 ${
        dragging ? "border-blue-500" : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p className="text-gray-500">Drop your file here</p>
    </div>
  );
};

export default DragAndDrop;
