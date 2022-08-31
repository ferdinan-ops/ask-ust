import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import Prism from "prismjs";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function TextEditor({ setContent }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [uploadedImages, setUploadedImages] = useState([]);

  const contentHandler = (newState) => {
    setEditorState(newState);
    setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  useEffect(() => Prism.highlightAll(), []);

  function uploadImageCallBack(file) {}

  return (
    <div className="input-create min-h-[450px]">
      <Editor
        editorState={editorState}
        onEditorStateChange={(newState) => contentHandler(newState)}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "list",
            "link",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false },
          },
        }}
      />
    </div>
  );
}
