
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddUser() {
  const [data,setData]=useState({name:"",role:"",skills:"",capacity:0});

  const save = async () => {
    await addDoc(collection(db,"users"),{
      ...data,
      skills:data.skills.split(",").map(s=>s.trim()),
      capacity:Number(data.capacity)
    });
    alert("User Added");
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Add User</h2>
      <input className="border p-2 block mb-2" placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
      <input className="border p-2 block mb-2" placeholder="Role" onChange={e=>setData({...data,role:e.target.value})}/>
      <input className="border p-2 block mb-2" placeholder="Skills" onChange={e=>setData({...data,skills:e.target.value})}/>
      <input className="border p-2 block mb-2" type="number" placeholder="Capacity" onChange={e=>setData({...data,capacity:e.target.value})}/>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={save}>Save</button>
    </>
  );
}
