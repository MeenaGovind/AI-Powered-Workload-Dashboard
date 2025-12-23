
import { useState } from "react";
import Layout from "./Layout";
import Protected from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import AddTask from "./pages/AddTask";

export default function App(){
  const [view,setView]=useState("dashboard");

  return (
    <Protected>
      <Layout setView={setView}>
        {view==="dashboard" && <Dashboard/>}
        {view==="user" && <AddUser/>}
        {view==="task" && <AddTask/>}
      </Layout>
    </Protected>
  );
}
