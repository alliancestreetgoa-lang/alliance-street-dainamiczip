import { Navbar, Footer } from "@/components/layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } }
};

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-3">
              Insights & Updates
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[0.95] tracking-tight" data-testid="text-blog-heading">
              Our Blog
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed max-w-2xl">
              Stay informed with the latest insights on accounting, tax compliance, and financial strategy for growing businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 overflow-hidden animate-pulse"
                  data-testid={`skeleton-blog-${i}`}
                >
                  <div className="h-48 bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-1/3" />
                    <div className="h-6 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-2/3" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : !posts || posts.length === 0 ? (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="text-center py-20"
              data-testid="text-blog-empty"
            >
              <p className="text-white/40 text-lg">No blog posts yet. Check back soon!</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={fadeUp}
                  data-testid={`card-blog-${post.id}`}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <motion.div
                      className="rounded-2xl border border-white/10 overflow-hidden cursor-pointer group h-full flex flex-col bg-white/[0.02]"
                      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                      data-testid={`link-blog-${post.slug}`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            data-testid={`img-blog-cover-${post.id}`}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-600/30 via-red-500/10 to-transparent" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                          <span className="flex items-center gap-1.5" data-testid={`text-blog-author-${post.id}`}>
                            <User className="w-3 h-3" />
                            {post.authorName}
                          </span>
                          <span className="flex items-center gap-1.5" data-testid={`text-blog-date-${post.id}`}>
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors" data-testid={`text-blog-title-${post.id}`}>
                          {post.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed flex-1" data-testid={`text-blog-excerpt-${post.id}`}>
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-red-400 text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
