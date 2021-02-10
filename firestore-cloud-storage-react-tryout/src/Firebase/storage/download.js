import firebase from "firebase/app";
import "firebase/storage";

var storage = firebase.storage();
var storageRef = storage.ref();

export default function DownloadFile() {
  const handleDownloadOnClick = () => {
    var spaceRef = storageRef.child("images/space.jpg");
    spaceRef
      .getDownloadURL()
      .then((url) => {
        alert(url);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <button onClick={handleDownloadOnClick}>Download</button>
    </>
  );
}
