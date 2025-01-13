"use client"
import Link from 'next/link'
import {useState, useEffect} from 'react'

export default function Tasks(){

   const [tareas, setTareas] = useState([]) 
   const [nuevoTitulo, setNuevoTitulo] = useState("")
   const [filter, setFilter] = useState("all")


   useEffect( () => {
    fetchTareas()
   }, [filter])

   async function fetchTareas(){
    
    let url = "/api/tasks"

    if(filter !== "all"){
        url = url + "?filter=" + filter
    }

    const response = await fetch(url)
    const data = await response.json()
    setTareas(data)
   }

   async function agregaTarea(e){
    e.preventDefault();
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify({title: nuevoTitulo}) 
    })
        setNuevoTitulo("")
        fetchTareas();
   }

   //{"id": 1}
   async function completaTarea(idActualizar){
    const response = await fetch("api/tasks", {
        method: "PUT",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify({id: idActualizar})
    })

    fetchTareas()
   }

   async function eliminaTarea(idEliminar){
    const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify({id: idEliminar})
    })

    fetchTareas();
   }

    return (
        <div>
            <h3>Agregar tarea: </h3>
            <form onSubmit={agregaTarea} >
                <input type="text" value={nuevoTitulo} onChange={(e) => setNuevoTitulo(e.target.value)} />
                <input type="submit" value="Crear" />
            </form>
            <h3>Listado de tareas:</h3>
            <button onClick={() => setFilter("all")}>Todas</button>
            <button onClick={() => setFilter("completed")}>Completadas</button>
            <button onClick={() => setFilter("no-completed")}>No completadas</button>
            {tareas.map(tarea => <p key={tarea.id}><input type="checkbox" checked={tarea.completed} onChange={() => completaTarea(tarea.id)} />{tarea.completed?<s>{tarea.title}</s>:tarea.title}<button onClick={() => eliminaTarea(tarea.id)}>Eliminar</button><Link href={"/tasks/" + tarea.id}>Ver</Link></p>)}
        </div>
    );
}