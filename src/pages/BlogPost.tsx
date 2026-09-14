import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Layout from "@/components/Layout";
import { useSanity } from "@/hooks/use-sanity";
import { blogPostQuery, imageUrl } from "@/lib/sanity";
import { formatDate } from "./Blog";

type Post = {
  _id: string;
  title: string;
  excerpt?: string;
  coverImage?: unknown;
  publishedAt?: string;
  categories?: string[];
  authorName?: string;
  authorRole?: string;
  body?: PortableTextBlock[];
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/80 leading-relaxed mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="font-heading font-bold text-2xl md:text-3xl mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-heading font-bold text-xl mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-6 my-8 text-lg italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-6 text-foreground/80">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-foreground/80">{children}</ol>,
  },
  types: {
    image: ({ value }) => (
      <img
        src={imageUrl(value, "")}
        alt={(value as { alt?: string })?.alt || ""}
        className="rounded-2xl my-10 w-full border border-border"
        loading="lazy"
      />
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading: loading } = useSanity<Post>(`blogPost:${slug}`, blogPostQuery, { slug });

  return (
    <Layout>
      <article className="pt-40 pb-24 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10">
            <ArrowLeft size={14} /> All insights
          </Link>

          {loading && <p className="text-muted-foreground">Loading article...</p>}

          {!loading && !post && (
            <p className="text-muted-foreground">That article could not be found. It may have been unpublished.</p>
          )}

          {post && (
            <>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-5">
                {[formatDate(post.publishedAt), post.categories?.[0], post.authorName].filter(Boolean).join(" · ")}
              </div>
              <h1 className="display-heading text-4xl md:text-6xl leading-[1.05]">{post.title}</h1>
              {post.excerpt && <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>}

              {post.coverImage ? (
                <img
                  src={imageUrl(post.coverImage, "")}
                  alt={post.title}
                  className="rounded-3xl border border-border w-full my-12"
                />
              ) : (
                <div className="h-px bg-border my-12" />
              )}

              {post.body?.length ? (
                <div className="text-base md:text-lg">
                  <PortableText value={post.body} components={components} />
                </div>
              ) : (
                <p className="text-muted-foreground">This article has no content yet.</p>
              )}
            </>
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
