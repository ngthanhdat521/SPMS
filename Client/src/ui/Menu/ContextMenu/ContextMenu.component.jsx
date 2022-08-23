import React, { useEffect, useRef, useState } from "react";
import styles from "./ContextMenu.module.scss";

function ContextMenu({ contextRef,children }) {
    const [invisible, setInvisible] = useState(true);
    const contextMenuRef = useRef();

    const handleContext = (event) => {
        event.preventDefault();
        const clickX = event.clientX;
        const clickY = event.clientY;
        contextMenuRef.current.style.left = `${clickX}px`;
        contextMenuRef.current.style.top = `${clickY}px`;
        setInvisible(false);
    };

    useEffect(() => {
        contextRef.current.addEventListener("contextmenu", handleContext);
        contextRef.current.addEventListener("click", () => setInvisible(true));
    }, []);

    return (
        <div
            ref={contextMenuRef}
            className={styles["context-menu"]}
        >
            {invisible || (
                <div className={styles["context-menu_container"]+ " default-box-shadow p-3"}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default ContextMenu;
