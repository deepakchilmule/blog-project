import { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { useRouter } from "next/router";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const router = useRouter();


 async function onSubmitHandler(e) {
    e.preventDefault();
    const result = await auth.signInWithEmailAndPassword(email,password)
    alert(`welcome ${result.user.displayName}`)
    router.push('/')
    console.log(email, password);
  }

  return (
    <div className="login">
      <h3> Please Login !! </h3>
      <form>
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

        <button onClick={onSubmitHandler}> Login </button>
        <br></br>
        <br></br>
        <Link href="/signup">
          <a>Don't have an account</a>
        </Link>
      </form>
    </div>
  );
}

export default login;
