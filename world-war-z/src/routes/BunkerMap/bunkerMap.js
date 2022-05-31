import React,{useEffect, useState} from "react";
import "./bunkerMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { IoAddCircleSharp } from "react-icons/io5";
import BunkerForm from "../../components/BunkerForm/bunkerform";


export default function BunkerMap() {
  let map;
  const [bunkers, setBunkers] = useState([]);
  const [addBunker, setAddBunker] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJ1ZWJhYSIsImEiOiJjbDJ6aHRldzQxZnJ0M2lwMmpmbHM1ZHJjIn0.7usXzE9zv3Oi6NpMMYBqJA'; 
    //mapa
    map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/dark-v10', // dark mode
      //style: 'mapbox://styles/mapbox/streets-v11', // modo claro
      center: [-103.454810, 20.732498], // [lng, lat] inicia en el tec 
      zoom: 13 // starting zoom
    });

    agregarMarcadores(puntosObjeto)
  },[])
  
  function getBunkers(){
    
  }


  
  const puntosObjeto=[
    {
        lat:-103.455739,
        long:20.735764,
        isAlive:false
    },{
        lat:-103.450320,
        long: 20.730336,
        isAlive:true
    },{
        lat:-103.442014,
        long:20.664497,
        isAlive:true
    }];
    


  function agregarMarcadores(obejeto){
    for(var i =0;i<obejeto.length;i++){
      const marker1 = new mapboxgl.Marker({color: obejeto[i]['isAlive']? 'green':'black', rotation:0})
      .setLngLat([obejeto[i]['lat'],obejeto[i]['long']])
      .addTo(map);        
    }
  }
  
return <div>
  
  <div id='map' style={{width: "500px", height: "500px"}}></div>
  
  {addBunker && (<BunkerForm setAddBunker={setAddBunker}/>)}
  <IoAddCircleSharp id="AddPost" onClick={() => setAddBunker(true)} />

  </div>;
}
