import { useState } from 'react';
import { Menu, LayoutDashboard, Users, Calendar, KanbanSquare, Receipt, BarChart3 } from 'lucide-react';
import { Link, BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const nav = [
    { to: '/', label: 'Analytics', icon: BarChart3 },
    { to: '/clients', label: 'Clients', icon: Users },
    { to: '/content', label: 'Content', icon: Calendar },
    { to: '/workflows', label: 'Workflows', icon: KanbanSquare },
    { to: '/finance', label: 'Finance', icon: Receipt },
  ];

  return (
    <div className="min-h-screen flex text-[#CCD6F6]" style={{ backgroundColor: '#0A192F' }}>
      <aside className={`transition-all duration-300 border-r border-white/10`} style={{ width: collapsed ? 72 : 260, backgroundColor: '#112240' }}>
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10">
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-lg hover:bg-white/5">
            <Menu className="w-5 h-5" />
          </button>
          {!collapsed && <div className="font-semibold tracking-wide">Dark Whale</div>}
        </div>
        <nav className="p-3 space-y-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-[#64FFDA]' : 'hover:bg-white/5'}`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1616587894289-86480e533129?auto=format&fit=crop&w=1600&q=60)',
          backgroundSize: 'cover',
          opacity: 0.03
        }} />

        <div className="relative p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
