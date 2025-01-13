// import Tasks from "@/app/tasks/page"
import { createClient } from '@supabase/supabase-js'

// export let tareas = [
//     {id: 1, title: "preparar la comida", completed: true},
//     {id: 2, title: "hacer la colada", completed: false}
// ]


const supabaseUrl = 'https://rmpqbxpembolxycjtadm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcHFieHBlbWJvbHh5Y2p0YWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NTg1MzYsImV4cCI6MjA1MjMzNDUzNn0.zoNvI5PMX-YK8DFsIe8K0mFU-e6WCvn_OJOJcUkXVm4"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request){
   
   const {searchParams} = new URL(request.url)
   const filter = searchParams.get("filter")

   const {data: tareas, error} = await supabase.from("tasks").select("*")

   let tareasFiltradas = tareas

   if(filter === 'completed'){
    tareasFiltradas = tareas.filter(tarea => tarea.completed)
   }else if (filter === 'no-completed'){
    tareasFiltradas = tareas.filter(tarea => !tarea.completed)
   }

    return new Response(JSON.stringify(tareasFiltradas), {status: 200})


}

export async function POST(request){

    const body = await request.json()
    const title = body.title
    const completed = false

    //El .single() es para indicar que es un unico elemento, y no un array. Si no agregaria un array. El single elimina los []
    //Si la BD devuelve okey, se mete en insertTarea, si no, se mete en error
    const {data: insertTarea, error} = await supabase.from("tasks").insert({title, completed}).single()

    return new Response(JSON.stringify(insertTarea), {status: 201})
}

export async function PUT(request){

    const body = await request.json()
    const id = body.id
    const completed = {completed: !body.completed}

    const {data: updateTarea, error} = await supabase.from("tasks").update(completed).eq("id", id).single()

    return new Response(JSON.stringify(updateTarea), {status: 200})
}

export async function DELETE(request){

    const body = await request.json()
    const id = body.id

    const {data: deleteTask, error} = await supabase.from("tasks").delete().eq("id", id)

    return new Response(JSON.stringify({success: "eliminado correctamente"}), {status: 200})
}