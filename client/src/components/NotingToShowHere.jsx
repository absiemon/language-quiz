import { Container } from '@mui/material'
import React from 'react'
import box from '../data/box.png'

function NotingToShowHere({height=80}) {
  return (
    <main className={`h-[${height}vh] flex flex-col justify-center items-center`}>
        <img src={box} alt='icon' className='h-20 w-20'/>
        <h1 className='text-primary text-sm'>Nothing to show here</h1>
    </main>
  )
}

export default NotingToShowHere