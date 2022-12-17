import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./textEditor.scss";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

const TextEditor = ({ setContent, content }) => {
   const { darkMode } = useContext(ThemeContext);

   return (
      <>
         <Editor
            classname={darkMode ? "ddd" : ""}
            id="FIXED_ID"
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onEditorChange={(newValue) => {
               setContent(newValue);
            }}
            value={content}
            init={{
               content_style: `body { color: "#272d3e"; }`,
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
                  " | bold italic | " +
                  " | image link codesample | numlist bullist",
            }}
         />
      </>
   )
}

export default TextEditor;