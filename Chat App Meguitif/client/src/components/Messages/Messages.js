import React from 'react'
import ScrolltoButtom from 'react-scroll-to-bottom'; 
//components
import Message from './Message/Message'
import './Messages.css'

const  Messages = ({messages , name}) => {
    return (
        <ScrolltoButtom className="messages">
            {messages.map((message , i )=><div key={i}><Message message= {message} name={name}/></div>)}
        </ScrolltoButtom>
    )
}

export default Messages
