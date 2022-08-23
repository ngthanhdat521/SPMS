import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { red, indigo } from "@mui/material/colors";
import styles from "./Topic.module.scss";
import DateConverter from "../../../services/Converter/DateConverter";
import OptionalDialog from "../../../ui/DialogMessage/OptionalDialog/OptionalDialog.component";
import TopicForm from "../TopicForm/TopicForm.component";
import Tooltip from "@mui/material/Tooltip";
import FileIcon from "../../../ui/FileStorage/FileIcon/FileIcon.component";

function Topic({
    projectName,
    projectDesc,
    createdAt,
    files,
    onDelete,
    onEdit,
}) {
    return (
        <div className={styles["topic"]}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h3 className="mb-0">{projectName}</h3>
                </div>
                <div className="d-flex">
                    <TopicForm
                        text="Edit Topic"
                        projectName={projectName}
                        projectDesc={projectDesc}
                        files={files}
                        onSubmit={onEdit}
                    >
                        <BorderColorOutlinedIcon
                            htmlColor={indigo[500]}
                            className="cursor-pointer"
                        />
                    </TopicForm>
                    <OptionalDialog
                        title="Message"
                        content="Do you to delete this topic ?"
                        onAgree={onDelete}
                    >
                        <DeleteOutlineOutlinedIcon
                            htmlColor={red[500]}
                            className="ml-2 cursor-pointer"
                        />
                    </OptionalDialog>
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
