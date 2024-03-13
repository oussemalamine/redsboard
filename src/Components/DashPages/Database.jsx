import BasicTable from "../databaseTable/BasicTable"
import * as XLSX from "xlsx"
import React, { useEffect, useState } from "react"
import "./Database.css"
import FileSaver from "file-saver"
import SearchBar from "../SearchBar.jsx"
const FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
const FILE_EXTENTION = ".xlsx"
function Database() {
  const [filtering, setFiltering] = useState("")
  const [data, setData] = useState([])
  const [rows, setRows] = useState(0)
  const [error, setError] = useState(false)
  const [jsx, setJsx] = useState(<div></div>)
  const [sheet, setSheet] = useState()
  useEffect(() => {
    if (error)
      setJsx(
        <div className="database-error-message">
          <p>Alert! there is an error</p>
        </div>
      )
    else if (rows !== 0)
      setJsx(
        <div className="database-success-message">
          <p>You found {rows} results</p>
        </div>
      )
  }, [data])
  const handleFileUpload = (e) => {
    setRows(0)
    setJsx(<div></div>)
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      setSheet(workbook)
      const parseData = XLSX.utils.sheet_to_json(sheet)
      setData(parseData)
      setRows(() => parseData.length)
    }
  }
  const handleExport = async () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const dataBlob = new Blob([excelBuffer], { type: FILE_TYPE })
    FileSaver.saveAs(dataBlob, "example" + FILE_EXTENTION)
  }
  return (
    <div className="database-container">
      <div className="database-upsection">
        {jsx}
        <SearchBar filtering={filtering} setFiltering={setFiltering} />
        <div className="btn-group">
          <label className="database-btn">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="database-input"
            />
            Import
          </label>
          <button className="database-btn" onClick={handleExport}>
            Export All
          </button>
        </div>
      </div>
      <BasicTable
        dataJson={data}
        filtering={filtering}
        setFiltering={setFiltering}
      />
    </div>
  )
}

export default Database
