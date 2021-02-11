import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Helloworld from "src/components/Helloworld";

import firebase from "firebase/app";
import "firebase/storage";

import DeleteFile from "src/Firebase/storage/delete";
import DownloadFile from "src/Firebase/storage/download";
import UploadFile from "src/Firebase/storage/upload";
import PutString from "src/Firebase/storage/PutString";
import ListFile from "src/Firebase/storage/list";

var storage = firebase.storage();
var storageRef = storage.ref();

function App() {
  var spaceRef = storageRef.child("images/test_ref/space.jpg");

  return (
    <div className="App">
      <div>helloworld</div>
      <Helloworld spaceRef={spaceRef} />

      <div>
        <h3>upload file - put</h3>
        <div>
          <UploadFile spaceRef={spaceRef} />
        </div>
      </div>

      <div>
        <h3>upload file - putString</h3>
        <div>
          <PutString spaceRef={spaceRef} />
        </div>
      </div>

      <div>
        <h3>download file</h3>
        <DownloadFile spaceRef={spaceRef} />
      </div>
      <div>
        <h3>delete file</h3>
        <DeleteFile spaceRef={spaceRef} />
      </div>

      <div>
        <h3>list file</h3>
        <ListFile />
      </div>
    </div>
  );
}

export default App;
