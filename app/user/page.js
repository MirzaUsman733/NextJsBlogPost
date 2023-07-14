'use client'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { firestore } from "../../firebase";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import UserItem from "../Components/UserItem";
import SecondItem from "../Components/SecondItem";
// import Spinner from "./Spinner";
import { getAuth } from "firebase/auth";
export default function User() 
{
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) =>
    {
      dispatch(setUser(user));
      if (!user)
      {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  // if (!user) {
  //   return null; // or show a loading state
  // }

  // The rest of your component code...

  const { data: blogPosts } = useQuery("blogPosts", fetchBlogPosts);

  async function fetchBlogPosts()
  {
    const querySnapshot = await getDocs(collection(firestore, "bloging"));
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  }

  if (!user)
  {
    dispatch(setUser(null))
    router.push('/user')
  } else if (blogPosts)
  {
    return (
      <div className="container-fluid m-0 pb-0 px-0">
        <h1 className="text-center my-4">Blog Posts Website</h1>
        <div className="container">
          <h1
            className="border-bottom border-start rounded"
            style={{ marginTop: 100 }}
          >
            <span className="bg-primary text-white rounded px-4">
              Blogs About Life
            </span>
          </h1>
          <div className="row">
            <div className="ms-0 ps-0 col-12 col-md-8">
              <UserItem posts={blogPosts} user={user} />
            </div>
            <div className="col-12 col-md-4 d-none d-md-block">
              <SecondItem posts={blogPosts} />
            </div>
          </div>
        </div>
      </div>
    );
  } else 
  {
    return null;
  }
}
