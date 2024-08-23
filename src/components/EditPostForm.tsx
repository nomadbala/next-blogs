"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface EditPostFormProps {
  postId: string;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      if (data.status === 200) {
        setTitle(data.data.title);
        setContent(data.data.content);
        setCurrentThumbnail(data.data.thumbnail);
        setTags(data.data.tags);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const thumbnailDataUrl = thumbnail ? await getBase64(thumbnail) : null;

    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
        thumbnail: thumbnailDataUrl || currentThumbnail,
        tags,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push(`/posts/${postId}`);
    } else {
      console.error("Failed to update post");
    }
  };

  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent adding space to the input
      if (newTag.trim() !== "") {
        setTags([...tags, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-xl"
      />
      <textarea
        placeholder="Content (Markdown supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-xl h-40"
      />
      <div>
        <p className="text-white">Current thumbnail:</p>
        <img
          src={currentThumbnail}
          alt="Current thumbnail"
          className="w-32 h-32 object-cover"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        className="block w-full text-sm text-white
        file:mr-4 file:py-2 file:px-4 file:rounded-xl
        file:border-0 file:text-sm file:font-semibold
        file:bg-blue-500 file:text-white hover:cursor-pointer hover:file:bg-blue-400 file:transition-all rounded-xl"
      />
      <div className="rounded-xl p-2 flex flex-wrap items-center">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="ml-2 text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Add tags"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="-none outline-none w-fit rounded-xl py-1 px-1"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPostForm;
