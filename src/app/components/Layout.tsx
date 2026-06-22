import { Link, useLocation } from "react-router";
import { ShoppingCart, Home, List, Grid, Package, MapPin, Search, User, LogOut } from "lucide-react";
import { useApp } from "../store";

const navItems = [
  { path: "/home", label: "Shop", icon: Home },
  { path: "/browse", label: "Browse", icon: Grid },
  { path: "/my-list", label: "My List", icon: List },
  { path: "/wholesale", label: "Wholesale", icon: Package },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { cartCount } = useApp();

  return (
    <div className="flex h-screen bg-[#F2F3F2] font-[Poppins,sans-serif]">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col border-r border-gray-100 shrink-0">
        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#53B175] rounded-xl flex items-center justify-center text-white text-xl font-bold">N</div>
            <span className="text-xl font-bold text-[#181725]">nectar</span>
          </Link>
        </div>

        {/* Location */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-2 text-sm text-[#7C7C7C]">
            <MapPin size={14} className="text-[#53B175]" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-6">
          <div className="flex items-center gap-2 bg-[#F2F3F2] rounded-xl px-3 py-2.5">
            <Search size={16} className="text-[#7C7C7C]" />
            <input className="bg-transparent text-sm outline-none flex-1 text-[#181725] placeholder:text-[#7C7C7C]" placeholder="Search products..." />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${active ? "bg-[#53B175] text-white" : "text-[#7C7C7C] hover:bg-[#F2F3F2] hover:text-[#181725]"}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 space-y-1">
          <Link to="/login" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#7C7C7C] hover:bg-[#F2F3F2] hover:text-[#181725] transition-all">
            <LogOut size={18} />
            Log out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-[#7C7C7C]">
            <span className="text-[#181725] font-semibold capitalize">
              {navItems.find(n => n.path === location.pathname)?.label ?? "Nectar"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <div className="w-10 h-10 bg-[#F2F3F2] rounded-full flex items-center justify-center hover:bg-[#e8f5ee] transition-colors">
                <ShoppingCart size={18} className="text-[#181725]" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#53B175] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/home">
              <div className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
