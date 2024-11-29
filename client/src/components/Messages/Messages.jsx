import React from 'react'
import Header from './Header'
import Message from './Message'
import WriteMessage from './WriteMessage'

export const Messages = () => {
  return (
    <div className='flex flex-col w-full mt-3 mx-3 p-2'>
        <Header />
        <div className="mt-2 overflow-auto mb-5">
        {Array(10).fill(null).map((_, idx) => {
            return <Message key={idx} />
        })}
      </div>
      <WriteMessage />
    </div>
  )
}
