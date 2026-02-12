import { Navbar, Footer } from "@/components/layout";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
};

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {isLoading ? (
        <div className="flex-1 pt-32 pb-16">
          <div className="container mx-auto px-6 max-w-4xl animate-pulse">
            <div className="h-4 bg-white/5 rounded w-24 mb-8" />
            <div className="h-10 bg-white/5 rounded w-3/4 mb-4" />
            <div className="h-4 bg-white/5 rounded w-1/3 mb-8" />
            <div className="h-64 bg-white/5 rounded-2xl mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        </div>
      ) : error || !post ? (
        <div className="flex-1 pt-32 pb-16">
          <div className="container mx-auto px-6 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <h1 className="text-4xl font-extrabold text-white mb-4" data-testid="text-blog-not-found">Post Not Found</h1>
              <p className="text-white/50 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
              <Link href="/blog">
                <motion.span
                  className="inline-flex items-center gap-2 text-red-400 font-semibold cursor-pointer hover:text-red-300 transition-colors"
                  whileHover={{ x: -4 }}
                  data-testid="link-back-to-blog"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      ) : (
        <article className="flex-1">
          {post.coverImage && (
            <motion.div
              className="relative pt-24 h-[40vh] md:h-[50vh] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                data-testid="img-blog-post-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/50 to-black/30" />
            </motion.div>
          )}

          <div className={`container mx-auto px-6 max-w-4xl ${post.coverImage ? "-mt-20 relative z-10" : "pt-32"}`}>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <Link href="/blog">
                  <motion.span
                    className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm cursor-pointer hover:text-red-300 transition-colors"
                    whileHover={{ x: -4 }}
                    data-testid="link-back-to-blog"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </motion.span>
                </Link>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
                data-testid="text-blog-post-title"
              >
                {post.title}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-6 text-sm text-white/50 mb-10 pb-8 border-b border-white/10"
              >
                <span className="flex items-center gap-2" data-testid="text-blog-post-author">
                  <User className="w-4 h-4 text-red-500" />
                  {post.authorName}
                </span>
                <span className="flex items-center gap-2" data-testid="text-blog-post-date">
                  <Calendar className="w-4 h-4 text-red-500" />
                  {formatDate(post.createdAt)}
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="prose prose-invert prose-lg max-w-none pb-20
                  prose-headings:text-white prose-headings:font-extrabold
                  prose-p:text-white/70 prose-p:leading-relaxed
                  prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300
                  prose-strong:text-white
                  prose-ul:text-white/70 prose-ol:text-white/70
                  prose-blockquote:border-red-500 prose-blockquote:text-white/60
                  prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="text-blog-post-content"
              />
            </motion.div>
          </div>
        </article>
      )}

      <Footer />
    </div>
  );
}
