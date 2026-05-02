-- ============================================
-- Supabase RLS (Row Level Security) Setup
-- ============================================
-- Run this in Supabase Dashboard → SQL Editor
-- This fixes the "RLS Disabled in Public" error
-- ============================================

-- Step 1: Enable RLS on all tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policies for public read access
-- (Website ini publik, jadi semua orang bisa baca data)
CREATE POLICY "Allow public read access" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.timeline FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.messages FOR SELECT USING (true);

-- Step 3: Allow public insert on messages (untuk fitur kirim pesan/guestbook)
CREATE POLICY "Allow public insert" ON public.messages FOR INSERT WITH CHECK (true);
