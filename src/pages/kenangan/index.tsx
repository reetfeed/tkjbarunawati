import { useListTimeline } from "@/lib/api";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Kenangan() {
  const { data: events, isLoading } = useListTimeline();

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Perjalanan Kita</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dari hari pertama hingga saat perpisahan, menyusuri kembali jejak langkah yang pernah kita lewati bersama.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2" />

          {isLoading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                  <div className="w-full md:w-1/2 pl-12 md:pl-8">
                    <Skeleton className="h-32 w-full rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-24">
              {events?.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className={`relative flex flex-col md:flex-row gap-8 w-full items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background shadow-[0_0_15px_rgba(0,0,238,0.5)] z-10" />
                    <div className="w-full md:w-1/2 hidden md:block" />
                    <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-card border border-border p-6 rounded-2xl hover:border-primary/30 transition-colors shadow-lg">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold tracking-widest mb-4">{event.date}</span>
                        <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">{event.description}</p>
                        {event.imageUrl && (
                          <div className="rounded-xl overflow-hidden mt-4 bg-secondary">
                            <img src={event.imageUrl} alt={event.title} className="w-full h-auto object-cover max-h-[300px] hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
