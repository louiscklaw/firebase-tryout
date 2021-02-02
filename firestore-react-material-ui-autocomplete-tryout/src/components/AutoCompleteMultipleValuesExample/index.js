import React from "react";

import db from "src/Firebase/db";
import db_config from "src/configs/db_config";

import { top100Films } from "./top100Films";
import Button from "@material-ui/core/Button";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const TABLE_USERS_REF = db.collection(db_config.DB_TABLE_USERS);

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function AutoCompleteMultipleValuesExample() {
  const classes = useStyles();

  let [debug, setDebug] = React.useState();
  let [test_value, setTestValue] = React.useState();

  const handleSaveClick = () => {
    TABLE_USERS_REF.doc(`0xNnfLmW1GVRc430hJrR`)
      .set({ test_value: test_value }, { merge: true })
      .then((doc_ref) => {
        setDebug(doc_ref, null, 2);
      });
  };

  const handleClearClick = () => {
    setTestValue([{ title: "The Kid", year: 1921 }]);
  };

  return (
    <>
      <pre>{JSON.stringify(debug, null, 2)}</pre>
      <h3>hello AutoCompleteMultipleValuesExample</h3>
      <div style={{ display: "flex", flexFlow: "row" }}>
        <Button onClick={handleSaveClick}>Save</Button>
        <Button>Load</Button>
        <Button onClick={handleClearClick}>Clear</Button>
      </div>
      <div className={classes.root}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          // defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
          value={test_value}
          onChange={(e, new_value) => {
            setTestValue(new_value);
          }}
        />
      </div>
    </>
  );
}
