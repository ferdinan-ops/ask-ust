import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "prismjs/themes/prism-laserwave.css";
import Prism from "prismjs";

function TinyEditor({ content, setContent }) {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <>
      <Editor
        id="FIXED_ID"
        apiKey="hx13dzsnd0w3pdkmb5180tdrj6mwu2vmfa04odeeq9pphqi9"
        onEditorChange={(newValue) => {
          setContent(newValue);
        }}
        value={content}
        init={{
          height: 500,
          menubar: false,
          plugins: "codesample link lists image",
          codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "JavaScript", value: "javascript" },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C#", value: "csharp" },
            { text: "C++", value: "cpp" },
          ],
          toolbar:
            "undo redo " +
            "| bold italic backcolor | " +
            "image codesample link | numlist bullist | " +
            "removeformat | help",
        }}
      />
    </>
  );
}

export default TinyEditor;
