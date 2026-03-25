export default function TrackerLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-6 w-64 bg-white/20 rounded-full mb-4" />
          <div className="h-10 w-96 bg-white/20 rounded-lg mb-2" />
          <div className="h-5 w-72 bg-white/15 rounded-lg" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-7 w-40 bg-gray-200 rounded-full" />
          <div className="h-5 w-32 bg-gray-100 rounded" />
        </div>
        <div className="flex gap-2 mb-6">
          <div className="h-9 w-24 bg-gray-200 rounded-xl" />
          <div className="h-9 w-24 bg-gray-100 rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 px-5 py-4 border-b border-gray-50">
              <div className="h-5 w-20 bg-gray-100 rounded" />
              <div className="h-5 w-24 bg-gray-100 rounded" />
              <div className="h-5 w-24 bg-gray-100 rounded" />
              <div className="h-5 w-24 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
