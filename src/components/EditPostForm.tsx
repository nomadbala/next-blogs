import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface EditPostFormProps {
  postId: string;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      if (data.status === 200) {
        setTitle(data.data.title);
        setContent(data.data.content);
        setCurrentThumbnail(data.data.thumbnail);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      router.push(`/${postId}`);
    } else {
      // Handle error
      console.error("Failed to update post");
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
      <div>
        <p>Current thumbnail:</p>
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
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPostForm;
