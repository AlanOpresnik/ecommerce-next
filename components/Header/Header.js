import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='w-[99vw]'>
            <Image className='w-[100vw] h-[70vh]' src={'https://f.fcdn.app/imgs/be5ad0/www.zooko.com.uy/zoo/2f4b/original/blog/2451/760x0/2.jpg'} width={2000} height={1000} alt='img' />
        </div>
    </div>
  )
}

export default Header