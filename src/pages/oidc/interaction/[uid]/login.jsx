import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaLock } from 'react-icons/fa'

export default function Login () {
  const { handleSubmit } = useForm()
  const router = useRouter()
  const { uid } = router.query

  useEffect(() => {
    document.getElementById('email').focus() // Auto focus not working
  })

  const onSubmit = async (data) => {
    const res = await fetch(`/api/oidc/interaction/${uid}/login`, {
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    if (res.status !== 200) {
      // TODO: handle errors
      throw new Error('status !== 200')
    }

    const { redirectTo } = await res.json()

    window.location.href = redirectTo
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className='card w-400 mw-full m-auto mt-20 mb-20'>
        <h1 className='text-center mt-0 mb-0 text-primary'><FaLock /></h1>
        <h1 className='text-center card-title mt-0'>Sign in</h1>

        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

          <div className='form-group input-group mb-0'>
            <div className='input-group-prepend'>
              <span className='input-group-text'><FaEnvelope /></span>
            </div>
            <input
              autoFocus
              className='form-control'
              id='email'
              name='email'
              placeholder='Email address'
              required
              type='email'
            />
          </div>

          <div className='form-group input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'><FaLock /></span>
            </div>
            <input
              className='form-control'
              id='password'
              name='password'
              placeholder='Password'
              required
              type='password'
            />
          </div>

          <input
            className='btn btn-primary btn-block'
            type='submit'
            value='Sign in'
          />

        </form>
      </div>
    </>
  )
}
