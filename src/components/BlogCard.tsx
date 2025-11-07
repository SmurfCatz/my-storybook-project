
interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags?: string[];
  createdAt: string;
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  author,
  tags = [],
  createdAt,
}: BlogCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">

      <div className="p-4 flex-grow">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{excerpt}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-3 text-xs text-gray-500">
          เขียนโดย {author} •{" "}
          {new Date(createdAt).toLocaleDateString("th-TH")}
        </div>
      </div>
    </div>
  );
}
