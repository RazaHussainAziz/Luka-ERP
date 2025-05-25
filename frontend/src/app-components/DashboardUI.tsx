import { SidebarTrigger } from "@/components/ui/sidebar";
function DashboardUI() {
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger className="-ml-2" />
        <div className="font-semibold">Dashboard</div>
      </header>
      <main className="flex-1 p-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <div className="text-sm font-medium text-muted-foreground">
                {
                  [
                    "Total Revenue",
                    "New Customers",
                    "Active Orders",
                    "Pending Orders",
                  ][i]
                }
              </div>
              <div className="mt-2 text-2xl font-bold">
                {["$45,231.89", "321", "54", "12"][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6">
              <div className="font-semibold">Overview</div>
            </div>
            <div className="aspect-[4/3] w-full bg-muted/20 p-6">
              Chart placeholder
            </div>
          </div>
          <div className="col-span-3 rounded-lg border bg-card">
            <div className="flex items-center justify-between p-6">
              <div className="font-semibold">Recent Orders</div>
            </div>
            <div className="px-6 pb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-muted"></div>
                    <div>
                      <div className="font-medium">Order #{1000 + i}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">
                    ${(Math.random() * 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardUI;
