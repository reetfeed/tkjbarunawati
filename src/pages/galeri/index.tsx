import { useListGallery, useListGalleryCategories } from "@/lib/api";
import type { GalleryPhoto } from "@/lib/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Galeri() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
  };

  const { data: categories, isLoading: isLoadingCategories } = useListGalleryCategories();
  const { data: photos, isLoading: isLoadingPhotos } = useListGallery({ category: activeCategory });

  return (
    <div className="min-h-[100dvh] pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Galeri Kegiatan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-8">
            Kumpulan momen dan kenangan yang terabadikan dalam lensa.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(undefined)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === undefined
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-white"
              )}
            >
              Semua
            </button>
            {isLoadingCategories ? (
              <Skeleton className="w-24 h-9 rounded-full" />
            ) : (
              categories?.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-white"
                  )}
                >
                  {category}
                </button>
              ))
            )}
          </div>
        </motion.div>

        {/* Grid */}
        {isLoadingPhotos ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-xl" />
            ))}
          </div>
        ) : photos?.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground border border-border rounded-xl border-dashed">
            Belum ada foto di kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max">
            <AnimatePresence mode="popLayout">
              {photos?.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="aspect-square relative group overflow-hidden rounded-xl cursor-pointer bg-secondary"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {isVideoUrl(photo.imageUrl) ? (
                    <video
                      src={photo.imageUrl}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play().catch(() => { })}
                      onMouseOut={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    />
                  ) : (
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption || "Gallery photo"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-white font-medium truncate">{photo.caption}</p>
                    <p className="text-primary text-sm">{photo.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-[80vw] h-[90vh] p-0 bg-black/95 border-none shadow-2xl flex flex-col items-center justify-center">
          {selectedPhoto && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {isVideoUrl(selectedPhoto.imageUrl) ? (
                <video
                  src={selectedPhoto.imageUrl}
                  className="max-w-full max-h-[80vh] object-contain"
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.caption}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
              {selectedPhoto.caption && (
                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                  <p className="text-white text-lg">{selectedPhoto.caption}</p>
                  {selectedPhoto.takenAt && (
                    <p className="text-white/60 text-sm mt-1">{new Date(selectedPhoto.takenAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
