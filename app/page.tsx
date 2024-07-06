import SnakeGrid from "@/components/SnakeGrid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mt-0">Snake Game</h1>
      <SnakeGrid/>
    </main>
  );
}