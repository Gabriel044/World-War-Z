import React,{useEffect, useState} from "react";
import "./bunkerMap.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { IoAddCircleSharp } from "react-icons/io5";
import BunkerForm from "../../components/BunkerForm/bunkerform";


export default function BunkerMap() {
  const [map,setMap]=useState(null);
  const [bunkers, setBunkers] = useState([]);
  const [addBunker, setAddBunker] = useState(false);
  const [updatedMap,setUpdatedMap]=useState(true)
  console.log('hi:)')
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicHJ1ZWJhYSIsImEiOiJjbDJ6aHRldzQxZnJ0M2lwMmpmbHM1ZHJjIn0.7usXzE9zv3Oi6NpMMYBqJA'; 
    //mapa
    setMap(new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/dark-v10', // dark mode
      //style: 'mapbox://styles/mapbox/streets-v11', // modo claro
      center: [-103.454810, 20.732498], // [lng, lat] inicia en el tec 
      zoom: 13 // starting zoom
    }))
    getBunkers()
  },[])
  useEffect(() => {
    if (bunkers.length != 0) {
      console.log('2:)')
      agregarMarcadores(bunkers);
      setUpdatedMap(!updatedMap);
    }

  },[bunkers])
  function getBunkers(){
    fetch("http://localhost:5000/bunkers")
      .then((res) => {
        res
          .json()
          .then((object) => {
            //console.log(typeof (object.bunkers));
            var bunkers = JSON.parse(object.bunker) // Convertir object a string
            let bunkerArray=[]
            for(var key in bunkers){
              //console.log(bunkers[key]);
              bunkerArray.push(bunkers[key]);
            }
            //localStorage.setItem("POSTS", userPosts); // Guardar string en localStorge
            //setBunkers(JSON.parse(bunkers));
            setBunkers(bunkerArray);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log("Hubo un error al solicitar los bunkers: " + err)
        // solicitar posts de local storage
        //setPosts(getStoredPosts())
    });
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
    console.log(obejeto)
    
    for(var i =0;i<obejeto.length;i++){
      //console.log(obejeto[i].isAlive)
      //console.log(obejeto[i].lat)
      //console.log(obejeto[i].long)
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
