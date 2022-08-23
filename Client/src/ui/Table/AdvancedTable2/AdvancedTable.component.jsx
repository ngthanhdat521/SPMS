import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import styles from "./AdvancedTable.module.scss";
import { useDispatch, useSelector } from "react-redux";

export default function AdvancedTable({
    title,
    data,
    cellType,
    children,
    onOpen
}) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(9);
    let isTopicFormSubmitted = useSelector(s => s.isTopicFormSubmitted);
    let dispatch = useDispatch();

    const rows = data;

    const headCells = cellType;

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function EnhancedTableHead(props) {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        {/* <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        /> */}
                    </TableCell>
                    {headCells.map((headCell, headCellIndex) => (
                        <TableCell
                            key={headCell.id}
                            // align={headCell.numeric ? "right" : "left"}
                            align={"left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(["asc", "desc"]).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const EnhancedTableToolbar = (props) => {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    // ...(numSelected > 0 && {
                    //     bgcolor: (theme) =>
                    //         alpha(
                    //             theme.palette.primary.main,
                    //             theme.palette.action.activatedOpacity
                    //         ),
                    // }),
                }}
            >
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
                {/* {numSelected > 0 ? (
                    ""
                    // <Typography
                    //     sx={{ flex: "1 1 100%" }}
                    //     color="inherit"
                    //     variant="subtitle1"
                    //     component="div"
                    // >
                    //     {numSelected} selected
                    // </Typography>
                ) : (
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                )} */}

                {/* {numSelected > 0 ? (
                    ""
                    // <Tooltip title="Delete">
                    //     <IconButton onClick={onDelete}>
                    //         <DeleteIcon />
                    //     </IconButton>
                    // </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )} */}
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box
            className={styles["advanced-table"]}
            sx={{ width: "100%", height: "100%", borderTop: "1px solid #e0e0e0" }}
        >
            <Paper sx={{ width: "100%", height: "100%", background: "#f1f5f9", boxShadow: "none" }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody
                            sx={{ background: "white", maxHeight: "100%", overflowY: "auto" }}
                        >
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row[headCells[0].id]);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row[headCells[0].id])}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row[headCells[0].id]}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    {/* <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    /> */}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row[headCells[0].id]}
                                                </TableCell>
                                                {headCells.map((headCell, headCellIndex) => {
                                                    if (
                                                        headCellIndex > 0 &&
                                                        headCellIndex < headCells.length - 1
                                                    )
                                                        return (
                                                            <TableCell key={headCellIndex} align="left">
                                                                {row[headCell.id]}
                                                            </TableCell>
                                                        );
                                                    else return "";
                                                })}
                                                <TableCell align="left">
                                                    <Button onClick={() => {
                                                        dispatch({ type: "RESET_STATUS_TOPIC_FORM" });
                                                        onOpen(row[headCells[0].id],index);
                                                    }}>
                                                        <KeyboardArrowDownOutlinedIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            {isItemSelected || isTopicFormSubmitted && index === 0 ? (
                                                <TableRow style={{ boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.1)" }}>
                                                    <TableCell colspan={headCells.length + 1}>
                                                        <div className="d-flex justify-content-center">
                                                            <div className="w-75">{children}</div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    );
                                })}

                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 9, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
