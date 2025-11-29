import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logos/t.png'

const Start = () => 
{
    return (
        <div>
            <div className='bg-cover bg-[url(https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hODVlNjUzYS03ZjAxLTRlNzMtYTU1NS03ZTEzZWY0NTM0N2IucG5n)] h-screen pt-8 flex justify-between flex-col w-full'>
                <img className='w-16 h-30 ml-5' src={Logo} alt='' />
                <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-[30px] font-bold'>Get Started with Raahi</h2>
                    <Link to='/login' className ='flex items-center justify-center w-full bg-black text-white py-3 mt-5 rounded-lg'> Continue</Link>
                </div>
            </div>

        </div>
  )
}

export default Start