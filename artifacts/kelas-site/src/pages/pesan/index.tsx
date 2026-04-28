import { useListMessages, useCreateMessage } from "@workspace/api-client-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { MessageSquareQuote } from "lucide-react";

const formSchema = z.object({
  authorName: z.string().min(2, "Nama minimal 2 karakter"),
  content: z.string().min(5, "Pesan minimal 5 karakter").max(500, "Pesan maksimal 500 karakter"),
});

export default function Pesan() {
  const { data: messages, isLoading } = useListMessages();
  const createMessage = useCreateMessage();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorName: "",
      content: "",
    },
  });

  const mutateFnRef = useRef(createMessage.mutate);
  mutateFnRef.current = createMessage.mutate;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateFnRef.current({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Pesan terkirim!",
          description: "Terima kasih telah meninggalkan kenangan.",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      },
      onError: () => {
        toast({
          title: "Gagal mengirim pesan",
          description: "Silakan coba beberapa saat lagi.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Buku Tamu</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tinggalkan pesan, kesan, atau harapan untuk teman-teman dan kelas kita.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border p-6 md:p-8 rounded-2xl sticky top-28"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquareQuote className="text-primary h-5 w-5" />
              Tulis Pesan
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Nama Panggilan / Lengkap" 
                          {...field} 
                          className="bg-secondary/50 border-border focus-visible:ring-primary h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Tuliskan sesuatu..." 
                          className="min-h-[150px] bg-secondary/50 border-border focus-visible:ring-primary resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={createMessage.isPending}
                >
                  {createMessage.isPending ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Messages List */}
          <div className="space-y-6">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="p-6 bg-card border border-border rounded-2xl">
                  <Skeleton className="h-6 w-1/3 mb-4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))
            ) : messages?.length === 0 ? (
              <div className="p-12 text-center border border-border border-dashed rounded-2xl bg-card/50">
                <p className="text-muted-foreground text-lg mb-2">Jadilah yang pertama meninggalkan pesan!</p>
              </div>
            ) : (
              messages?.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 bg-card border border-border rounded-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-white">{msg.authorName}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
