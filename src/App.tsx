import { UserInput } from "./Components/UserInput/Index";
import { DataDisplay } from "./Components/DataDisplay/Index";
import '../src/App.css';
import * as signalR from '@microsoft/signalr';
import { useEffect ,useRef,useState} from "react";
function App() {


    var [data,setData]=useState<{data:string,request:boolean}[]>([
    {data:"Hi Good day", request: true},
    {data:"Hi, Good day how can i help you",request:false}]);

    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    useEffect(() => {
      console.log('In useEffect');
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7055/chat", {
          withCredentials: true 
        })
        .withAutomaticReconnect()
        .build();
        newConnection.start().then(()=>
            {
              newConnection.on("ReceiveMessage",(Rdata:any)=>
                {
                  console.log(Rdata);
                    setData(prev=>[...prev,{data:Rdata.data,request:Rdata.request}]);
                });
            }).catch((e)=>
            {
              console.log(e);
            });
      setConnection(newConnection);
     
      return () => {
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
          connection.stop();
        }
      };
    },[]);
    useEffect(() => {
      console.log('Data updated:', data);
    }, [data]);
  return (
    <div className="App">
      <div className="header">
          <img className="logo" src='/Logo.jfif' alt="logo"></img>
          <div className="title">Testcase-AI</div>
      </div>
      <div className="dataBody">
          <DataDisplay data={data} connection={connection}></DataDisplay>
      </div>
     
     <div className="userInput">
        <UserInput connection={connection}></UserInput>
     </div>
     
    </div>
  );
}

export default App;
