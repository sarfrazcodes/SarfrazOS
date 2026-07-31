import React, { Suspense } from "react";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import BlogCategories from "@/components/blog/BlogCategories";
import LatestArticles from "@/components/blog/LatestArticles";
import TrendingArticles from "@/components/blog/TrendingArticles";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import { getFeaturedBlog, getCategories, getLatestBlogs, getTrendingBlogs } from "@/lib/firebase/blog";

export const metadata = {
  title: 'Engineering Journal | SarfrazCodes',
  description: 'Thoughts, tutorials, project breakdowns, and lessons learned while building modern software.',
};

export default async function BlogPage() {
  const [featured, categories, latest, trending] = await Promise.all([
    getFeaturedBlog(),
    getCategories(),
    getLatestBlogs(),
    getTrendingBlogs()
  ]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#050505] overflow-x-hidden">
      
      {/* 1. Search & Filter Hero */}
      <BlogHero />
      
      {/* 2. Featured Article Block */}
      {featured && <FeaturedArticle blog={featured} />}
      
      {/* 3. Categories Grid */}
      <Suspense fallback={<div className="h-64" />}>
        <BlogCategories categories={categories} />
      </Suspense>

      {/* 4. Latest Articles Grid */}
      <Suspense fallback={<div className="h-96" />}>
        <LatestArticles blogs={latest} />
      </Suspense>

      {/* 5. Trending Articles Horizontal Scroll */}
      <Suspense fallback={<div className="h-96" />}>
        <TrendingArticles blogs={trending} />
      </Suspense>

      {/* 6. Newsletter Subscription */}
      <NewsletterCTA />

    </main>
  );
}
