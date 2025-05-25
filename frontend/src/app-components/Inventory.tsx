import { SidebarTrigger } from "@/components/ui/sidebar";

function Inventory() {
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger className="-ml-2" />
        <div className="font-semibold">Inventory</div>
      </header>
      <main className="supports-[]:">

      </main>
    </>
  );
}

export default Inventory;
