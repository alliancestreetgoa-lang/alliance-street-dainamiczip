import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronRight, Save, Loader2 } from "lucide-react";

export default function ContentEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const { data: contents, isLoading } = useQuery({
    queryKey: ["admin", "content"],
    queryFn: async () => {
      const res = await fetch("/api/admin/content", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch content");
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ page, sectionKey, content }: { page: string; sectionKey: string; content: any }) => {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ page, sectionKey, content }),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "content"] });
      toast({ title: "Saved", description: "Content updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save content", variant: "destructive" });
    },
  });

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getEditKey = (item: any) => `${item.page}-${item.sectionKey}`;

  const handleSave = (item: any) => {
    const key = getEditKey(item);
    const raw = editValues[key];
    try {
      const parsed = raw ? JSON.parse(raw) : item.content;
      saveMutation.mutate({ page: item.page, sectionKey: item.sectionKey, content: parsed });
    } catch {
      toast({ title: "Error", description: "Invalid JSON format", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="flex items-center gap-2 text-white/50"><Loader2 className="w-4 h-4 animate-spin" /> Loading content...</div>;
  }

  const grouped: Record<string, any[]> = {};
  (contents || []).forEach((item: any) => {
    if (!grouped[item.page]) grouped[item.page] = [];
    grouped[item.page].push(item);
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1" data-testid="text-content-heading">Content Editor</h2>
        <p className="text-white/40 text-sm">Manage page content across the site.</p>
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className="text-white/40" data-testid="text-no-content">No content entries found.</p>
      )}

      {Object.entries(grouped).map(([page, items]) => (
        <Card key={page} className="bg-[#111] border-white/10">
          <CardHeader>
            <CardTitle className="text-white capitalize" data-testid={`text-page-${page}`}>{page}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item: any) => {
              const key = getEditKey(item);
              const isOpen = expanded[key];
              return (
                <div key={key} className="border border-white/5 rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      toggleExpand(key);
                      if (!editValues[key]) {
                        setEditValues((prev) => ({ ...prev, [key]: JSON.stringify(item.content, null, 2) }));
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
                    data-testid={`button-expand-${key}`}
                  >
                    <span className="text-sm font-medium text-white/80">{item.sectionKey}</span>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 space-y-3">
                      <Textarea
                        value={editValues[key] || ""}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="bg-black/50 border-white/10 text-white font-mono text-sm min-h-[200px]"
                        data-testid={`textarea-content-${key}`}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSave(item)}
                        disabled={saveMutation.isPending}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        data-testid={`button-save-${key}`}
                      >
                        <Save className="w-3.5 h-3.5 mr-1.5" />
                        {saveMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
