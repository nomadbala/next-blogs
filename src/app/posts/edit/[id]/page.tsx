"use client";

import EditPostForm from "@/components/EditPostForm";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  if (!id || typeof id !== "string") {
    return <div>Invalid post ID</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white mt-4">Edit Post</h1>
      <EditPostForm postId={id} />
    </div>
  );
}
