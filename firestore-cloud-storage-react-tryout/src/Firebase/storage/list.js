import firebase from "firebase/app";
import "firebase/storage";

var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child("images");

export default function ListFile() {
  const handleListFileOnClick = () => {
    var listRef = imagesRef;
    listRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log("itemRef", itemRef);
          console.log("fullpath", itemRef.fullPath);
        });
      })
      .catch((err) => {
        console.log("err found", err);
      });
  };
  return (
    <>
      <button onClick={handleListFileOnClick}>List file</button>
    </>
  );
}
