export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  likes: number;
  created_at?: Date;
  updated_at?: Date;
};
