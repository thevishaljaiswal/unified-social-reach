 import { useState } from "react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Platform, User, Agent, Conversation, Message } from "@/types";
 import { Plus } from "lucide-react";
 
 interface NewTicketDialogProps {
   agents: Agent[];
   onCreateTicket: (conversation: Conversation, initialMessage: Message) => void;
 }
 
 export const NewTicketDialog = ({ agents, onCreateTicket }: NewTicketDialogProps) => {
   const [open, setOpen] = useState(false);
   const [customerName, setCustomerName] = useState("");
   const [customerEmail, setCustomerEmail] = useState("");
   const [customerPhone, setCustomerPhone] = useState("");
   const [platform, setPlatform] = useState<Platform>("whatsapp");
   const [status, setStatus] = useState<"open" | "pending" | "closed">("open");
   const [assignedAgentId, setAssignedAgentId] = useState<string>("");
   const [tags, setTags] = useState("");
   const [initialMessage, setInitialMessage] = useState("");
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     
     const newUser: User = {
       id: `user-${Date.now()}`,
       name: customerName,
       email: customerEmail || undefined,
       phone: customerPhone || undefined,
       platformIds: {
         facebook: platform === "facebook" ? `fb-${Date.now()}` : "",
         linkedin: platform === "linkedin" ? `li-${Date.now()}` : "",
         whatsapp: platform === "whatsapp" ? `wa-${Date.now()}` : "",
       },
     };
 
     const conversationId = `conv-${Date.now()}`;
     const messageId = `msg-${Date.now()}`;
     
     const newMessage: Message = {
       id: messageId,
       conversationId,
       content: initialMessage,
       timestamp: new Date(),
       senderId: newUser.id,
       isAgent: false,
       platform,
       read: false,
     };
 
     const newConversation: Conversation = {
       id: conversationId,
       user: newUser,
       platform,
       lastMessage: newMessage,
       unreadCount: 1,
       status,
       assignedTo: agents.find((a) => a.id === assignedAgentId),
       tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
     };
 
     onCreateTicket(newConversation, newMessage);
     
     // Reset form
     setCustomerName("");
     setCustomerEmail("");
     setCustomerPhone("");
     setPlatform("whatsapp");
     setStatus("open");
     setAssignedAgentId("");
     setTags("");
     setInitialMessage("");
     setOpen(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
         <Button size="sm">
           <Plus className="mr-2 h-4 w-4" />
           New Ticket
         </Button>
       </DialogTrigger>
       <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Create New Ticket</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="customerName">Customer Name *</Label>
               <Input
                 id="customerName"
                 value={customerName}
                 onChange={(e) => setCustomerName(e.target.value)}
                 placeholder="John Doe"
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="platform">Platform *</Label>
               <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                 <SelectTrigger>
                   <SelectValue placeholder="Select platform" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="facebook">Facebook</SelectItem>
                   <SelectItem value="linkedin">LinkedIn</SelectItem>
                   <SelectItem value="whatsapp">WhatsApp</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="customerEmail">Email</Label>
               <Input
                 id="customerEmail"
                 type="email"
                 value={customerEmail}
                 onChange={(e) => setCustomerEmail(e.target.value)}
                 placeholder="john@example.com"
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="customerPhone">Phone</Label>
               <Input
                 id="customerPhone"
                 type="tel"
                 value={customerPhone}
                 onChange={(e) => setCustomerPhone(e.target.value)}
                 placeholder="+1234567890"
               />
             </div>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="status">Status</Label>
               <Select value={status} onValueChange={(v) => setStatus(v as "open" | "pending" | "closed")}>
                 <SelectTrigger>
                   <SelectValue placeholder="Select status" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="open">Open</SelectItem>
                   <SelectItem value="pending">Pending</SelectItem>
                   <SelectItem value="closed">Closed</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="space-y-2">
               <Label htmlFor="assignedAgent">Assign To</Label>
               <Select value={assignedAgentId} onValueChange={setAssignedAgentId}>
                 <SelectTrigger>
                   <SelectValue placeholder="Select agent" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="">Unassigned</SelectItem>
                   {agents.map((agent) => (
                     <SelectItem key={agent.id} value={agent.id}>
                       {agent.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="tags">Tags (comma-separated)</Label>
             <Input
               id="tags"
               value={tags}
               onChange={(e) => setTags(e.target.value)}
               placeholder="support, urgent, billing"
             />
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="initialMessage">Initial Message *</Label>
             <Textarea
               id="initialMessage"
               value={initialMessage}
               onChange={(e) => setInitialMessage(e.target.value)}
               placeholder="Customer's initial message..."
               rows={4}
               required
             />
           </div>
 
           <div className="flex justify-end gap-2 pt-4">
             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
               Cancel
             </Button>
             <Button type="submit">Create Ticket</Button>
           </div>
         </form>
       </DialogContent>
     </Dialog>
   );
 };