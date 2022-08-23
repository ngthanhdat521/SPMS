import React, { useEffect, useRef, useState } from "react";
import File from "../../../../ui/FileStorage/File/File.component";
import Folder from "../../../../ui/FileStorage/Folder/Folder.component";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import BackButton from "../../../../ui/FileStorage/BackButton/BackButton.component";
import SampleDocumentService from "../../../../services/Supporter/SampleDocument/SampleDocument";
import styles from "./SampleDocument.module.scss";
import LoadingFileContainer from "../../../../ui/Loading/LoadingFileContainer/LoadingFileContainer.component";

function SampleDocument() {
    const [path, setPath] = useState([]);
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [documents, setDocuments] = useState({
        root: {},
    });

    const mapDocuments = () => {
        let dir = { ...documents };
        path.map((pathName) => {
            dir = dir[pathName];
        });

        let newFolders = [];
        for (let name in dir) if (name !== "files") newFolders.push(name);

        setFolders(newFolders);
        setFiles(dir.files !== undefined ? dir.files : []);
    };

    const openFolder = (folderName) => {
        let newPath = [...path];
        newPath.push(folderName);
        setPath(newPath);
    };

    const backFolder = () => {
        let newPath = [...path];
        if (newPath.length > 1) {
            newPath.pop();
            setPath(newPath);
        }
    };

    const queryDocument = (index, docs, callback) => {
        if (path.length === index) {
            callback(index, docs);
            return documents;
        } else return queryDocument(index + 1, docs[path[index]], callback);
    };

    const changePath = (index) => {
        let newPath = [...path];
        newPath.splice(index + 1, path.length - index);
        setPath(newPath);
    };

    const downloadFile = (fileName) => {
        let pathName = getPathName();

        SampleDocumentService.downloadFile(pathName, fileName);
    };

    const getPathName = () => {
        let pathName = "";

        path.map((folder) => {
            if (folder !== "root") pathName += `/${folder}`;
        });

        return pathName;
    };

    useEffect(async () => {
        mapDocuments();
    }, [path]);

    useEffect(async () => {
        let { data, isSucess } = await SampleDocumentService.load();

        if (isSucess) setDocuments(data);

        let newPath = [...path];
        newPath.push("root");
        setPath(newPath);

        setIsLoading(false);
    }, []);

    return (
        <div className={styles["sample-document"]}>
            <Header>
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <h5>Sample Document</h5>
                </div>
            </Header>
            <Body>
                <div className={styles["sample-document_container"]}>
                    <div className="">
                        <div className="py-3">
                            <span>Current folder : </span>
                            {path.map((pathName, index) => (
                                <span>
                                    <span
                                        onClick={() => changePath(index)}
                                        className="cursor-pointer"
                                    >
                                        /{pathName}
                                    </span>
                                </span>
                            ))}
                        </div>
                        <hr className="" />
                    </div>
                    <div
                        className={
                            styles["sample-document_container_list"] + " d-flex"
                        }
                    >
                        <div onClick={backFolder} className="p-3">
                            <BackButton />
                        </div>

                        {isLoading ? (
                            <LoadingFileContainer />
                        ) : (
                            <>
                                {folders.map((folder, index) => (
                                    <div key={index} className="p-3">
                                        <Folder
                                            onOpen={() => openFolder(folder)}
                                            folderName={folder}
                                        />
                                    </div>
                                ))}

                                {files.map((file, index) => (
                                    <div key={index} className="p-3">
                                        <File
                                            onDownload={downloadFile}
                                            fileName={file.name}
                                            size={file.size}
                                            createdAt={file.createdAt}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </Body>
        </div>
    );
}

export default SampleDocument;
