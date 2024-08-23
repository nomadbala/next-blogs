export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  created_at?: Date;
  updated_at?: Date;
  tags?: string[];
};
