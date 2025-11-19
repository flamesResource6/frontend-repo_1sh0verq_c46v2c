import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const columns = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Done' },
];

export default function WorkflowsPage(){
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [drag, setDrag] = useState(null);

  const fetchData = async () => {
    try{ const res = await fetch(`${API_BASE}/api/list/task`); setTasks(await res.json()); } catch(e){ console.error(e); }
  };
  useEffect(()=>{ fetchData(); },[]);

  const add = async (e) => {
    e.preventDefault();
    if(!title) return;
    await fetch(`${API_BASE}/api/create`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ collection:'task', data: { title, state:'backlog', priority:'medium' } }) });
    setTitle('');
    fetchData();
  };

  const onDragStart = (t) => setDrag(t);
  const onDrop = async (colKey) => {
    if(!drag || drag.state === colKey) return;
    try {
      await fetch(`${API_BASE}/api/update/task/${drag._id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ data: { state: colKey } }) });
      setDrag(null);
      fetchData();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex-1" />
        <button className="rounded-lg px-4" style={{ background:'#64FFDA', color:'#0A192F' }}>Add</button>
      </form>

      <div className="grid md:grid-cols-4 gap-4">
        {columns.map(col => (
          <div
            key={col.key}
            className="rounded-xl p-3 bg-white/5 border border-white/10 min-h-[300px]"
            onDragOver={(e)=> e.preventDefault()}
            onDrop={()=> onDrop(col.key)}
          >
            <div className="text-sm font-medium mb-2">{col.label}</div>
            <div className="space-y-3">
              {tasks.filter(t=>t.state===col.key).map(t => (
                <div
                  key={t._id}
                  className="rounded-lg p-3 cursor-move"
                  draggable
                  onDragStart={()=> onDragStart(t)}
                  style={{ background:'#112240' }}
                >
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs opacity-70">{t.priority}</div>
                </div>
              ))}
              {tasks.filter(t=>t.state===col.key).length === 0 && <div className="text-xs text-white/50">No tasks</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
