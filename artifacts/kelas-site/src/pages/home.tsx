import { useGetClassInfo } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import heroGroupImg from "@/assets/images/hero-group.jpg";

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
          <div className="absolute inset-0 bg-background/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10" />
          <img
            src={heroGroupImg}
            alt="Class Group"
            className="w-full h-full object-cover object-center opacity-100"
          />
        </div>

        {/* Content */}
        <div className="container relative z-20 px-4 md:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium tracking-widest uppercase mb-6 text-[#5e95e0]">
              Angkatan {classInfo?.year || "2023/2026"}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {classInfo?.className || "XII TKJ"}
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-10 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            "
            {classInfo?.motto ||
              "Bersama kita ukir kenangan, bersama kita raih impian."}
            "
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/anggota">
              <Button
                size="lg"
                className="bg-[#549fffd1] text-primary-foreground hover:bg-primary/90 min-w-[200px] h-14 text-base"
              >
                Lihat Anggota
              </Button>
            </Link>
            <Link href="/galeri">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary min-w-[200px] h-14 text-base"
              >
                Jelajahi Galeri
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
