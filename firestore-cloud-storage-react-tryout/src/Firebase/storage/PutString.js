import React from "react";

export default function PutString({ spaceRef }) {
  const fileInput = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Selected file - ${this.fileInput.current.files[0].name}`);

    let selectedFile = fileInput.current.files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
      let file_as_string = "";
      file_as_string = e.target.result;

      spaceRef
        .putString(file_as_string, "data_url")
        .then((snapshot) => {
          console.log("snapshot", snapshot);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
