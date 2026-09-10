import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useSanity } from "@/hooks/use-sanity";
import { blogIndexQuery, imageUrl } from "@/lib/sanity";
import { bcAssets } from "@/assets/bc";

export type BlogListItem = {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: unknown;
  publishedAt?: string;
  categories?: string[];
  authorName?: string;
};

export const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

const Blog = () => {
  const { data, loading } = useSanity<BlogListItem[]>("blogIndex", blogIndexQuery);
  const posts = data ?? [];

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Insights</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            Engineering<br />
            <span className="text-primary">notes.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            Field notes, design thinking and technical commentary from the Bridge Craft team.
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow">
          {loading && <p className="text-muted-foreground">Loading articles...</p>}

          {!loading && posts.length === 0 && (
            <div className="border border-border rounded-3xl p-10 text-center bg-card/40">
              <p className="text-muted-foreground">
                No articles published yet. New Bridge Craft insights will appear here.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className="group border border-border rounded-3xl overflow-hidden bg-card/40 hover:border-primary/60 transition-colors flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={imageUrl(post.coverImage, bcAssets.marineBridgeSite)}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {[formatDate(post.publishedAt), post.categories?.[0]].filter(Boolean).join(" · ")}
                  </div>
                  <h2 className="font-heading font-bold text-xl leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                  )}
                  <span className="mt-auto pt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Read article <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
