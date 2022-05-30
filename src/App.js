import React, { useEffect, useState } from 'react'
import axios from "axios";
// import {useState} from "react"
function App () {
  const [page,setPage]=useState(1)
  const [todos,setTodos]=useState([])
  const [totalCount,setTotalCount]=useState(0)
const [limit,setLimit]=useState(5)
const [flag,setFlag]=useState(false)
const [updater,setUpdater]=useState(false)
const [updatevalue,setUpdateValue]=useState("")
const [patch,setpatch]=useState(false)
// const deleteitem=(id)=>{
//   console.log(id,"id")
//   fetch(`http://localhost:3000/todos/${id}`,{
//       method:"DELETE",
//       headers:{"Content-type":"application/json"},
     
//       })
//       .then((resp)=>resp.json())
//       .then((resp)=>{
//       console.log(resp,"res")
//       setTodos(todos)
      
//      })
//     }
const handleUpdateChange=(e)=>{
  setUpdateValue(e.target.value)

}

 const handleit=(id)=>{
   setUpdater(!updater)
  axios.put(`http://localhost:3000/todos/${id}`, {
    text: updatevalue,
    isCompleted: false,
    

}).then(resp => {

    console.log(resp.data);
    setpatch(!patch)
    setUpdateValue("")
}).catch(error => {

    console.log(error);
});
 }
const deleteitem=(id)=>{
  // const axios = require('axios');
axios.delete(`http://localhost:3000/todos/${id}`)
    .then(resp => {
        console.log(resp.data)
        setFlag(!flag)
    }).catch(error => {
        console.log(error);
    });
  }
  useEffect(()=>{

    const getTodo=async ()=>{

    let r=await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`) 
console.log(r.data)
setTodos(r.data)
setTotalCount(Number(r.headers["x-total-count"]));

};
getTodo()
},[page,limit,flag,patch]);

  
  return (
    <div className='App'>
       <button disabled={page<=1}
      onClick={()=>{if(page>1){
        setPage(page-1)}}}>{`<`}</button>


        <select onChange={(e)=>setLimit(Number(e.target.value))}>
          <option value={5} >5</option>
          <option value={10} >10</option>
          <option value={15}>20</option>
        </select>
      <button
      disabled={page*5>=totalCount} 
      onClick={()=>setPage(page+1)}>{`>`}</button>
      {todos.map((todo)=>(
        <div key={todo.id}>
{todo.id} {':'}{todo.text}

<button onClick={()=>deleteitem(todo.id)}>X</button>
{updater && <input onChange={handleUpdateChange}></input>}
<button onClick={()=>handleit(todo.id)}>Add input</button>
     </div>
      ))}
     
    </div>
  )
}

export default App