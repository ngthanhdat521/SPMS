import React, { useEffect, useRef, useState } from "react";
import File from "../../../../ui/FileStorage/File/File.component";
import Folder from "../../../../ui/FileStorage/Folder/Folder.component";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Button } from "@mui/material";
import Header from "../../../../components/Header/Header.component";
import Body from "../../../../components/Body/Body.component";
import BackButton from "../../../../ui/FileStorage/BackButton/BackButton.component";
import FolderForm from "../../../../ui/Form/FolderForm/FolderForm.component";
import FileUploader from "../../../../services/File/FileUploader/FileUploader";
import styles from "./DocumentManagement.module.scss";
import SampleDocumentService from "../../../../services/Supporter/SampleDocument/SampleDocument";
import BasicSnackbar from "../../../../ui/Snackbar/BasicSnackbar/BasicSnackbar.component";
import LoadingFileContainer from "../../../../ui/Loading/LoadingFileContainer/LoadingFileContainer.component";

function DocumentManagement() {
    const [path, setPath] = useState([]);
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState({
        isOpen: false,
        content: "",
    });

    const [documents, setDocuments] = useState({
        root: {
            "Scrum Project": {
                Proposal: {
                    v1: {},
                    files: [
                        {
                            name: "Proposal.docx",
                            size: 100000,
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                        {
                            name: "Proposal-v1.xlsx",
                            size: 100000,
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                        {
                            name: "Presentation.pptx",
                            size: 100000,
                            createdAt: "2022-02-24 15:15:41.781+07",
                        },
                    ],
                },

                files: [
                    {
                        name: "Test.docx",
                        size: 100000,
                        createdAt: "2022-02-24 15:15:41.781+07",
                    },
                ],
            },
            "Water Fall": {},
            "Other Process": {},
            files: [],
        },
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

    const createFolder = async (folderName) => {
        let newFolders = [...folders];

        let pathName = getPathName();

        let { message, hasExisted } = await SampleDocumentService.addFolder(
            pathName,
            folderName,
            folders
        );

        if (!hasExisted) {
            newFolders.push(folderName);
            setFolders(newFolders);
            setDocuments(
                queryDocument(0, documents, (index, docs) => {
                    docs[folderName] = {};
                })
            );
        }

        setMessage(message);
    };

    const uploadFile = (e) => {
        FileUploader.upload(async (event) => {
            let newFiles = [...files];
            let uploadedFiles = event.target.files;

            for (let index = 0; index < uploadedFiles.length; index++) {
                let count = 0;
                let name = uploadedFiles[index].name;

                newFiles.map((v) => {
                    console.log(v);
                    if (v.name.indexOf(uploadedFiles[index].name) >= 0) count++;
                });

                if (count > 0)
                    name =
                        uploadedFiles[index].name.substring(
                            0,
                            uploadedFiles[index].name.indexOf(".")
                        ) +
                        "(" +
                        count +
                        ")" +
                        uploadedFiles[index].name.substring(
                            uploadedFiles[index].name.indexOf("."),
                            uploadedFiles[index].name.length
                        );

                let newFile = {
                    name: name,
                    size: uploadedFiles[index].size,
                    createdAt: new Date().toISOString(),
                };

                newFiles.push(newFile);
            }

            let newDocuments = queryDocument(0, documents, (index, docs) => {
                docs.files = newFiles;
            });

            setFiles(newFiles);
            setDocuments(newDocuments);
            await SampleDocumentService.addFiles(uploadedFiles, getPathName());
        });
    };

    const changePath = (index) => {
        let newPath = [...path];
        newPath.splice(index + 1, path.length - index);
        setPath(newPath);
    };

    const deleteItem = async (name) => {
        let newDocuments = queryDocument(0, documents, (index, docs) => {
            if (name.indexOf(".") >= 0) {
                docs.files = docs.files.filter((file) => file.name !== name);
            } else delete docs[name];
        });

        let newPath = [...path];
        setDocuments(newDocuments);
        setPath(newPath);

        let pathName = getPathName();

        await SampleDocumentService.remove(pathName, name);
    };

    const getPathName = () => {
        let pathName = "";

        path.map((folder) => {
            if (folder !== "root") pathName += `/${folder}`;
        });

        return pathName;
    };

    const downloadFile = (fileName) => {
        let pathName = getPathName();

        SampleDocumentService.downloadFile(pathName, fileName);
    };

    const renameItem = async (oldName, newName) => {
        let newDocuments = queryDocument(0, documents, (index, docs) => {
            if (oldName.indexOf(".") >= 0) {
                for (let i in docs.files)
                    if (docs.files[i].name === oldName)
                        docs.files[i].name = newName;
            } else {
                docs[newName] = { ...docs[oldName] };
                delete docs[oldName];
            }
        });

        let newPath = [...path];
        setDocuments(newDocuments);
        setPath(newPath);

        let pathName = getPathName();

        await SampleDocumentService.rename(pathName, oldName,newName);
    };

    const closeMessage = () => setMessage({ isOpen: false, content: "" });

    useEffect(() => {
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
        <div className={styles["document-management"]}>
            <Header>
                <h5>Sample Document</h5>
            </Header>
            <Body>
                <BasicSnackbar
                    isOpen={message.isOpen}
                    content={message.content}
                    onClose={closeMessage}
                />
                <div className={styles["document-management_container"]}>
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
                        <div className="d-flex justify-content-between py-2">
                            <div className="d-flex">
                                <Button
                                    onClick={uploadFile}
                                    className="mr-3"
                                    variant="contained"
                                >
                                    <BackupOutlinedIcon className="mr-2" />
                                    Upload
                                </Button>
                                <FolderForm
                                    onSubmit={(folderName) =>
                                        createFolder(folderName)
                                    }
                                >
                                    <Button
                                        className="mr-3"
                                        variant="contained"
                                    >
                                        <DriveFolderUploadOutlinedIcon className="mr-1" />
                                        Create Folder
                                    </Button>
                                </FolderForm>

                                <div className="btn-group mr-2">
                                    <button
                                        type="button"
                                        className="btn btn-default md-btn-flat dropdown-toggle px-2"
                                        data-toggle="dropdown"
                                    >
                                        <i className="ion ion-ios-settings" />
                                    </button>
                                    <div className="dropdown-menu">
                                        <a
                                            className="dropdown-item"
                                            href="javascript:void(0)"
                                        >
                                            Move
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="javascript:void(0)"
                                        >
                                            Copy
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="javascript:void(0)"
                                        >
                                            Remove
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="btn-group btn-group-toggle"
                                    data-toggle="buttons"
                                >
                                    <label className="btn btn-default icon-btn md-btn-flat active">
                                        {" "}
                                        <input
                                            type="radio"
                                            name="file-manager-view"
                                            defaultValue="file-manager-col-view"
                                            defaultChecked
                                        />{" "}
                                        <span className="ion ion-md-apps" />{" "}
                                    </label>
                                    <label className="btn btn-default icon-btn md-btn-flat">
                                        {" "}
                                        <input
                                            type="radio"
                                            name="file-manager-view"
                                            defaultValue="file-manager-row-view"
                                        />{" "}
                                        <span className="ion ion-md-menu" />{" "}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-divider" />
                    </div>
                    <div
                        className={
                            styles["document-management_container_list"] +
                            " d-flex"
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
                                            onRename={renameItem}
                                            onOpen={() => openFolder(folder)}
                                            onDelete={() => deleteItem(folder)}
                                            folderName={folder}
                                        />
                                    </div>
                                ))}
                                {files.map((file, index) => (
                                    <div key={index} className="p-3">
                                        <File
                                            onRename={renameItem}
                                            onDownload={downloadFile}
                                            fileName={file.name}
                                            size={file.size}
                                            createdAt={file.createdAt}
                                            onDelete={() =>
                                                deleteItem(file.name)
                                            }
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

export default DocumentManagement;
