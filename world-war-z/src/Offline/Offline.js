import React from "react"

import './Offline.css'

function Offline(){
    const date= new Date()
    const Fecha=new Date("March 19, 2030, 9:00:00")

    return(
        <div  className="ContainerOffline">
            {/*todo solucionar el relo  <i className="fa fa-clock-o" style={{fontSize:24, width:100, height: 100}} ></i>*/}
            
            <h1>Alerta</h1>
            <h2>Fuera de horario de servidor</h2>
            <h3>Regresa a las  {Fecha.getHours() % 12} : 0{Fecha.getUTCMinutes()} a.m. </h3>
            
            
        </div>
        
    )
}


export default Offline