import SnakeGrid from "@/components/SnakeGrid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black flex min-h-screen flex-col items-center justify-center p-1.5 ">
      <h1 className="text-center text-4xl font-bold text-[#ffcc66] mb-5">🐍 Snake Game</h1>
      <SnakeGrid />
    </main>
  );
}
