import Tasks from "@/app/tasks/page"

export let tareas = [
    {id: 1, title: "preparar la comida", completed: true},
    {id: 2, title: "hacer la colada", completed: false}
]

export async function GET(request){
   
   const {searchParams} = new URL(request.url)
   const filter = searchParams.get("filter")

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

    const newTask = {
        id: tareas.length + 1,
        title: body.title,
        completed: false
    }
    tareas.push(newTask)
    return new Response(JSON.stringify(newTask), {status: 201})
}

export async function PUT(request){

    const body = await request.json()

   let tareaAct = tareas.find(tarea => tarea.id === body.id)

   tareaAct.completed = !tareaAct.completed

    return new Response(JSON.stringify(tareaAct), {status: 200})
}

export async function DELETE(request){

    const body = await request.json()

    tareas = tareas.filter(tarea => tarea.id!== body.id)

    return new Response(JSON.stringify({success: "eliminado correctamente"}), {status: 200})
}