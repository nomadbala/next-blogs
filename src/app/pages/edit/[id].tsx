import EditPostForm from "@/components/EditPostForm";
import { useRouter } from "next/router";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return <div>Invalid post ID</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <EditPostForm postId={id} />
    </div>
  );
}
