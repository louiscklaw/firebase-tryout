import React from "react";
import firebase from "firebase/app";
import "firebase/storage";

var storage = firebase.storage();
var storageRef = storage.ref();

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    // alert(`Selected file - ${this.fileInput.current.files[0].name}`);
    var spaceRef = storageRef.child("images/space.jpg");
    spaceRef
      .put(this.fileInput.current.files[0])
      .then((snapshot) => {
        console.log("snapshot", snapshot);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
