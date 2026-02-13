import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";

export default function ContactsView() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ["admin", "contacts"],
    queryFn: async () => {
      const res = await fetch("/api/admin/contacts", { credentials: "include" });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="flex items-center gap-2 text-white/50"><Loader2 className="w-4 h-4 animate-spin" /> Loading contacts...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1" data-testid="text-contacts-heading">Contact Submissions</h2>
        <p className="text-white/40 text-sm">View all contact form submissions.</p>
      </div>

      {(contacts || []).length === 0 && (
        <p className="text-white/40" data-testid="text-no-contacts">No contact submissions yet.</p>
      )}

      {(contacts || []).length > 0 && (
        <Card className="bg-[#111] border-white/10 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-white/50 w-8"></TableHead>
                  <TableHead className="text-white/50">Name</TableHead>
                  <TableHead className="text-white/50">Email</TableHead>
                  <TableHead className="text-white/50">Company</TableHead>
                  <TableHead className="text-white/50">Service</TableHead>
                  <TableHead className="text-white/50">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(contacts || []).map((contact: any) => (
                  <>
                    <TableRow
                      key={contact.id}
                      className="border-white/5 cursor-pointer hover:bg-white/5"
                      onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                      data-testid={`row-contact-${contact.id}`}
                    >
                      <TableCell className="text-white/40">
                        {expandedId === contact.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </TableCell>
                      <TableCell className="text-white font-medium" data-testid={`text-contact-name-${contact.id}`}>{contact.name}</TableCell>
                      <TableCell className="text-white/70">{contact.email}</TableCell>
                      <TableCell className="text-white/70">{contact.company}</TableCell>
                      <TableCell className="text-white/70">{contact.service}</TableCell>
                      <TableCell className="text-white/50 text-sm">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    {expandedId === contact.id && (
                      <TableRow key={`msg-${contact.id}`} className="border-white/5 bg-white/[0.02]">
                        <TableCell colSpan={6} className="p-4">
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Message</p>
                            <p className="text-white/70 text-sm leading-relaxed" data-testid={`text-contact-message-${contact.id}`}>
                              {contact.message || "No message provided."}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
