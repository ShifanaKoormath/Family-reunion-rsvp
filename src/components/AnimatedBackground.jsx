export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full bg-pink-300 opacity-30 blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-blue-300 opacity-30 blur-[120px]" />

      <div className="absolute top-[40%] left-[40%] w-[350px] h-[350px] rounded-full bg-orange-300 opacity-20 blur-[120px]" />
    </div>
  );
}