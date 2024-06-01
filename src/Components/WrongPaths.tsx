import * as React from 'react'
import { Link } from 'react-router-dom'

export default function WrongPaths() {
  return (
    <div className='w-full h-screen  flex flex-col items-center gap-10 '>
      <span className='text-6xl font-bold'>
        oops! 404
      </span>
      <span className='text-5xl font-semibold'>
        <Link to={"/"}>
          Click Me To Back To Home Page
        </Link>
      </span>
    </div>
  )
}
