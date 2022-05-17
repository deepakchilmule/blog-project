import { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onSubmitHandler(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({
        displayName: name,
      });
      alert("user created");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <div className="login">
        <h3> Please Sig Up !! </h3>
        <form>
          <input
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br></br>
          <br></br>

          <button onClick={onSubmitHandler}> Sign up </button>
          <br></br>
          <br></br>

          <Link href="/login">
            <a>Alredy have an account</a>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default signup;
