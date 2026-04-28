import { useListMembers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AnggotaList() {
  const { data: members, isLoading } = useListMembers();

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Anggota Kelas</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Kenali lebih dekat keluarga besar kelas kita. Setiap dari kita memiliki cerita dan kenangan yang unik.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="w-full aspect-[3/4] rounded-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/anggota/${member.id}`}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="aspect-[3/4] relative overflow-hidden bg-secondary">
                        {member.photoUrl ? (
                          <img 
                            src={member.photoUrl} 
                            alt={member.name}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary">
                            <span className="text-4xl font-bold text-muted-foreground/30">{member.name.charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                          <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                            {member.role}
                          </p>
                          <h3 className="text-xl font-bold text-white line-clamp-1">{member.name}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
