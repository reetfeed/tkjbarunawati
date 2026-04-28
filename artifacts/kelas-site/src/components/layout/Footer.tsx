import { useGetClassInfo } from "@workspace/api-client-react";
import { Link } from "wouter";

export function Footer() {
  const { data: classInfo } = useGetClassInfo();

  return (
    <footer className="border-t border-border/50 bg-background py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{classInfo?.className || "XII IPA 2"}</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            {classInfo?.motto || "Kenangan yang tak terlupakan dari masa SMA kita."}
          </p>
        </div>
        
        <div className="flex gap-6">
          <Link href="/anggota" className="text-sm text-muted-foreground hover:text-primary transition-colors">Anggota</Link>
          <Link href="/galeri" className="text-sm text-muted-foreground hover:text-primary transition-colors">Galeri</Link>
          <Link href="/kenangan" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kenangan</Link>
          <Link href="/pesan" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pesan</Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-12 text-center text-xs text-muted-foreground/50">
        &copy; {new Date().getFullYear()} {classInfo?.className || "XII IPA 2"}. Crafted with intention.
      </div>
    </footer>
  );
}
