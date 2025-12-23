export default function Layout({ setView, children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* ===== Sidebar (Fixed) ===== */}
      <aside className="w-64 bg-gray-900 text-white h-full p-6 space-y-4 sticky top-0">
        <h1 className="text-xl font-bold">AI Dashboard</h1>
        <button className="w-full bg-gray-700 p-2" onClick={()=>setView("dashboard")}>
          Dashboard
        </button>
        <button className="w-full bg-gray-700 p-2" onClick={()=>setView("user")}>
          Add User
        </button>
        <button className="w-full bg-gray-700 p-2" onClick={()=>setView("task")}>
          Add Task
        </button>
      </aside>

      {/* ===== Main Area (Scrolls) ===== */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
