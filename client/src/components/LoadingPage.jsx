import React from 'react'
import Loader from '../data/Loader.gif'

function LoadingPage({height = '100vh'}) {
  return (
    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', height:`${height}`}}>
        <img className="h-16 w-16 ml-4" src={Loader} alt='icon'/>
        <h1 className='text-lg text-primary mt-2'>Fluentify...</h1>
    </div>
  )
}

export default LoadingPage