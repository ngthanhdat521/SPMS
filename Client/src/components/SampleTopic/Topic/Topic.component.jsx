import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import styles from "./Topic.module.scss";
import DateConverter from "../../../services/Converter/DateConverter";
import Tooltip from "@mui/material/Tooltip";
import FileIcon from "../../../ui/FileStorage/FileIcon/FileIcon.component";
import { download } from "../../../services/HttpClient/HttpClient";

function Topic({ projectName, projectDesc, createdAt, files }) {
    const downloadFile = (fileId) => {
        download({ url: `/api/fileStorage/download/${fileId}` });
    };
    return (
        <div className={styles["topic"]}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h3 className="mb-0">{projectName}</h3>
                </div>
            </div>
            <Tooltip title={projectDesc}>
                <p className={styles["topic_desc"]}>{projectDesc}</p>
            </Tooltip>

            <div className="w-100 d-flex justify-content-between light-text">
                <div className="d-flex align-items-center">
                    <div>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Document
                            </button>
                            <div
                                className={
                                    styles["dropdown-menu"] +
                                    " dropdown-menu px-3"
                                }
                                aria-labelledby="dropdownMenuButton"
                            >
                                {files.length
                                    ? files.map((file, index) => {
                                          let name = file.name;
                                          return (
                                              <>
                                                  {index > 0 ? (
                                                      <div className="dropdown-divider" />
                                                  ) : (
                                                      ""
                                                  )}
                                                  <div
                                                      key={index}
                                                      className={
                                                          styles["topic_file"]
                                                      }
                                                      onClick={() =>
                                                          downloadFile(
                                                              file.fileId
                                                          )
                                                      }
                                                  >
                                                      <div
                                                          className={
                                                              styles[
                                                                  "topic_file_icon"
                                                              ]
                                                          }
                                                      >
                                                          <FileIcon
                                                              extension={name
                                                                  .split(".")
                                                                  .pop()}
                                                          />
                                                      </div>
                                                      <p>{name}</p>
                                                  </div>
                                              </>
                                          );
                                      })
                                    : "Don't have any documents"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <AccessTimeOutlinedIcon className={styles["topic_icon"]} />
                    <span className={styles["topic_sub"] + " ml-2"}>
                        {DateConverter.parseShortDateTime(createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Topic;
