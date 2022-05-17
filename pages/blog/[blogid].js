import { db } from "../../firebase";
import Link from "next/link";

function blogid({ blog }) {
  console.log(blog);

  return (
    <div>
      <div className="blog">
        <div>
          <img src={blog.imageUrl}></img>
        </div>
        <div className="blog-body">
          <h3> {blog.title} </h3>
          <p> {blog.body} </p>
          <Link href="/">
            <a className="go-back"> Go Back</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default blogid;

export async function getServerSideProps({ params: { blogid } }) {
  const res = await db.collection("blogs").doc(blogid).get();
  console.log(res.data());

  return {
    props: {
      blog: {
        ...res.data(),
        createdAt: res.data().createdAt.toMillis(),
      },
    },
  };
}
