const Loading = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
