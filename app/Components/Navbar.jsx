// 'use client'
// import { useSelector, useDispatch } from 'react-redux';
// import { setUser } from '../Redux/authSlice';

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { firestore } from "../../firebase";
// // import { auth } from "../../firebase";
// import { getAuth } from 'firebase/auth';
// import { signOut } from "firebase/auth";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// // import { useNavigate } from "react-router-dom";
// // import Link from "next/link";
// export default function Navbar() {
//   // const navigate = useNavigate();
// const router = useRouter();
//   // const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged((user) => {
//   //     if (user) {
//   //       setUser(user);
//   //     } else {
//   //       setUser(null);
//   //     }
//   //   });
//   //   return () => {
//   //     unsubscribe();
//   //   };
//   // }, []);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const auth = getAuth(); // Move getAuth() inside useEffect
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       dispatch(setUser(user));
      
//     });

//     return () => unsubscribe();
//   }, [dispatch, router]);
//   const handleSignout = () => {
//     const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         toast("SignOut Successfully", {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//         router.push("/login");
//       })
//       .catch((error) => {
//         toast(error, {
//           position: "top-right",
//           autoClose: 2500,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       })
//       .finally(() => {
//         dispatch(setUser(null));
//       });
//   };
//   return (
//     <>
//     <div style={{backgroundColor: '#F8F9FA'}}>
//       <nav className="navbar navbar-expand-lg bg-body-dark py-4">
//         <div className="container">
//           <Link className="navbar-brand" href="/">
//             Blog Post
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
//             <div className="d-flex">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item mx-2">
//                   <Link className="nav-link active" href="/login">
//                     Our Story
//                   </Link>
//                 </li>
//                 <li className="nav-item mx-2">
//                   <Link className="nav-link active" href="/signup">
//                     Membership
//                   </Link>
//                 </li>
//                 <li className="nav-item mx-2">
//                   <Link className="nav-link active" href="/adminLogin">
//                     Write
//                   </Link>
//                 </li>
//                 {!user ? (
//                 <li className="nav-item mx-2">
//                   <Link className="nav-link active" href="/login">
//                     Sign In
//                   </Link>
//                 </li>
//                 ) : (
//                   ""
//                 )}
//                 <li className="nav-item mx-2">
//                   <Link
//                     href="/login"
//                     className="nav-link active btn btn-info px-3 rounded-pill"
//                   >
//                     Get Started
//                   </Link>
//                 </li>
//                 {user ? (
//                   <li className="nav-item ms-2">
//                     <Link
//                       onClick={handleSignout}
//                       href="/login"
//                       className="nav-link active btn btn-danger text-white px-3 rounded-pill"
//                     >
//                       Sign Out
//                     </Link>
//                   </li>
//                 ) : (
//                   ""
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//     <hr className="mt-0 pt-0" />
//     </>
//   );
// }


import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import { firestore } from "../../firebase";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast('SignOut Successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        router.push('/login');
      })
      .catch((error) => {
        toast(error, {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .finally(() => {
        dispatch(setUser(null));
      });
  };

  return (
    <>
      <div style={{ backgroundColor: '#F8F9FA' }}>
        <nav className="navbar navbar-expand-lg bg-body-dark py-4">
          <div className="container">
            <Link href="/" className="navbar-brand">
              Blog Post
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <div className="d-flex">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item mx-2">
                    <Link href="/login" className="nav-link active">
                      Our Story
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link href="/signup" className="nav-link active">
                      Membership
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link href="/adminLogin" className="nav-link active">
                      Write
                    </Link>
                  </li>
                  {!user.uid ? (
                    <li className="nav-item mx-2">
                      <Link href="/login" className="nav-link active">
                        Sign In
                      </Link>
                    </li>
                  ) : ("")}
                    
                      <li className="nav-item mx-2">
                        <Link
                          href="/login"
                          className="nav-link active btn btn-info px-3 rounded-pill"
                        >
                          Get Started
                        </Link>
                      </li>
                     {user.uid ? <li className="nav-item ms-2">
                        <Link
                          onClick={handleSignout}
                          href="/login"
                          className="nav-link active btn btn-danger text-white px-3 rounded-pill"
                        >
                          Sign Out
                        </Link>
                      </li>: ""}
                    
                  
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <hr className="mt-0 pt-0" />
    </>
  );
}
