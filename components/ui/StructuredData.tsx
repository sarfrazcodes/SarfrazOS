import React from "react";

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-defined JSON-LD Schemas

export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sarfraz",
  url: "https://sarfrazcodes.com",
  jobTitle: "Software Engineer",
  sameAs: [
    "https://github.com/sarfrazcodes",
    "https://linkedin.com/in/sarfrazcodes"
  ]
});

export const generateBlogPostingSchema = (blog: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: blog.title,
  image: blog.coverImage?.url,
  datePublished: blog.createdAt,
  dateModified: blog.updatedAt,
  author: {
    "@type": "Person",
    name: "Sarfraz",
    url: "https://sarfrazcodes.com"
  }
});
