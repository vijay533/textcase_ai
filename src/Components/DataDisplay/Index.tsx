import { useEffect ,useRef,useState} from "react";
import '../DataDisplay/Index.css';
import * as signalR from '@microsoft/signalr';
interface DataDisplayProps{
    connection:signalR.HubConnection | null;
    data:{data:string,request:boolean}[];
}
export const DataDisplay:React.FC<DataDisplayProps> =({connection,data})=>
{
    const messagesEndRef = useRef<HTMLDivElement>(null);
    //var connection=useRef(new signalR.HubConnectionBuilder().withUrl('https://localhost:7055/chat').build());
    useEffect(()=>
    {
        console.log('in datadisplay ',data);
        return()=>
        {

        }
    },[])
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });           
        }
      }, [data]);
    return (<>
        <div className="datadisplay"  >
            {
                data.map((val:any,ind:any)=>
                (
                    <div className={val.request? "request":"response"}>
                       <p>{val.data}</p> 
                    </div>
                ))
            }
        </div>
        <div ref={messagesEndRef}></div>
    </>);
}