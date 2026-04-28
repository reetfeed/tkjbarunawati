import { useGetMember, getGetMemberQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Quote } from "lucide-react";

export default function AnggotaDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  
  const { data: member, isLoading, isError } = useGetMember(id, { 
    query: { enabled: !!id, queryKey: getGetMemberQueryKey(id) } 
  });

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] pt-24 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <Skeleton className="w-32 h-10 mb-8" />
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !member) {
    return (
      <div className="min-h-[100dvh] pt-24 pb-20 bg-background flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Anggota tidak ditemukan</h2>
        <Link href="/anggota">
          <Button variant="outline">Kembali ke Daftar Anggota</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <Link href="/anggota">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-white -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary relative">
              {member.photoUrl ? (
                <img 
                  src={member.photoUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-muted-foreground/30">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <p className="text-primary font-medium tracking-widest uppercase mb-2">
                {member.role}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                {member.name}
              </h1>
              
              {member.quote && (
                <div className="relative pl-8 border-l-2 border-primary/50 py-2 my-8">
                  <Quote className="absolute top-0 left-[-11px] h-5 w-5 text-primary bg-background" />
                  <p className="text-xl text-muted-foreground italic font-serif">
                    "{member.quote}"
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {member.bio && (
                <section>
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Tentang</h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {member.bio}
                  </p>
                </section>
              )}

              {member.ambition && (
                <section>
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Cita-cita</h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {member.ambition}
                  </p>
                </section>
              )}

              {member.bestMemory && (
                <section>
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Kenangan Terbaik</h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {member.bestMemory}
                  </p>
                </section>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
