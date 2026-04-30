// Type definitions matching the API response shapes

export interface ClassInfo {
  className: string;
  year: string;
  motto: string;
  memberCount: number;
}

export interface MemberSummary {
  id: number;
  name: string;
  role: string;
  photoUrl?: string;
  quote?: string;
}

export interface MemberDetail extends MemberSummary {
  bio?: string;
  ambition?: string;
  bestMemory?: string;
  additionalPhotos: string[];
}

export interface GalleryPhoto {
  id: number;
  imageUrl: string;
  caption?: string;
  category: string;
  takenAt?: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Message {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
}
