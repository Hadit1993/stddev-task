export default interface Post {
  id: number;
  user_id: number;
  title: string;
  description: string;
  category: string;
  website?: string;
}
