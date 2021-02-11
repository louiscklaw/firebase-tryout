export default function DownloadFile({ spaceRef }) {
  const handleDownloadOnClick = () => {
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
