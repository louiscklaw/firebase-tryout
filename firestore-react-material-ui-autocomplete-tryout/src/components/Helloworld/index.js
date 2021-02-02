import React from "react";

import db from "src/Firebase/db";
import db_config from "src/configs/db_config";

import Button from "@material-ui/core/Button";

export default function Example() {
  let [debug, setDebug] = React.useState();
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
  return (
    <>
      <pre>{JSON.stringify(debug, null, 2)}</pre>
      <h3>hello material ui</h3>
      <Button variant="contained" color="primary" onClick={handleLoadListClick}>
        Hello World
      </Button>

      <Button onClick={handleClearListClick}>clear result</Button>
      <div>hello firebase</div>
      <button onClick={handleLoadListClick}>load lists</button>
    </>
  );
}
