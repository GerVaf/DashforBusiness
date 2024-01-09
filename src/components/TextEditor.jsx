import React from "react";
import { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import the CSS

const TextEditor = ({ handleEditorChange, value }) => {
  
  const toolbarOption = {
    buttonList: [
      ["undo", "redo", "font", "fontSize", "formatBlock"],
      [
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "removeFormat",
      ],
      [
        "fontColor",
        "hiliteColor",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "table",
      ],
      ["link", "image", "fullScreen", "showBlocks", "preview"],
    ],
    font: ["Roboto", "Open Sans", "Noto Sans Myanmar", "Inconsolata"],
    
  };
  
  return (
    <SunEditor
      height="500"
      defaultValue={value}
      setDefaultStyle="font-family: Roboto; font-size: 16px;"
      setOptions={toolbarOption}
      onChange={handleEditorChange}
    />
  );
};

export default TextEditor;
