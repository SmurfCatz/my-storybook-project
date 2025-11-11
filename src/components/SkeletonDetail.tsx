// src/components/SkeletonDetail.tsx
export default function SkeletonDetail() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto">
      <div className="h-64 md:h-96 bg-gray-300 rounded-xl mb-6"></div>

      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-300 rounded-full w-20"></div>
          ))}
        </div>

        <div className="space-y-3 mt-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-gray-300 rounded ${i % 2 === 0 ? "w-full" : "w-5/6"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}