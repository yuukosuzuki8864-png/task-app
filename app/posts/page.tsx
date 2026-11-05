// app/posts/page.tsx
export default async function PostsPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    const posts = await res.json();
  
    return (
      <div>
        <h1>投稿一覧</h1>
        <p>{posts.length}件の投稿を表示中</p>
        <ul className="space-y-4">
          {posts.map((post: { id: number; title: string; body: string }) => (
            <li key={post.id} className="border p-4 rounded">
              <h2 className="font-bold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }