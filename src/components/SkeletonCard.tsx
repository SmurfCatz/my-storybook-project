export default function SkeletonCard() {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="h-48 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="flex gap-2 mt-3">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}