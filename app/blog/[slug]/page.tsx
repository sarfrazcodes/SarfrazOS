import React from "react";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/firebase/blog";
import ArticleHero from "@/components/blog/ArticleHero";
import ArticleContent from "@/components/blog/ArticleContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);
  
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: blog.seo?.metaTitle || `${blog.title} | SarfrazCodes`,
    description: blog.seo?.metaDescription || blog.excerpt,
    openGraph: {
      images: [blog.seo?.openGraphImage || blog.coverImage]
    }
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] selection:bg-brand-blue/30 selection:text-brand-blue">
      
      {/* Immersive Parallax Hero */}
      <ArticleHero blog={blog} />

      {/* Main Content Area with Sidebar and Reading Progress */}
      <ArticleContent blog={blog} />

    </main>
  );
}
