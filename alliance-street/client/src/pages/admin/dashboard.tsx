import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, FileText, PenLine, Settings, Mail, LogOut,
  BookOpen, Users, Cog
} from "lucide-react";
import ContentEditor from "./content-editor";
import BlogManager from "./blog-manager";
import SettingsManager from "./settings-manager";
import ContactsView from "./contacts-view";
import { useEffect, useState } from "react";

const navItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "content", label: "Content", icon: FileText },
  { key: "blog", label: "Blog", icon: PenLine },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "contacts", label: "Contacts", icon: Mail },
];

function AdminSidebar({ active, onNavigate }: { active: string; onNavigate: (key: string) => void }) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    toast({ title: "Logged out" });
    setLocation("/admin");
  };

  return (
    <div className="w-64 min-h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <h1 className="text-lg font-bold text-white" data-testid="text-admin-title">Admin Panel</h1>
        <p className="text-xs text-white/40 mt-1">Alliance Street CMS</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === item.key
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
            data-testid={`nav-admin-${item.key}`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-white/5">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-white/50 hover:text-red-400 hover:bg-red-500/5"
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function OverviewPanel() {
  const { data: blogs } = useQuery({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      const res = await fetch("/api/admin/blog", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const { data: contacts } = useQuery({
    queryKey: ["admin", "contacts"],
    queryFn: async () => {
      const res = await fetch("/api/admin/contacts", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const { data: settings } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const res = await fetch("/api/admin/settings", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const stats = [
    { label: "Blog Posts", value: blogs?.length ?? 0, icon: BookOpen, color: "text-blue-400" },
    { label: "Contact Submissions", value: contacts?.length ?? 0, icon: Users, color: "text-green-400" },
    { label: "Site Settings", value: settings?.length ?? 0, icon: Cog, color: "text-yellow-400" },
    { label: "Published Posts", value: blogs?.filter((b: any) => b.published).length ?? 0, icon: PenLine, color: "text-red-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1" data-testid="text-overview-heading">Dashboard Overview</h2>
        <p className="text-white/40 text-sm">Welcome to the Alliance Street CMS admin panel.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-[#111] border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-white" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {stat.value}
              </p>
              <p className="text-sm text-white/40 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => {
        if (!r.ok) setLocation("/admin");
      })
      .catch(() => setLocation("/admin"));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "content": return <ContentEditor />;
      case "blog": return <BlogManager />;
      case "settings": return <SettingsManager />;
      case "contacts": return <ContactsView />;
      default: return <OverviewPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex">
      <AdminSidebar active={activeTab} onNavigate={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
