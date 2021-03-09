import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function () {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    document.getElementById("email").focus(); // auto focus not working
  });

  const onSubmit = () => {
    fetch(`/api/oidc/interaction/${uid}`);
  }

  return (
    <>
      <Head><title>Sign in</title></Head>

      <div className="card w-400 mw-full m-auto mt-20 mb-20">
        <h1 className="text-center mt-0 mb-0 text-primary"><FaLock /></h1>
        <h1 className="text-center mt-0">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group input-group mb-0">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
            </div>
            <input id="email" type="email" className="form-control form-control-lg" placeholder="Email address" required autoFocus />
          </div>

          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaLock />
              </span>
            </div>
            <input id="password" type="password" className="form-control form-control-lg" placeholder="Password" required />
          </div>

          <input className="btn btn-primary btn-block btn-lg" type="submit" value="Sign in" />
        </form>
      </div>
    </>
  );
}
