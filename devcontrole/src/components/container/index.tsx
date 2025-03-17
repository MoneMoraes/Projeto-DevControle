import { ReactNode } from 'react'

export function Container({ children }:{ children : ReactNode }){
    return(
        <div className='w-full max-w-7xl m-auto px-2'>
            {children}
        </div>
    )
}