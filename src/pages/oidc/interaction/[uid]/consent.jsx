import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FaCheck, FaLock, FaTimes } from 'react-icons/fa'

export default function Consent () {
  const { handleSubmit } = useForm()
  const router = useRouter()
  const { uid } = router.query

  const onSubmit = async (data) => {
    const res = await fetch(`/api/oidc/interaction/${uid}/consent`, {
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
        <title>Consent</title>
      </Head>

      <div className='card w-400 mw-full m-auto mt-20 mb-20'>
        <h1 className='text-center mt-0 mb-0 text-primary'>
          <FaLock />
        </h1>

        <h1 className='text-center card-title mt-0'>
          Authorize Application
        </h1>

        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col p-5'>
                <a className='btn btn-block' href={`/api/oidc/interaction/${uid}/cancel`}>
                  <FaTimes /> Decline
                </a>
              </div>
              <div className='col p-5'>
                <button className='btn btn-block btn-primary' type='submit'>
                  <FaCheck /> Approve
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
