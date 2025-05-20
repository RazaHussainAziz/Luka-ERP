import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";
function Home() {
  return (
    <main className="h-screen max-w-[1300px] mx-auto text-white flex items-center justify-center flex-col gap-5">
      <h1 className="text-center text-8xl font-extrabold tracking-tighter ">
        Luka
      </h1>
      <h3 className="text-center text-wrap text-lg tracking-tighter">
        A powerfull tool for SME's to manage sales, inventory, and profits — all
        in one place.
      </h3>
      <div className="text-center ">
        <NavLink to={"/signup"}>
          <Button className="bg-white cursor-pointer text-md  ">
            Try Luka {"  "}
            <ArrowRight />
          </Button>
        </NavLink>
      </div>
    </main>
  );
}

export default Home;
