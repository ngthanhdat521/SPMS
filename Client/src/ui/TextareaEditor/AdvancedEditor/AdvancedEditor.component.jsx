import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import FullEditor from 'ckeditor5-build-full'
import "./AdvancedEditor.stylesheet.css";

function AdvancedEditor({ defaultValue, onChange }) {
    return (
        <CKEditor
            editor={FullEditor}
            config={{
                removePlugins: [
                    // "CKFinderUploadAdapter",
                    // "CKFinder",
                    // "EasyImage",
                    // "Image",
                    // "ImageCaption",
                    // "ImageStyle",
                    // "ImageToolbar",
                    "ImageUpload",
                    "MediaEmbed",
                ],
                
            }}
            data={defaultValue}
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                onChange(data);
            }}
            onBlur={(event, editor) => {
                // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
                // console.log("Focus.", editor);
            }}
        />
    );
}

export default AdvancedEditor;
