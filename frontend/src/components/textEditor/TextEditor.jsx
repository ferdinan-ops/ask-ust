import React, { useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ThemeContext } from "../../context/themeContext";

import "./textEditor.scss";

const TextEditor = ({ setContent, content }) => {
   const { darkMode } = useContext(ThemeContext);

   const defaultInit = {
      height: 500,
      menubar: false,
      plugins: "codesample link lists image",
      placeholder: "Isikan deskripsi dari pertanyaanmu ",
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
   }

   return (
      <>
         <Editor
            id="FIXED_ID"
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onEditorChange={(newValue) => setContent(newValue)}
            value={content}
            init={darkMode ? { ...defaultInit, skin: "oxide-dark", content_css: "dark" } : defaultInit}
         />
      </>
   )
}

export default TextEditor;