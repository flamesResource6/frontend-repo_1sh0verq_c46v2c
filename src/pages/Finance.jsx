import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function currency(n){ return new Intl.NumberFormat('de-DE',{ style:'currency', currency:'EUR'}).format(n || 0); }

export default function FinancePage(){
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({ client_id:'', number:'', issue_date:'', due_date:'', currency:'EUR' });

  const fetchData = async () => {
    try{ const res = await fetch(`${API_BASE}/api/list/invoice`); setInvoices(await res.json()); } catch(e){ console.error(e); }
  };
  useEffect(()=>{ fetchData(); },[]);

  const add = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/api/create`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ collection:'invoice', data: { ...form, items: [] } }) });
    setForm({ client_id:'', number:'', issue_date:'', due_date:'', currency:'EUR' });
    fetchData();
  };

  const total = useMemo(()=> invoices.reduce((sum, inv)=> sum + (inv.items || []).reduce((s,i)=> s + (i.quantity||0)*(i.unit_price||0),0),0), [invoices]);

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="grid md:grid-cols-5 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
        <input value={form.number} onChange={e=>setForm(v=>({...v, number:e.target.value}))} placeholder="Invoice #" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
        <input type="date" value={form.issue_date} onChange={e=>setForm(v=>({...v, issue_date:e.target.value}))} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
        <input type="date" value={form.due_date} onChange={e=>setForm(v=>({...v, due_date:e.target.value}))} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
        <input value={form.client_id} onChange={e=>setForm(v=>({...v, client_id:e.target.value}))} placeholder="Client Id (ref)" className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
        <button className="rounded-lg font-medium" style={{ background:'#D4AF37', color:'#0A192F' }}>Add</button>
      </form>

      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor:'#112240' }}>
            <tr className="text-left">
              <th className="p-3">Number</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Due</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => {
              const sum = (inv.items || []).reduce((s,i)=> s + (i.quantity||0)*(i.unit_price||0),0);
              return (
                <tr key={inv._id} className="odd:bg-white/5">
                  <td className="p-3">{inv.number}</td>
                  <td className="p-3">{inv.issue_date}</td>
                  <td className="p-3">{inv.due_date}</td>
                  <td className="p-3">{inv.status}</td>
                  <td className="p-3 text-right" style={{ color:'#64FFDA' }}>{currency(sum)}</td>
                </tr>
              );
            })}
            {invoices.length===0 && <tr><td className="p-3" colSpan={5}>No invoices yet</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="text-right text-sm opacity-80">Sum of listed invoices: <span style={{ color:'#64FFDA' }}>{currency(total)}</span></div>
    </div>
  );
}
