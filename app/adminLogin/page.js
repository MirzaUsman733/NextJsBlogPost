'use client';
import React, { useState } from 'react';
import Input from '../Components/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminLogin() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const submitHandler = () => {
    if (!values.email || !values.password) {
      toast('Please fill all input fiels', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    } else {
      if (
        values.email === 'mirzausman9006@gmail.com' &&
        values.password === 'mirza786'
      ) {
        router.push('/admin');
      } else {
        toast('Your email or password is incorrect', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }
  };
  return (
    <div
      id="center"
      className="center text-dark text-center my-5"
      style={{ backgroundColor: 'white' }}
    >
      <div id="sme">
        <header id="header">
          <h1 className="text-center text-uppercase mt-5">Admin login</h1>
          <Input
            type="email"
            className="my-4"
            name=""
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
          <p className="text-end forget" style={{ cursor: 'pointer' }}>
            Forget Password
          </p>
          <button
            className="btnLg btn btn-primary fs-5 mb-5"
            onClick={submitHandler}
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
