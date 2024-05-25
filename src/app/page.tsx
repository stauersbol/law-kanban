import { Kanban } from "./_components/kanban";
import { TopBar } from "./_components/top-bar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-y-hidden bg-gray-800">
      <TopBar />
      <Kanban />
    </main>
  );
}
