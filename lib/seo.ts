import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

const defaultMetadata = {
  title: "SarfrazCodes | Software Engineer & AI Architect",
  description: "Personal OS and portfolio of Sarfraz, a passionate Software Engineer and AI Architect specializing in building scalable web applications.",
  image: "/og-image.png",
};

export function constructMetadata({
  title,
  description,
  image,
  icons = "/favicon.ico",
  noIndex = false,
  canonicalUrl,
}: SEOProps = {}): Metadata {
  return {
    title: title ? `${title} | SarfrazCodes` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    openGraph: {
      title: title ? `${title} | SarfrazCodes` : defaultMetadata.title,
      description: description || defaultMetadata.description,
      images: [
        {
          url: image || defaultMetadata.image,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | SarfrazCodes` : defaultMetadata.title,
      description: description || defaultMetadata.description,
      images: [image || defaultMetadata.image],
      creator: "@sarfrazcodes",
    },
    icons,
    metadataBase: new URL("https://sarfrazcodes.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
