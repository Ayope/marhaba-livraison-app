import { useEffect, useState } from "react";
import axios from 'axios'

export default function Clients(){
    const [clients, setClients] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/clients`, {withCredentials : true})
        .then(function(response){
            setClients(response.data);
        }).catch(function(error){
            console.error(error);
        })
    }, [])

    return (
        <div>
            {clients.map(client => 
            <div>
                <p>{client.name}</p>
                <p>{client.role.title}</p>
            </div>
            )}
        </div>
    )
}