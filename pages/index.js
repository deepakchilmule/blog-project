import Head from "next/head";
import Image from "next/image";
import { db } from "../firebase";
import Link from "next/link";

// import styles from "../styles/Home.module.css";
//import { GetServerSideProps } from 'next'


export async function getServerSideProps(context) {
  const querySnap = await db.collection("blogs").orderBy('createdAt', 'desc').get();
  const allBlogs = querySnap.docs.map((doc) => {
    return {
      ...doc.data(),
      createdAt: doc.data().createdAt.toMillis(),
      id: doc.id,
    };
  });
  console.log(allBlogs);

  return {
    props: {
      allBlogs,
    },
  };
}

export default function Home({ allBlogs }) {
  console.log(allBlogs);

  return (
    <div>
      {allBlogs.map((blog) => (
        <div className="blog-div" key={blog.createdAt}>
          <img src={blog.imageUrl}></img>
          <h3> {blog.title} </h3>
          <p> {blog.body} </p>
          <div className="read-more">
            <Link href={`blog/${blog.id}`}>
              <a className="read-more"> Read More</a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
