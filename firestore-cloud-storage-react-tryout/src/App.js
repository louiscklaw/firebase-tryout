import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Helloworld from "src/components/Helloworld";

import DeleteFile from "src/Firebase/storage/delete";
import DownloadFile from "src/Firebase/storage/download";
import UploadFile from "src/Firebase/storage/upload";
import ListFile from "src/Firebase/storage/list";

import firebase from "firebase/app";
import "firebase/storage";

function App() {
  return (
    <div className="App">
      <div>helloworld</div>
      <Helloworld />

      <div>
        <h3>upload file</h3>
        <div>
          <UploadFile />
        </div>
      </div>
      <div>
        <h3>download file</h3>
        <DownloadFile />
      </div>
      <div>
        <h3>delete file</h3>
        <DeleteFile />
      </div>

      <div>
        <h3>list file</h3>
        <ListFile />
      </div>
    </div>
  );
}

export default App;
