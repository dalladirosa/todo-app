function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-light-green border-t-transparent" />
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
