'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../Redux/authSlice';
import { getAuth } from 'firebase/auth';
import Input from '../Components/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setUser(user));
      if (user) {
        router.push('/user');
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const handleForgotPassword = () => {
    if (!values.email) {
      toast('Please enter your email', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    setButtonDisable(true);

    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        setButtonDisable(false);
        toast('Password reset email sent. Please check your inbox.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch((error) => {
        setButtonDisable(false);
        toast(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });
  };
  const submitHandler = () => {
    if (!values.email || !values.password) {
      toast('Please fill all the input field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    setButtonDisable(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        setButtonDisable(false);
        toast('You Are Successfully Login as a User', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        router.push('/user');
      })
      .catch((err) => {
        setButtonDisable(false);
        toast(err, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });
  };
  if (!user) {
    dispatch(setUser(null));
    router.push('/user');
  }
  return (
    <div
      id="center"
      className="center text-center text-dark my-5"
      style={{ backgroundColor: 'White' }}
    >
      <div id="sme">
        <header id="header">
          <h1 className="text-center text-uppercase mt-5">User login</h1>
          <Input
            type="email"
            className="my-4"
            name="Email"
            placeholder="Email"
            id="email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <Input
            type="password"
            className="input"
            placeholder="Password"
            id="password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, password: event.target.value }))
            }
          />
          <p
            className="text-end forget"
            style={{ cursor: 'pointer' }}
            onClick={handleForgotPassword}
          >
            Forget Password
          </p>
          <button
            className="btnLg btn btn-primary fs-5 mb-5"
            onClick={submitHandler}
            disabled={buttonDisable}
          >
            Login
          </button>
          <p>
            Create the account?{' '}
            <span>
              <Link href="/signup">Signup</Link>
            </span>
          </p>
        </header>
      </div>
    </div>
  );
}
