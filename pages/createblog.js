import { useState, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { db, serverTimestamp, storage } from "../firebase";
import { useRouter } from "next/dist/client/router";

function createblog({ data }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [url, setUrl] = useState(null);
  const [newBlog, setNewBlog] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (url) {
      try {
        db.collection("blogs").add({
          title,
          body,
          imageUrl: url,
          postedBy: data.uid,
          createdAt: serverTimestamp(),
        });
        alert("blog posted", title);
        setNewBlog(true);
        //router.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  }, [url]);

  function submitHandler() {
    if (!image || !title || !body) {
      alert("please fill the inputs");
      return;
    }

    var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (progress == "100") {
          alert("image uploaded");
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          console.log("download url save", downloadURL);
        });
      }
    );
  }
  return (
    <div className="login">
      <h3> Create a Blog </h3>

      <input
        type="text"
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br></br>
      <br></br>
      <textarea
        type="text"
        placeholder="body"
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <br></br>
      <br></br>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      <br></br>
      <br></br>
      <button onClick={submitHandler}> Submit Post </button>
      {newBlog && (
        <div>
          <h3> New Blog created!! </h3>

          <Link href="/">
            <a className="go-back"> Go Back to Home</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default createblog;
