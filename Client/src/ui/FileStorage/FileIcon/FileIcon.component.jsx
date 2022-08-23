import { FileIcon as FileExtIcon, defaultStyles } from "react-file-icon";
import { styleDefObj } from "./StyleCustomize";

export default function FileIcon({ extension }) {
    const customDefaultLabelColor = styleDefObj[extension]
        ? styleDefObj[extension]["labelColor"] ?? "#777"
        : "#777";

    // Library defined default labelCOlor
    const libDefaultGlyphColor =
        defaultStyles[extension] && defaultStyles[extension]["labelColor"];

    return (
        <FileExtIcon
            extension={extension}
            glyphColor={libDefaultGlyphColor ?? customDefaultLabelColor}
            labelColor={customDefaultLabelColor}
            {...defaultStyles[extension]}
            {...styleDefObj[extension]}
        />
    );
}
