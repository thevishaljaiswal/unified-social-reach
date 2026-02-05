 import { useState } from "react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Input } from "@/components/ui/input";
 import { Conversation, Message, Platform, Attachment } from "@/types";
 import { MessageCirclePlus, Paperclip, X } from "lucide-react";
 
 interface NewMessageDialogProps {
   conversation: Conversation;
   onSendMessage: (conversationId: string, content: string, attachments?: Attachment[]) => void;
 }
 
 export const NewMessageDialog = ({ conversation, onSendMessage }: NewMessageDialogProps) => {
   const [open, setOpen] = useState(false);
   const [content, setContent] = useState("");
   const [attachmentName, setAttachmentName] = useState("");
   const [attachmentUrl, setAttachmentUrl] = useState("");
   const [attachmentType, setAttachmentType] = useState<"image" | "video" | "document">("document");
   const [attachments, setAttachments] = useState<Attachment[]>([]);
 
   const handleAddAttachment = () => {
     if (attachmentName && attachmentUrl) {
       const newAttachment: Attachment = {
         id: `attach-${Date.now()}`,
         type: attachmentType,
         url: attachmentUrl,
         name: attachmentName,
       };
       setAttachments([...attachments, newAttachment]);
       setAttachmentName("");
       setAttachmentUrl("");
     }
   };
 
   const handleRemoveAttachment = (id: string) => {
     setAttachments(attachments.filter((a) => a.id !== id));
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!content.trim()) return;
     
     onSendMessage(conversation.id, content, attachments.length > 0 ? attachments : undefined);
     
     // Reset form
     setContent("");
     setAttachments([]);
     setOpen(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
         <Button variant="outline" size="sm">
           <MessageCirclePlus className="mr-2 h-4 w-4" />
           New Message
         </Button>
       </DialogTrigger>
       <DialogContent className="sm:max-w-[500px]">
         <DialogHeader>
           <DialogTitle>Send New Message to {conversation.user.name}</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
           <div className="space-y-2">
             <Label>Platform</Label>
             <div className="text-sm text-muted-foreground capitalize bg-secondary/50 px-3 py-2 rounded-md">
               {conversation.platform}
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="messageContent">Message Content *</Label>
             <Textarea
               id="messageContent"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder="Type your message..."
               rows={4}
               required
             />
           </div>
 
           {/* Attachments Section */}
           <div className="space-y-3">
             <Label>Attachments</Label>
             
             {/* Current attachments */}
             {attachments.length > 0 && (
               <div className="space-y-2">
                 {attachments.map((attachment) => (
                   <div
                     key={attachment.id}
                     className="flex items-center justify-between bg-secondary/30 px-3 py-2 rounded-md"
                   >
                     <div className="flex items-center gap-2">
                       <Paperclip className="h-4 w-4 text-muted-foreground" />
                       <span className="text-sm">{attachment.name}</span>
                       <span className="text-xs text-muted-foreground capitalize">({attachment.type})</span>
                     </div>
                     <Button
                       type="button"
                       variant="ghost"
                       size="sm"
                       onClick={() => handleRemoveAttachment(attachment.id)}
                     >
                       <X className="h-4 w-4" />
                     </Button>
                   </div>
                 ))}
               </div>
             )}
 
             {/* Add attachment form */}
             <div className="grid grid-cols-3 gap-2">
               <Input
                 placeholder="File name"
                 value={attachmentName}
                 onChange={(e) => setAttachmentName(e.target.value)}
               />
               <Input
                 placeholder="URL"
                 value={attachmentUrl}
                 onChange={(e) => setAttachmentUrl(e.target.value)}
               />
               <Select value={attachmentType} onValueChange={(v) => setAttachmentType(v as "image" | "video" | "document")}>
                 <SelectTrigger>
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="image">Image</SelectItem>
                   <SelectItem value="video">Video</SelectItem>
                   <SelectItem value="document">Document</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <Button
               type="button"
               variant="outline"
               size="sm"
               onClick={handleAddAttachment}
               disabled={!attachmentName || !attachmentUrl}
             >
               <Paperclip className="mr-2 h-4 w-4" />
               Add Attachment
             </Button>
           </div>
 
           <div className="flex justify-end gap-2 pt-4">
             <Button type="button" variant="outline" onClick={() => setOpen(false)}>
               Cancel
             </Button>
             <Button type="submit">Send Message</Button>
           </div>
         </form>
       </DialogContent>
     </Dialog>
   );
 };