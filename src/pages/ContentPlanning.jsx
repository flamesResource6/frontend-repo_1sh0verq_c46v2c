import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function dayKey(d){ return d.toISOString().slice(0,10); }

export default function ContentPlanningPage(){
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const fetchData = async () => {
    try{
      const res = await fetch(`${API_BASE}/api/list/content`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    }catch(e){ console.error(e); }
  };

  useEffect(()=>{ fetchData(); },[]);

  const addItem = async (e) => {
    e.preventDefault();
    if(!title || !date) return;
    await fetch(`${API_BASE}/api/create`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ collection:'content', data: { title, scheduled_date: date, channel: 'blog', status:'scheduled' } }) });
    setTitle(''); setDate('');
    fetchData();
  };

  const map = items.reduce((acc, it)=>{ const key = it.scheduled_date || 'unscheduled'; (acc[key] ||= []).push(it); return acc; },{});
  const days = Array.from({length: 14},(_,i)=>{ const d = new Date(); d.setDate(d.getDate()+i); return d; });

  return (
    <div className="space-y-6">
      <form onSubmit={addItem} className="grid md:grid-cols-5 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
        <div className="md:col-span-2 text-sm self-center opacity-80">Add scheduled content</div>
        <button className="rounded-lg font-medium" style={{ background: '#D4AF37', color: '#0A192F' }}>Schedule</button>
      </form>

      <div className="grid md:grid-cols-7 gap-4">
        {days.map((d) => {
          const key = dayKey(d);
          const list = map[key] || [];
          return (
            <div key={key} className="rounded-xl p-3 bg-white/5 border border-white/10 min-h-[140px]">
              <div className="text-xs text-white/70 mb-2">{key}</div>
              <div className="space-y-2">
                {list.map(item => (
                  <div key={item._id} className="rounded-lg p-2 text-sm" style={{ background:'#112240' }}>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs opacity-70">{item.channel} • {item.status}</div>
                  </div>
                ))}
                {list.length === 0 && <div className="text-xs text-white/50">No items</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
