import { useState,useRef,useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import '../UserInput/Index.css'
interface UserInputProps
{
    connection:signalR.HubConnection | null;
}
export const UserInput:React.FC<UserInputProps>=({connection})=>
{
    const [message, setMessage] = useState('');
    const textareaRef=useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (event: any) => {
         setMessage(event.target.value);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log("In handle key");
        if (e.key === 'enter' || e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); 
          var sendbutton=document.getElementById("sendButton") as HTMLInputElement;
          if(sendbutton.disabled==false) 
          send(e as unknown as React.FormEvent);
        }
      };
    const send = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('In send..');
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
          connection.invoke('SendMessage', message)
            .then(() => setMessage(''))
            .catch(err => console.error('Error sending message: ', err));
        } else {
          console.error('Cannot send message, connection is not in the "Connected" state.');
        }
      };

    useEffect(()=>
    {
        var checkingValidString=message;
        var sendbutton=document.getElementById("sendButton") as HTMLInputElement;
            if(sendbutton)
            {
                if(checkingValidString.trim()==="") 
                {
                    sendbutton.style.backgroundColor="#0056b3";
                    sendbutton.disabled=true;
                    sendbutton.value="X";
                }
                else{
                    sendbutton.style.backgroundColor=" #004186";
                    sendbutton.disabled=false;
                    sendbutton.value="enter";
                }
            }
            if (textareaRef.current) {
                console.log(textareaRef.current.scrollHeight);
                textareaRef.current.style.height = '30px';
                textareaRef.current.style.height =`${Math.min( textareaRef.current.scrollHeight,150)}px`;
                textareaRef.current.style.overflowY = textareaRef.current.scrollHeight > 150 ? 'auto' : 'hidden'; 
            }
           
    },[message])

    return (<>
    <form onSubmit={send}>
    <div className="chatInputContainer">
            <textarea
                ref={textareaRef}
                className="chatTextarea"
                placeholder="Type..."
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                id='userInput'
            />
            
            <div className='buttonArea'>
                <input type="submit" className="sendButton" id="sendButton"  value='X'/>
            </div>
            
    </div> 
    </form>
        
    </>)
}