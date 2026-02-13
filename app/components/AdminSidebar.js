"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Users, ArrowLeft } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <>
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-40 w-72 h-screen bg-white border-r border-gray-200/80 flex-col">
        {/* Logo */}
        <div className="px-6 pt-8 pb-6 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 font-montserrat tracking-tight">
            CampusNest
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-poppins tracking-widest uppercase">
            Admin Panel
          </p>
        </div>

        {/* Nav Links */}
        <nav className="px-4 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all group
                  ${isActive
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />
                <span className="font-poppins">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-6 shrink-0 space-y-3 border-t border-gray-100 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl text-sm font-medium transition-all group"
          >
            <ArrowLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
            <span className="font-poppins">Back to Site</span>
          </Link>
          <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-gray-500 font-poppins">
                Logged in as <span className="font-semibold text-gray-900">Admin</span>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex items-stretch justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center flex-1 gap-1 transition-colors relative min-h-[56px]
                  ${isActive ? "text-gray-900" : "text-gray-400"}
                `}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-900 rounded-full" />
                )}
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.75} />
                <span className={`text-[10px] font-poppins ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
          {/* Back to Site Tab */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center flex-1 gap-1 transition-colors relative min-h-[56px] text-gray-400"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
            <span className="text-[10px] font-poppins font-medium">
              Exit
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
