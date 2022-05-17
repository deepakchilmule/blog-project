import Link from "next/link";
import { auth } from "../firebase";
import { useRouter } from "next/router";

function Navbar({ data }) {
  const router = useRouter()
  return (
    <>
      <nav>
        <div className="nav-div">
          <Link href="/">
            <a className="brand-logo">Blog Post</a>
          </Link>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {data ? (
              <>
                <li>
                  <Link href="/createblog">
                    <a> Create Blog</a>
                  </Link>
                </li> 
                <button
                  className="btn red"
                  onClick={() => {
                    auth.signOut();
                     router.push('/login')
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signup">
                    <a> Sign up</a>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <a> Log in</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
