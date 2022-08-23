import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Button from "@mui/material/Button";
import OptionalDialog from "../../DialogMessage/OptionalDialog/OptionalDialog.component";
import CsvDownloader from "react-csv-downloader";

function HeaderTable({ onAdd, onDelete, data = [] }) {
    
    return (
        <div className="py-2 d-flex">
            <Button className="d-flex align-items-center" onClick={onAdd}>
                <div className="d-flex align-items-center">
                    <AddOutlinedIcon />
                    <span className="ml-2 pt-1">Add Record </span>
                </div>
            </Button>
            <OptionalDialog
                title="Message"
                content="Do you want to delete all records?"
                onAgree={onDelete}
            >
                <Button className="d-flex align-items-center ml-3">
                    <div className="d-flex align-items-center">
                        <DeleteOutlineOutlinedIcon />
                        <span className="ml-2 pt-1">Delete Records </span>
                    </div>
                </Button>
            </OptionalDialog>
            {!data.length || (
                <CsvDownloader filename="list-lecturer" extension=".csv" datas={data}>
                    <Button className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <FileDownloadOutlinedIcon />
                            <span className="ml-2 pt-1">Export Record</span>
                        </div>
                    </Button>
                </CsvDownloader>
            )}
            ;
        </div>
    );
}

export default HeaderTable;
