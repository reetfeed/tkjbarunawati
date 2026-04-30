import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  ClassInfo,
  MemberSummary,
  MemberDetail,
  GalleryPhoto,
  TimelineEvent,
  Message,
} from "@/lib/types";

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ─── Class Info ──────────────────────────────────────────────────────
export function useGetClassInfo() {
  return useQuery<ClassInfo>({
    queryKey: ["/api/class-info"],
    queryFn: () => apiFetch<ClassInfo>("/api/class-info"),
  });
}

// ─── Members ─────────────────────────────────────────────────────────
export function useListMembers() {
  return useQuery<MemberSummary[]>({
    queryKey: ["/api/members"],
    queryFn: () => apiFetch<MemberSummary[]>("/api/members"),
  });
}

export function useGetMember(id: number) {
  return useQuery<MemberDetail>({
    queryKey: ["/api/member", id],
    queryFn: () => apiFetch<MemberDetail>(`/api/member/${id}`),
    enabled: !!id,
  });
}

// ─── Gallery ─────────────────────────────────────────────────────────
export function useListGallery(params?: { category?: string }) {
  const url = params?.category
    ? `/api/gallery?category=${encodeURIComponent(params.category)}`
    : "/api/gallery";

  return useQuery<GalleryPhoto[]>({
    queryKey: ["/api/gallery", params?.category],
    queryFn: () => apiFetch<GalleryPhoto[]>(url),
  });
}

export function useListGalleryCategories() {
  return useQuery<string[]>({
    queryKey: ["/api/gallery-categories"],
    queryFn: () => apiFetch<string[]>("/api/gallery-categories"),
  });
}

// ─── Timeline ────────────────────────────────────────────────────────
export function useListTimeline() {
  return useQuery<TimelineEvent[]>({
    queryKey: ["/api/timeline"],
    queryFn: () => apiFetch<TimelineEvent[]>("/api/timeline"),
  });
}

// ─── Messages ────────────────────────────────────────────────────────
export function useListMessages() {
  return useQuery<Message[]>({
    queryKey: ["/api/messages"],
    queryFn: () => apiFetch<Message[]>("/api/messages"),
  });
}

export function useCreateMessage() {
  return useMutation({
    mutationFn: (data: { data: { authorName: string; content: string } }) =>
      apiFetch<Message>("/api/messages", {
        method: "POST",
        body: JSON.stringify(data.data),
      }),
  });
}
