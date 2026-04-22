// src/pages/BlogPage.jsx - Fully Working
import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// React Icons - Verified working exports
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaHeart, 
  FaRegHeart,
  FaBookmark, 
  FaRegBookmark, 
  FaShareAlt, 
  FaSearch, 
  FaClock, 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaComment, 
  FaArrowLeft, 
  FaChevronRight, 
  FaLink,
  FaChartLine  // ✅ Alternative to FaTrendingUp
} from 'react-icons/fa';

// --- Blog Data ---
const CATEGORIES = ["All", "Architecture", "Design", "Business", "Soil Testing", "Survey", "Construction", "Engineering"];
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Minimalist Architecture in 2026",
    slug: "future-of-minimalist-architecture-2026",
    category: "Architecture",
    author: {
      name: "Ar. Alex Rivers",
      avatar: "https://ui-avatars.com/api/?name=Alex+Rivers&background=2d62d4&color=fff",
      bio: "Senior Architect with 15+ years of experience in sustainable design",
      role: "Lead Architect"
    },
    date: "2026-04-12",
    readTime: "6 min",
    excerpt: "Discover how minimalist architecture is evolving with sustainable materials and smart technology integration...",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600",
    content: `
      <p>Minimalist architecture has come a long way from the stark, cold spaces of the past. Today's minimalism embraces warmth, sustainability, and technology.</p>
      
      <h2>The Evolution of Minimalist Design</h2>
      <p>What started as a reaction to ornate Victorian architecture has evolved into a sophisticated design philosophy that prioritizes function, sustainability, and human comfort.</p>
      
      <h3>Key Trends in 2026</h3>
      <ul>
        <li>Biophilic integration - bringing nature indoors</li>
        <li>Smart home technology seamlessly hidden</li>
        <li>Sustainable materials like bamboo and recycled steel</li>
        <li>Passive solar design for energy efficiency</li>
      </ul>
      
      <p>The future of minimalist architecture lies in creating spaces that are not just visually appealing but also environmentally responsible and technologically advanced.</p>
    `,
    tags: ["Architecture", "Minimalism", "Sustainability"],
    likes: 234,
    comments: 45,
    views: 1250
  },
  {
    id: 2,
    title: "Soil Testing Methods for High-Rise Buildings",
    slug: "soil-testing-methods-high-rise-buildings",
    category: "Soil Testing",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=10b981&color=fff",
      bio: "Geotechnical Engineer with PhD in Soil Mechanics",
      role: "Senior Geotechnical Engineer"
    },
    date: "2026-04-10",
    readTime: "8 min",
    excerpt: "Essential soil investigation techniques for ensuring foundation stability in skyscrapers...",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600",
    content: "<p>Comprehensive guide to soil testing for tall buildings...</p>",
    tags: ["Soil Testing", "Geotechnical", "Foundation"],
    likes: 189,
    comments: 32,
    views: 890
  },
  {
    id: 3,
    title: "Modern Construction Project Management",
    slug: "modern-construction-project-management",
    category: "Construction",
    author: {
      name: "Michael Torres",
      avatar: "https://ui-avatars.com/api/?name=Michael+Torres&background=f59e0b&color=fff",
      bio: "PMP Certified Project Manager",
      role: "Project Director"
    },
    date: "2026-04-08",
    readTime: "10 min",
    excerpt: "Leveraging technology for efficient construction project delivery...",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600",
    content: "<p>Modern project management techniques...</p>",
    tags: ["Construction", "Project Management", "Technology"],
    likes: 312,
    comments: 67,
    views: 2100
  },
  {
    id: 4,
    title: "Sustainable Urban Design Principles",
    slug: "sustainable-urban-design-principles",
    category: "Design",
    author: {
      name: "Emma Watson",
      avatar: "https://ui-avatars.com/api/?name=Emma+Watson&background=8b5cf6&color=fff",
      bio: "Urban Design Specialist",
      role: "Urban Planner"
    },
    date: "2026-04-05",
    readTime: "7 min",
    excerpt: "Creating livable, eco-friendly cities for future generations...",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600",
    content: "<p>Urban design principles...</p>",
    tags: ["Urban Design", "Sustainability", "Planning"],
    likes: 267,
    comments: 41,
    views: 1560
  }
];

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Blog Card Component
const BlogCard = ({ post, onClick }) => (
  <motion.article 
    whileHover={{ y: -8 }}
    onClick={() => onClick(post)}
    className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <div className="flex items-center gap-1">
          <FaCalendarAlt size={12} />
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaClock size={12} />
          <span>{post.readTime} read</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {post.author.name}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1 text-xs">
            <FaHeart size={12} /> {post.likes}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <FaComment size={12} /> {post.comments}
          </span>
        </div>
      </div>
    </div>
  </motion.article>
);

// Main Blog Component
const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const recentPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = selectedPost?.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <>
      <Helmet>
        <title>{selectedPost ? `${selectedPost.title} | BCC Blog` : "Engineering Insights | BCC Blog"}</title>
        <meta name="description" content={selectedPost?.excerpt || "Expert insights on architecture, engineering, construction, and design"} />
      </Helmet>

      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
        
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            // Blog Listing Page
            <motion.div 
              key="list" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
                  <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-6">
                  <motion.div 
                    initial={{ y: 30, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.2 }}
                    className="text-center max-w-3xl mx-auto"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                      <FaChartLine size={16} />
                      <span className="text-sm font-semibold">Engineering Insights</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                      Expert <span className="text-blue-400">Engineering</span> Blog
                    </h1>
                    <p className="text-xl text-slate-300">
                      Discover the latest trends, insights, and expertise from industry leaders
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Blog Feed */}
                  <div className="lg:col-span-8">
                    <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <div className="relative w-full sm:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.slice(0, 6).map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                              activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 text-sm text-slate-500">
                      Showing {filteredPosts.length} of {BLOG_POSTS.length} articles
                    </div>

                    {filteredPosts.length === 0 ? (
                      <div className="text-center py-20">
                        <p className="text-slate-500">No articles found. Try a different search term.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredPosts.map(post => (
                          <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <aside className="lg:col-span-4 space-y-8">
                    {/* Newsletter Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Subscribe to Newsletter</h3>
                      <p className="text-blue-100 text-sm mb-4">Get the latest engineering insights delivered to your inbox</p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Your email"
                          className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                          Subscribe
                        </button>
                      </div>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaClock className="text-blue-600" size={18} />
                        Recent Posts
                      </h3>
                      <div className="space-y-4">
                        {recentPosts.map(post => (
                          <div 
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="flex gap-3 cursor-pointer group"
                          >
                            <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1">{formatDate(post.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaTag className="text-blue-600" size={18} />
                        Popular Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["Architecture", "Engineering", "Construction", "Design", "Sustainability", "Soil Testing", "Project Management", "Urban Planning"].map(tag => (
                          <button
                            key={tag}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </motion.div>
          ) : (
            // Blog Detail Page
            <motion.article 
              key="detail" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 py-12"
            >
              <button 
                onClick={() => setSelectedPost(null)} 
                className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all"
              >
                <FaArrowLeft size={20} /> Back to all posts
              </button>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                <FaChevronRight size={12} />
                <Link to="/blog" className="hover:text-blue-600">Blog</Link>
                <FaChevronRight size={12} />
                <span className="text-slate-800 dark:text-slate-200">{selectedPost.category}</span>
              </div>

              <header className="mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-semibold">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt size={14} />
                    <span>{formatDate(selectedPost.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock size={14} />
                    <span>{selectedPost.readTime} read</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center justify-between py-6 border-t border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedPost.author.avatar} 
                      alt={selectedPost.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {selectedPost.author.name}
                      </div>
                      <div className="text-sm text-slate-500">{selectedPost.author.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-2 rounded-full transition-colors ${
                        isLiked ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    </button>
                    <button 
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-full transition-colors ${
                        isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      {isBookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <FaShareAlt size={20} />
                      </button>
                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-2 z-10">
                          <button onClick={() => handleShare('facebook')} className="flex items-center gap-2 w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                            <FaFacebook size={16} /> Facebook
                          </button>
                          <button onClick={() => handleShare('twitter')} className="flex items-center gap-2 w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                            <FaTwitter size={16} /> Twitter
                          </button>
                          <button onClick={() => handleShare('linkedin')} className="flex items-center gap-2 w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                            <FaLinkedin size={16} /> LinkedIn
                          </button>
                          <button onClick={copyToClipboard} className="flex items-center gap-2 w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                            <FaLink size={16} /> Copy Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              <div className="rounded-3xl overflow-hidden mb-12 shadow-xl">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-auto"
                />
              </div>

              <div 
                className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div className="flex flex-wrap gap-2 mb-12 pt-6 border-t border-slate-200 dark:border-slate-800">
                {selectedPost.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 mb-12">
                <div className="flex gap-4">
                  <img src={selectedPost.author.avatar} alt="" className="w-16 h-16 rounded-full" />
                  <div>
                    <h4 className="font-bold text-lg">{selectedPost.author.name}</h4>
                    <p className="text-sm text-slate-500 mb-2">{selectedPost.author.role}</p>
                    <p className="text-slate-600 dark:text-slate-300">{selectedPost.author.bio}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Never Miss an Update</h3>
                <p className="mb-4">Subscribe to our newsletter for the latest engineering insights</p>
                <div className="flex max-w-md mx-auto gap-2">
                  <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded-lg text-slate-900" />
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100 transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BlogPage;