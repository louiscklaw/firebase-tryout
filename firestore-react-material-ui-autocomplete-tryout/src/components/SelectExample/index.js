import React from "react";

import db from "src/Firebase/db";
import db_config from "src/configs/db_config";

import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

import { test_data } from "./test_data";
const TABLE_USERS_REF = db.collection(db_config.DB_TABLE_USERS);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function SelectExample() {
  let [debug, setDebug] = React.useState();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClearListClick = () => {
    setDebug(null);
  };

  const handleLoadListClick = () => {
    db.collection(db_config.DB_TABLE_USERS)
      .doc(`0xNnfLmW1GVRc430hJrR`)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setDebug(doc.data());
      });
  };

  const handleSaveClick = () => {
    TABLE_USERS_REF.doc(`0xNnfLmW1GVRc430hJrR`)
      .set({ test_value: age }, { merge: true })
      .then((doc_ref) => {
        setDebug(doc_ref, null, 2);
      });
  };
  const handleClearClick = () => {
    setAge("");
  };

  return (
    <>
      <pre>{JSON.stringify(debug, null, 2)}</pre>
      <h3>hello SelectExample</h3>
      <Button onClick={handleSaveClick}>Save</Button>
      <Button>Load</Button>
      <Button onClick={handleClearClick}>Clear</Button>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={age}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <button onClick={handleLoadListClick}>load lists</button>
    </>
  );
}
