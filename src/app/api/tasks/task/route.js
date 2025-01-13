import {tareas} from '../route.js'


export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")

    const tarea = tareas.find(t => t.id === parseInt(idBuscado))

    if(tarea) {
        return new Response(JSON.stringify(tarea), {status:200})
    }else{
        return new Response(JSON.stringify({error: "No existe"}), {status: 404})
    }
}