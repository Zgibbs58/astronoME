import React, { useEffect, useState } from "react";

const CloudinaryUploadWidget = ({ setImg }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cloudName = "djvsww0dv";
    const uploadPreset = "w6bzpfa4";

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setData(result.info);
          setImg(result.info.secure_url);
          document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );

    // removed this because caused an error when leaving blogpostform without submitting
    // Cleanup the event listener when the component unmounts
    // return () => {
    //   document.getElementById("upload_widget").removeEventListener("click", myWidget.open);
    // };
  }, [setImg]);

  return (
    <>
      {data ? (
        <img src={data.thumbnail_url} alt={data.original_filename} />
      ) : (
        <button type="button" id="upload_widget" className="cloudinary-button px-4 py-2 bg-div-gray hover:bg-hover-blue rounded">
          Upload Your Image
        </button>
      )}
    </>
  );
};

export default CloudinaryUploadWidget;
