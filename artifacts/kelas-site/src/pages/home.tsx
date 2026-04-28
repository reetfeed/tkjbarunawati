import { useGetClassInfo } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Image as ImageIcon, MessageSquare, Calendar } from "lucide-react";
import heroGroupImg from "@/assets/images/hero-group.png";

export default function Home() {
  const { data: classInfo, isLoading } = useGetClassInfo();

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] pt-20">
        <Skeleton className="w-full h-[70vh]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 md:bg-background/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <img 
            src={heroGroupImg} 
            alt="Class Group" 
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>

        {/* Content */}
        <div className="container relative z-20 px-4 md:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium tracking-widest uppercase mb-6">
              Angkatan {classInfo?.year || "2024/2025"}
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {classInfo?.className || "XII IPA 2"}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-10 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            "{classInfo?.motto || "Cerita yang tidak akan pernah usai."}"
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/anggota">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[200px] h-14 text-base">
                Lihat Anggota
              </Button>
            </Link>
            <Link href="/galeri">
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary min-w-[200px] h-14 text-base">
                Jelajahi Galeri
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background relative z-10 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Users />} value={classInfo?.memberCount?.toString() || "36"} label="Anggota Kelas" delay={0} />
            <StatCard icon={<ImageIcon />} value="120+" label="Foto Kenangan" delay={0.1} />
            <StatCard icon={<Calendar />} value="3" label="Tahun Bersama" delay={0.2} />
            <StatCard icon={<MessageSquare />} value="50+" label="Pesan Ditinggalkan" delay={0.3} />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-3 bg-primary/10 rounded-xl text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}
