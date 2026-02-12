import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  published: false,
  authorName: "Alliance Street",
  metaTitle: "",
  metaDescription: "",
};

export default function BlogManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyPost });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      const res = await fetch("/api/admin/blog", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
      toast({ title: "Created", description: "Blog post created" });
      resetForm();
    },
    onError: () => toast({ title: "Error", description: "Failed to create post", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
      toast({ title: "Updated", description: "Blog post updated" });
      resetForm();
    },
    onError: () => toast({ title: "Error", description: "Failed to update post", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
      toast({ title: "Deleted", description: "Blog post deleted" });
      setDeleteId(null);
    },
    onError: () => toast({ title: "Error", description: "Failed to delete post", variant: "destructive" }),
  });

  const resetForm = () => {
    setFormData({ ...emptyPost });
    setEditingPost(null);
    setShowForm(false);
  };

  const openEdit = (post: any) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || "",
      published: post.published,
      authorName: post.authorName || "Alliance Street",
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const togglePublish = (post: any) => {
    updateMutation.mutate({ id: post.id, data: { ...post, published: !post.published } });
  };

  if (isLoading) {
    return <div className="flex items-center gap-2 text-white/50"><Loader2 className="w-4 h-4 animate-spin" /> Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1" data-testid="text-blog-heading">Blog Manager</h2>
          <p className="text-white/40 text-sm">Create, edit, and manage blog posts.</p>
        </div>
        <Button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-red-600 hover:bg-red-700 text-white"
          data-testid="button-new-post"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Post
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#111] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{editingPost ? "Edit Post" : "New Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70">Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData((p) => ({
                        ...p,
                        title: e.target.value,
                        slug: editingPost ? p.slug : slugify(e.target.value),
                      }));
                    }}
                    className="bg-white/5 border-white/10 text-white"
                    required
                    data-testid="input-post-title"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white"
                    required
                    data-testid="input-post-slug"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Excerpt</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((p) => ({ ...p, excerpt: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white min-h-[80px]"
                  required
                  data-testid="input-post-excerpt"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData((p) => ({ ...p, content: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white min-h-[200px]"
                  required
                  data-testid="input-post-content"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Cover Image URL</Label>
                <Input
                  value={formData.coverImage}
                  onChange={(e) => setFormData((p) => ({ ...p, coverImage: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                  data-testid="input-post-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(v) => setFormData((p) => ({ ...p, published: v }))}
                  data-testid="switch-published"
                />
                <Label className="text-white/70">Published</Label>
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  data-testid="button-save-post"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" variant="ghost" onClick={resetForm} className="text-white/50" data-testid="button-cancel-post">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {(posts || []).length === 0 && (
          <p className="text-white/40" data-testid="text-no-posts">No blog posts yet.</p>
        )}
        {(posts || []).map((post: any) => (
          <Card key={post.id} className="bg-[#111] border-white/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate" data-testid={`text-post-title-${post.id}`}>{post.title}</h3>
                  {post.published ? (
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">Published</span>
                  ) : (
                    <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/20">Draft</span>
                  )}
                </div>
                <p className="text-sm text-white/40 truncate">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePublish(post)}
                  className="text-white/40 hover:text-white"
                  data-testid={`button-toggle-publish-${post.id}`}
                >
                  {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEdit(post)}
                  className="text-white/40 hover:text-white"
                  data-testid={`button-edit-post-${post.id}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteId(post.id)}
                  className="text-white/40 hover:text-red-400"
                  data-testid={`button-delete-post-${post.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-[#111] border-white/10 text-white">
          <DialogTitle>Confirm Delete</DialogTitle>
          <p className="text-white/60 text-sm">Are you sure you want to delete this post? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="text-white/50" data-testid="button-cancel-delete">
              Cancel
            </Button>
            <Button
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
