import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RollButton } from './RollButton';
import { POSTS, BlogPost, formatPostDate } from '../data/posts';
import { formatViews, recordView, useViewCounts } from '../lib/views';
import { goToBlog, goToPost } from '../lib/nav';

// Cover pictures load automatically from src/assets/blog/<slug>.jpg (or .jpeg/.png/.webp)
const COVER_FILES = import.meta.glob('../assets/blog/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const COVERS: Record<string, string> = Object.fromEntries(
  Object.entries(COVER_FILES).map(([path, url]) => [
    (path.split('/').pop() ?? '').replace(/\.[^.]+$/, ''),
    url,
  ])
);

interface SharedProps {
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

function PostMeta({ post, views }: { post: BlogPost; views?: number | null }) {
  return (
    <p className="text-[13px] text-gray-500 flex flex-wrap items-center gap-x-2">
      <span>{formatPostDate(post.date)}</span>
      <span aria-hidden="true">·</span>
      <span>{post.readMinutes} min read</span>
      {views != null && (
        <>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-gray-900 tabular-nums">{formatViews(views)} {views === 1 ? 'view' : 'views'}</span>
        </>
      )}
    </p>
  );
}

function PostCard({ post, views }: { post: BlogPost; views?: number | null }) {
  return (
    <article onClick={() => goToPost(post.slug)} className="group cursor-pointer">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/5 bg-gray-100">
        <img
          src={COVERS[post.slug]}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute bottom-5 left-5 h-9 w-9 group-hover:w-[158px] bg-gray-900 text-white rounded-full flex items-center pl-4 pr-[11px] overflow-hidden transition-all duration-300 ease-in-out shadow-sm">
          <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:delay-100">
            Read post
          </span>
          <span className="absolute right-[11px] top-1/2 -translate-y-1/2 flex items-center justify-center">
            <ArrowRight
              size={14}
              className="shrink-0 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
      <div className="mt-4">
        <PostMeta post={post} views={views} />
        <h3 className="mt-2 text-[18px] sm:text-[20px] font-semibold leading-snug tracking-[-0.01em] text-gray-900 group-hover:text-[#0400F5] transition-colors">
          {post.title}
        </h3>
      </div>
    </article>
  );
}

export function BlogPage({ onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: SharedProps) {
  const [counts] = useViewCounts();

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      <section className="bg-white pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-gray-900 mb-10 sm:mb-14">
            Blog
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {POSTS.map((post) => (
              <PostCard key={post.slug} post={post} views={counts ? counts[post.slug] ?? 0 : null} />
            ))}
          </div>
        </div>
      </section>

      <Footer
        onNavigateHome={() => onNavigateHome()}
        onOpenInquiry={onOpenInquiry}
        onNavigateToProduct={(id) => onSelectProduct?.(id)}
        onNavigateToTeam={onNavigateToTeam}
      />
    </div>
  );
}

export function BlogPostPage({
  slug,
  onNavigateHome,
  onOpenInquiry,
  onNavigateToTeam,
  onSelectProduct,
}: SharedProps & { slug: string }) {
  const post = POSTS.find((p) => p.slug === slug);
  const [counts, setCount] = useViewCounts();

  useEffect(() => {
    if (!post) return;
    let cancelled = false;
    recordView(post.slug).then((n) => {
      if (!cancelled && n != null) setCount(post.slug, n);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.slug]);

  const more = POSTS.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      {!post ? (
        <section className="bg-white pt-16 pb-32">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] mb-6">Post not found</h1>
            <button type="button" onClick={goToBlog} className="inline-flex items-center gap-2 text-[14px] font-medium hover:text-[#0400F5] cursor-pointer">
              <ArrowLeft size={15} /> Back to the blog
            </button>
          </div>
        </section>
      ) : (
        <>
          <article className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <button
                type="button"
                onClick={goToBlog}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-[#0400F5] transition-colors mb-8 cursor-pointer min-h-[40px]"
              >
                <ArrowLeft size={15} />
                <span>All posts</span>
              </button>

              <div className="max-w-4xl">
                <PostMeta post={post} views={counts ? counts[post.slug] ?? null : null} />
                <h1 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.03em] text-gray-900 text-balance">
                  {post.title}
                </h1>
              </div>

              <div className="mt-10 sm:mt-12 relative aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-black/5 bg-gray-100">
                <img src={COVERS[post.slug]} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="mt-10 sm:mt-14 max-w-2xl space-y-5 text-[16px] sm:text-[18px] text-gray-700 leading-[1.75]">
                {post.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-12 sm:mt-16 rounded-2xl bg-[#F5F5F5] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl">
                <h2 className="text-[22px] sm:text-[28px] font-medium leading-tight tracking-[-0.02em] text-gray-900">
                  Want this for your business?
                </h2>
                <RollButton
                  label="Talk to us"
                  variant="orange"
                  size="hero"
                  onClick={() => onOpenInquiry(`Blog: ${post.title}`)}
                />
              </div>
            </div>
          </article>

          <section className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-8 sm:mb-12">
                More posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {more.map((p) => (
                  <PostCard key={p.slug} post={p} views={counts ? counts[p.slug] ?? 0 : null} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer
        onNavigateHome={() => onNavigateHome()}
        onOpenInquiry={onOpenInquiry}
        onNavigateToProduct={(id) => onSelectProduct?.(id)}
        onNavigateToTeam={onNavigateToTeam}
      />
    </div>
  );
}
