import React from "react";

import db from "src/Firebase/db";
import db_config from "src/configs/db_config";

export default function Example() {
  let [debug, setDebug] = React.useState();
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
      <div>Example 12</div>
      <button onClick={handleLoadListClick}>load lists</button>
    </>
  );
}
