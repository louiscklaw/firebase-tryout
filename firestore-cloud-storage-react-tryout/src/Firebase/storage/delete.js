export default function DeleteFile({ spaceRef }) {
  const handleDeleteFileOnClick = () => {
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
