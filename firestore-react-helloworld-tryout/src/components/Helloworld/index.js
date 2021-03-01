import React from "react";

import db from "src/Firebase/db";
import db_config from "src/configs/db_config";

export default function Example() {
  let [debug, setDebug] = React.useState();
  const handleLoadListClick = () => {
    alert("start");
    db.collection("meny_manage_all_food_details")
      .doc(`large_menu_test`)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setDebug(doc.data());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        alert("done");
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
