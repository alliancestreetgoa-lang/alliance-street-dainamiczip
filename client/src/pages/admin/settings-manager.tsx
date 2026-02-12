import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

export default function SettingsManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const res = await fetch("/api/admin/settings", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const saveMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast({ title: "Saved", description: "Setting updated successfully" });
    },
    onError: () => toast({ title: "Error", description: "Failed to save setting", variant: "destructive" }),
  });

  if (isLoading) {
    return <div className="flex items-center gap-2 text-white/50"><Loader2 className="w-4 h-4 animate-spin" /> Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1" data-testid="text-settings-heading">Site Settings</h2>
        <p className="text-white/40 text-sm">Manage global site settings.</p>
      </div>

      {(settings || []).length === 0 && (
        <p className="text-white/40" data-testid="text-no-settings">No settings found.</p>
      )}

      <div className="space-y-3">
        {(settings || []).map((setting: any) => (
          <Card key={setting.id} className="bg-[#111] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-40">
                  <span className="text-sm font-medium text-white/80" data-testid={`text-setting-key-${setting.key}`}>{setting.key}</span>
                </div>
                <Input
                  value={editValues[setting.key] ?? setting.value}
                  onChange={(e) => setEditValues((prev) => ({ ...prev, [setting.key]: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white flex-1"
                  data-testid={`input-setting-${setting.key}`}
                />
                <Button
                  size="sm"
                  onClick={() =>
                    saveMutation.mutate({
                      key: setting.key,
                      value: editValues[setting.key] ?? setting.value,
                    })
                  }
                  disabled={saveMutation.isPending}
                  className="bg-red-600 hover:bg-red-700 text-white shrink-0"
                  data-testid={`button-save-setting-${setting.key}`}
                >
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
