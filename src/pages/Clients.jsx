import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', contact_person: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/list/client`);
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { collection: 'client', data: form };
    await fetch(`${API_BASE}/api/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setForm({ name: '', email: '', contact_person: '' });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Clients</h2>
        <button onClick={fetchData} className="px-3 py-2 rounded-lg" style={{ backgroundColor: '#112240', border: '1px solid rgba(255,255,255,.08)' }}>Refresh</button>
      </div>

      <form onSubmit={onSubmit} className="grid md:grid-cols-4 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
        <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none" placeholder="Name" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} />
        <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none" placeholder="Email" value={form.email} onChange={e=>setForm(v=>({...v, email:e.target.value}))} />
        <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none" placeholder="Contact person" value={form.contact_person} onChange={e=>setForm(v=>({...v, contact_person:e.target.value}))} />
        <button type="submit" className="rounded-lg font-medium" style={{ background: '#64FFDA', color: '#0A192F' }}>Add</button>
      </form>

      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: '#112240' }}>
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td className="p-3" colSpan={4}>Loading...</td></tr>}
            {!loading && clients.map(c => (
              <tr key={c._id} className="odd:bg-white/5">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.contact_person}</td>
                <td className="p-3">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
