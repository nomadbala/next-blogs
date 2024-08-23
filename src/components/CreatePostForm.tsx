import { useState } from "react";
import { useRouter } from "next/router";

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      router.push("/");
    } else {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <textarea
        placeholder="Content (Markdown supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-lg h-40"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
