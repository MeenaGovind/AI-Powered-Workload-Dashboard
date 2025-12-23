
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddTask() {
  const [users,setUsers]=useState([]);
  const [task,setTask]=useState({taskId:"",assigneeId:"",complexity:"",estimatedHours:0,tech:""});

  useEffect(()=>{
    (async()=>{
      const snap = await getDocs(collection(db,"users"));
      setUsers(snap.docs.map(d=>({id:d.id,...d.data()})));
    })();
  },[]);

  const save = async () => {
    await addDoc(collection(db,"tasks"),task);
    alert("Task Added");
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Add Task</h2>
      <input className="border p-2 block mb-2" placeholder="Task Id" onChange={e=>setTask({...task,taskId:e.target.value})}/>
      <select className="border p-2 block mb-2" onChange={e=>setTask({...task,assigneeId:e.target.value})}>
        <option>Select User</option>
        {users.map(u=>(<option key={u.id} value={u.id}>{u.name}</option>))}
      </select>
      <input className="border p-2 block mb-2" placeholder="Complexity" onChange={e=>setTask({...task,complexity:e.target.value})}/>
      <input className="border p-2 block mb-2" type="number" placeholder="Hours" onChange={e=>setTask({...task,estimatedHours:Number(e.target.value)})}/>
      <input className="border p-2 block mb-2" placeholder="Tech" onChange={e=>setTask({...task,tech:e.target.value})}/>
      <button className="bg-blue-500 px-4 py-2 text-white" onClick={save}>Save</button>
    </>
  );
}
