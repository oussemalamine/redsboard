import React, { useMemo, useState, useEffect } from "react"
import { handleExport } from "./handleFile"
import * as XLSX from "xlsx"
import FileSaver from "file-saver"
import SearchBar from "../SearchBar"
import { FaSortUp, FaSortDown } from "react-icons/fa6"
import "./table.css"
import { FaXmark } from "react-icons/fa6"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { columnDef } from "./columns"
const FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
const FILE_EXTENTION = ".xlsx"
const BasicTable = () => {
  const [filtering, setFiltering] = useState("")
  const [data, setData] = useState([])
  const [rows, setRows] = useState(0)
  const [error, setError] = useState(false)
  const [jsx, setJsx] = useState(<div></div>)
  const [active, setActive] = useState(true)
  const handleFileUpload = (e) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parseData = XLSX.utils.sheet_to_json(sheet)
      setData(parseData)
      setRows(parseData.length)
      console.log(Object.keys(parseData[0]))
    }
  }
  useEffect(() => {
    if (error)
      setJsx(
        <div className="database-error-message">
          <p>Alert! there is an error</p>
        </div>
      )
    else if (rows !== 0)
      setJsx(
        <div
          className={
            active
              ? "database-success-message"
              : "database-success-message hide"
          }
        >
          <p>You found {rows} results</p>
          <FaXmark
            className="message-icon"
            onClick={() => setActive(!active)}
          />
        </div>
      )
  }, [data, active])
  const [sorting, setSorting] = useState([])
  const finalColumn = useMemo(() => columnDef, [])
  const finalData = useMemo(() => data, [data])
  const tableInstance = useReactTable({
    columns: finalColumn,
    data: finalData,
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
  })
  //console.log(tableInstance.getHeaderGroups())
  return (
    <>
      <div className="database-upsection">
        {jsx}
        <div className="btn-group">
          <SearchBar filtering={filtering} setFiltering={setFiltering} />
          <label className="database-btn">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload(e)}
              className="database-input"
            />
            Import
          </label>
          <button
            className="database-btn"
            onClick={() =>
              handleExport(data, "data", FILE_TYPE, FILE_EXTENTION)
            }
          >
            Export All
          </button>
        </div>
      </div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
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
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
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
            tableInstance.getCanNextPage() ? tableInstance.nextPage() : false
          }}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default BasicTable
