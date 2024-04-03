import React, { useMemo, useState, useEffect } from "react";
import { handleExport } from "./handleFile";
import * as XLSX from "xlsx";
import SearchBar from "../SearchBar";
import { FaSortUp, FaSortDown } from "react-icons/fa6";
import "./table.css";
import { FaXmark } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Review from "./Review";
import FileNamePopUp from "./FileNamePopUp";
const FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const FILE_EXTENTION = ".xlsx";
const BasicTable = ({ setPrograms, program, programs }) => {
  const [filtering, setFiltering] = useState("");
  const [rows, setRows] = useState(0);
  const [error, setError] = useState(false);
  const [jsx, setJsx] = useState(<div></div>);
  const [active, setActive] = useState(true);
  const [filename, setFilename] = useState("");
  const [editid, setEditId] = useState(-1);
  const [editedData, setEditedData] = useState({});
  const [checked, setChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [showFileNameInput, setShowFileNameInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState();
  console.log("EditId :", editid);
  console.log(checked);
  console.log(checkedRows);
  
  const initialColumns = [
    { id: "checkbox", accessorKey: "checkbox", header: "checkbox" },
  ];
  if (program.data.length > 0) {
    const dynamicColumns = Object.keys(program.data[0]).map((column) => ({
      id: column,
      accessorKey: column,
      header: column,
    }));
    initialColumns.push(...dynamicColumns);
  }
  // console.log("data", program.data);
  console.log();
  const handleFileUpload = (e) => {
    console.log("upload function triggered");
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parseData = XLSX.utils.sheet_to_json(sheet);
      compareData(parseData);
    };
  };
 /* const handleAllCheck = () => {
    setSelectAllChecked(!selectAllChecked);
    setChecked(program.map((row) => row.id));
    setCheckedRows(program.map((row) => row.id));
  };
  const handleCheck = (id) => {
    if (checked.includes(id)) {
      const newChecked = checked.filter((item) => item !== id);
      setChecked(newChecked);
    } else {
      setChecked((prevState) => [...prevState, id]);
    }
  };
  const handleCheckRows = (id) => {
    setCheckedRows((prevState) => [...prevState, id]);
  };*/
 
  const handleCheckAll = () => {
    if(checked)
    setCheckedRows(program.data.map((row) => row.id));
    else if(!checked && checkedRows.length == program.data.length)
    setCheckedRows([]);
  }
  useEffect(() => {
    handleCheckAll();
  },[checked])
  const handleCheck = (id) => {
    setChecked(false)
    if (checkedRows.includes(id)) {
      const newChecked = checkedRows.filter((item) => item !== id);
      setCheckedRows(newChecked);
    } else {
      setCheckedRows((prevState) => [...prevState, id]);
    }
  };
  function compareData(newData) {
    console.log("Program before update:", program);
    console.log("New data:", newData);
    const oldEmails = program.data.map((row) => row.email);
    const newElements = newData.filter((row) => !Exist(row.email, oldEmails));
    setRows(newElements.length);
    console.log("New elements:", newElements);
    const updatedPrograms = programs.map((element) =>
      element === program
        ? { ...element, data: [...element.data, ...newElements] }
        : element
    );
    console.log("Updated programs:", updatedPrograms);
    setPrograms(updatedPrograms);
  }
  function Exist(s, t) {
    let test = false;
    t.forEach((e) => {
      if (e === s) {
        test = true;
      }
    });
    return test;
  }

  const [sorting, setSorting] = useState([]);
  const tableInstance = useReactTable({
    columns: initialColumns,
    data: program.data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  const handleDeleteRow = (rowIndex) => {
    const updatedData = [...program.data];
    console.log(updatedData);
    const deletedRow = updatedData.splice(rowIndex, 1)[0];
    setPrograms(
      programs.map((p) => (p === program ? { ...p, data: updatedData } : p))
    );
    // Update localStorage here to reflect the deletion
  };
  const handleExportWithFileName = () => {
    setShowFileNameInput(true);
  };
  const handleSubmitFileName = (newFilename) => {
    setFilename(newFilename);
    setShowFileNameInput(false);
    if (checkedRows.length > 0) {
      handleExport(checkedRows.map((id) => program.data.find((row) => row.id === id)), newFilename, FILE_TYPE, FILE_EXTENTION);
      setCheckedRows([]);
      setChecked(false);
    } 
  };
  const handleEditRow = (rowId) => {
    setEditId(rowId);
    const rowData = program.data.find((row) => row.id === rowId);
    setEditedData(rowData);
  };

  const handleUpdateRow = () => {
    setPrograms(
      programs.map((p) =>
        p === program
          ? {
              ...p,
              data: p.data.map((data) =>
                data.id === editedData.id ? editedData : data
              ),
            }
          : p
      )
    );
    setEditId(-1);
    setEditedData({});
  };
  useEffect(() => {
    if (showFileNameInput) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
    return () => {
      document.body.classList.remove("active");
    };
  }, [showFileNameInput]);
  return (
    <>
      {showFileNameInput && (
        <FileNamePopUp
          setShowFileNameInput={setShowFileNameInput}
          handleSubmitFileName={handleSubmitFileName}
        />
      )}
      {showModal && (
        <div className="modal-backdrop">
          <Review
            setShowModal={setShowModal}
            showModal={showModal}
            data={program.data[reviewData]}
          />
        </div>
      )}
      <div className="database-upsection">
        <div
          className={
            active
              ? "database-success-message"
              : "database-success-message hide"
          }
        >
          <p>You found {program.data.length} results</p>

          <FaXmark
            className="message-icon"
            onClick={() => setActive(!active)}
          />
        </div>

        {checkedRows.length > 0 ? (
          <div className="database-success-message">
            <p>
              {checkedRows.length} rows
              selected
            </p>
          </div>
        ) : null}

        <div className="btn-group">
          <SearchBar filtering={filtering} setFiltering={setFiltering} />
          <label className="database-btn">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => {
                handleFileUpload(e);
                e.target.value = null; // Reset the input value after selection
              }}
              className="database-input"
            />
            Import
          </label>
          <button className="database-btn" onClick={handleExportWithFileName}>
            Export All
          </button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            {tableInstance.getHeaderGroups().map((headerEl) => {
              return (
                <tr key={headerEl.id}>
                  {headerEl.headers.map((columnEl) => {
                    if (columnEl.id === "checkbox") {
                      return (
                        <th key={columnEl.id}>
                          <input
                            className="checkbox-header"
                            type="checkbox"
                            name=""
                            id=""
                            checked={checked}
                            onChange={() => {
                             setChecked((checked)=>!checked);
                            }}
                          />
                        </th>
                      );
                    }
                    return (
                      <th
                        key={columnEl.id}
                        colSpan={columnEl.colSpan}
                        onClick={columnEl.column.getToggleSortingHandler()}
                      >
                        <div className="table-sort">
                          {flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}

                          {
                            {
                              asc: <FaSortUp className="sorting-icon" />,
                              desc: <FaSortDown className="sorting-icon" />,
                            }[columnEl.column.getIsSorted() ?? null]
                          }
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {tableInstance.getRowModel()?.rows?.map((rowEl, rowIndex) => {
              const isEditing = editid === rowEl.original.id;
              return (
                <tr key={rowEl.id}>
                  {rowEl.getVisibleCells().map((cellEl, indexEl) => {
                    if (indexEl === 0)
                      return (
                        <td key={cellEl.id}>
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            checked={
                              checkedRows.includes(cellEl.row.original.id)
                            }
                            onChange={() => {
                              
                              handleCheck(cellEl.row.original.id);
                            }}
                          />
                        </td>
                      );
                    return (
                      <td key={cellEl.id}>
                        {isEditing ? (
                          <input
                            type="text"
                            className="edit-input"
                            value={editedData[cellEl.column.id] || ""}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                [cellEl.column.id]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          flexRender(
                            cellEl.column.columnDef.cell,
                            cellEl.getContext()
                          )
                        )}
                      </td>
                    );
                  })}
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteRow(rowIndex)}
                    >
                      <FaRegTrashAlt style={{ color: "red" }} />
                    </button>
                  </td>
                  <td>
                    {isEditing ? (
                      <button
                        className="update-btn tab-btn"
                        onClick={handleUpdateRow}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className="update-btn tab-btn"
                        onClick={() => handleEditRow(rowEl.original.id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    {isEditing ? null : (
                      <button
                        onClick={() => {
                          setShowModal(!showModal);
                          setReviewData(rowEl.original.id);
                        }}
                        className="review-btn tab-btn"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-btn-group">
        <button
          className="table-btn"
          onClick={() => tableInstance.previousPage()}
        >
          Previous
        </button>
        <button
          className="table-btn"
          onClick={() => tableInstance.setPageIndex(0)}
        >
          1
        </button>
        <button
          className="table-btn"
          onClick={() => tableInstance.setPageIndex(1)}
        >
          2
        </button>
        <button
          className="table-btn"
          onClick={() => tableInstance.setPageIndex(2)}
        >
          3
        </button>
        <button className="table-btn" onClick={() => tableInstance.lastPage()}>
          Last
        </button>
        <button
          className="table-btn"
          onClick={() => {
            tableInstance.getCanNextPage() ? tableInstance.nextPage() : false;
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BasicTable;
