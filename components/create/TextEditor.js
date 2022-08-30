import { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState();
  const contentHandler = (newState) => {
    setEditorState(newState);
    setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };
  console.log(content);

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
            "colorPicker",
            "link",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
}
