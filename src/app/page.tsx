import { Card } from "@/components/ui/card";
import Selector from "./Selector";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex items-start justify-center p-8 pt-32">
      <main className="w-full max-w-4xl">
          <Card className="border bg-primary p-8 shadow-lg">
            <Selector />
          </Card>
      </main>
    </div>
  );
}
