"use client"

import { useEffect, useState, use } from "react";

export default function Tarea({params}) {

    const { id } = use(params);
    const [tarea, setTarea] = useState()

    
  // Obtener los detalles de la tarea desde la API

  async function fetchTarea(){
    const url = "/api/tasks/task?id=" + id
    const response = await fetch(url);
    const task = await response.json()
    setTarea(task)

  }
  useEffect( () => {fetchTarea()}, [])


  if (!tarea) {
    return <h1>Task not found</h1>;
  }

    return (
        <div>
            <h3>Detalle tarea</h3>
            <p><strong>ID:</strong> {tarea.id}</p>
            <p><strong>Title:</strong> {tarea.title}</p>
            <p><strong>Status:</strong> {tarea.completed ? 'Completed' : 'Not Completed'}</p>
        </div>
    )
}