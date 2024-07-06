import SnakeGrid from "@/components/SnakeGrid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-1.5 bg-gray-100">
      <h1 className="text-4xl font-bold text-green-700 mb-5">🐍 Snake Game</h1>
      <SnakeGrid />
    </main>
  );
}
