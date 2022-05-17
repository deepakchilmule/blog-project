import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../Components/Navbar'
import {auth} from '../firebase'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
const [user,setUser] = useState(null)


   useEffect(()=>{

     auth.onAuthStateChanged((user)=>{
       
         user ? setUser(user) : setUser(null)
     })

   }, [])


  return (
    <>
  <Head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  </Head>



  <Navbar data={user} />

  <Component {...pageProps} data={user} />
  </>
  )
}

export default MyApp
