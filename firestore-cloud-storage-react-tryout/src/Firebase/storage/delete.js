import firebase from "firebase/app";
import "firebase/storage";
var storage = firebase.storage();
var storageRef = storage.ref();

export default function DeleteFile() {
  const handleDeleteFileOnClick = () => {
    var spaceRef = storageRef.child("images/space.jpg");
    spaceRef
      .delete()
      .then(() => {
        console.log("file deleted");
      })
      .catch((err) => {
        console.log("err found", err);
      });
  };
  return (
    <>
      <button onClick={handleDeleteFileOnClick}>Delete file</button>
    </>
  );
}
