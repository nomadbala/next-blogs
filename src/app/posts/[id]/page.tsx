"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { Post } from "@/types/post.types";

export default function PostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${id}`);
          if (!response.ok) throw new Error("Failed to fetch post");
          const data = await response.json();
          setPost(data.data);
        } catch (err) {
          setError("Failed to load post");
          console.error(err);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to like post");
      setPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    } catch (err) {
      setError("Failed to like post");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete post");
      router.push("/");
    } catch (err) {
      setError("Failed to delete post");
      console.error(err);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return <div className="text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="absolute top-4 left-4 text-gray-600 hover:text-white transition-all w-10 h-10 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12H3m0 0l6 6m-6-6l6-6"
          />
        </svg>
      </Link>

      <div className="mt-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden rounded-xl">
          <div className="relative h-96">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail as string}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            ) : (
              <div className="bg-gray-200 flex items-center justify-center w-full h-full rounded-t-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center mb-6">
              <button
                onClick={handleLike}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-4 shadow-md rounded-xl"
              >
                Like ({post.likes})
              </button>
              <Link
                href={`/posts/edit/${id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-4 shadow-md rounded-xl"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md rounded-xl"
              >
                Delete
              </button>
            </div>
            <div className="prose prose-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
