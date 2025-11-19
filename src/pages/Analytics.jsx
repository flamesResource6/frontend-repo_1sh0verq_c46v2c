import Hero3D from '../components/Hero3D';

function Kpi({ label, value, trend }) {
  return (
    <div className="rounded-xl p-4 bg-white/5 backdrop-blur border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="text-xs uppercase tracking-wider text-white/70">{label}</div>
      <div className="mt-2 text-2xl font-semibold" style={{ color: '#64FFDA' }}>{value}</div>
      <div className="text-xs mt-1" style={{ color: trend.startsWith('+') ? '#64FFDA' : '#D4AF37' }}>{trend}</div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Kpi label="MRR" value="€42,300" trend="+8.2%" />
        <Kpi label="Active Clients" value="128" trend="+3" />
        <Kpi label="ARPU" value="€330" trend="-1.2%" />
      </div>

      <Hero3D />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-4 bg-white/5 border border-white/10">
          <div className="text-sm text-white/80 mb-2">Revenue by Month</div>
          <div className="h-56 grid grid-cols-12 items-end gap-2">
            {[12,18,22,28,35,40,45,42,48,54,60,72].map((h,i)=> (
              <div key={i} className="bg-[#64FFDA] rounded" style={{ height: `${h*2}px`, opacity: 0.8 }} />
            ))}
          </div>
        </div>
        <div className="rounded-xl p-4 bg-white/5 border border-white/10">
          <div className="text-sm text-white/80 mb-2">Client Segments</div>
          <div className="h-56 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full" style={{
              background: 'conic-gradient(#64FFDA 0 40%, #D4AF37 40% 70%, #5873b5 70% 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
