import React, { useEffect, useState } from "react"
import BasicTable from "../databaseTable/BasicTable"
import {
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material"
import "./Database.css"
import { useLocalStorage } from "../useLocalStorage"
const PROGRAMS_KEY = "__0prgramsKey"
function Database() {
  const [programs, setPrograms] = useLocalStorage(PROGRAMS_KEY, [])
  const [select, setSelect] = useState("select a program")
  const [inputProgram, setInputProgram] = useState("")
  const [error, setError] = useState(false)

  function addProgram(name) {
    setError(false)
    if (name.trim() === "") return
    if (exist(name)) {
      setError(true)
      return
    }
    const newPrograms = [...programs, { name }]
    setPrograms(newPrograms)
    localStorage.setItem(name, JSON.stringify([]))
    setInputProgram("")
  }
  function exist(name) {
    let test = false
    programs.forEach((program) => {
      if (program.name === name) test = true
    })
    return test
  }
  return (
    <div className="database-container">
      <div className="program-select">
        <Tooltip
          open={error}
          title={error ? "Program Exist" : false}
          arrow
          placement="top"
        >
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a Program
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={select}
                label="Select a Program"
                onChange={(e) => setSelect(e.target.value)}
              >
                {programs.map((program, index) => {
                  return (
                    <MenuItem key={index} value={program.name}>
                      {program.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </Tooltip>
        <input
          type="text"
          value={inputProgram}
          onChange={(e) => {
            setInputProgram(e.target.value)
            exist(e.target.value) ? setError(true) : setError(false)
          }}
          placeholder="Add a program"
        />
        <button className="btn" onClick={() => addProgram(inputProgram)}>
          Add Program
        </button>
      </div>
      {select === "select a program" ? (
        <div></div>
      ) : (
        <BasicTable programName={select} />
      )}
    </div>
  )
}

export default Database
