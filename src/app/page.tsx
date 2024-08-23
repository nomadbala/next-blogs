import { useState, useEffect } from "react";
import Link from "next/link";
import BlogGrid from "@/components/BlogGrid";
import SearchBar from "@/components/SearchBar";
import { Post } from "@/types/post.types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    if (data.status === 200) {
      setPosts(data.data);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link
          href="/create"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Create Post
        </Link>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-8">
        <BlogGrid posts={filteredPosts} />
      </div>
    </div>
  );
}
