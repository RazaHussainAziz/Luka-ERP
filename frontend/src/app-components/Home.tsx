import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";
import {
  AnalyticsOutline,
  BoxClosed,
  Company,
  Github,
  InvoiceOutline,
  PersonWorker,
} from "@/icons/icons";
import MouseEffect from "./MouseEffect";
import { Separator } from "@/components/ui/separator";
function Home() {
  return (
    <>
      <MouseEffect />
      <nav className=" max-w-[1300px] mx-auto fixed top-0  left-0 z-50 right-0 backdrop-blur-md border-b border-white/10 py-5 px-3  rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Company /> Luka Inc.
          </h1>
          <NavLink to={"/solutions"}>Solutions</NavLink>
          <NavLink to={"/about-us"}>About Us</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <NavLink to={"https://github.com/RazaHussainAziz"} target="_blank">
            <Button variant={"ghost"} className="cursor-pointer ">
              <Github style={{ width: "20px", height: "20px" }} />
            </Button>
          </NavLink>

          <NavLink to={"githuburl"}>
            <Button variant={"ghost"} className="cursor-pointer ">
              Contact
            </Button>
          </NavLink>

          <NavLink to={"/login"}>
            {" "}
            <Button className="cursor-pointer">Log-In</Button>
          </NavLink>
        </div>
      </nav>
      <main className="h-screen max-w-[1300px] mx-auto text-white flex items-center justify-center flex-col ">
        <div className="space-y-4 flex justify-center flex-col items-center ">
          <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl  ">
            Innovate Faster with
            <br />
            Luka Inc.
          </h1>
          <h3
            className="text-center  px-4 text-xs max-w-[350px] leading-normal
          text-muted-foreground sm:text-md sm:max-w-[500px] md:text-xl md:max-w-[650px] "
          >
            Empowering businesses with cutting-edge software solutions. Manage
            inventory and employee from single place. Generate reports and
            invoices with single click.
          </h3>

          <Button size={"lg"} className="bg-white cursor-pointer  ">
            <NavLink
              to={"/signup"}
              className="flex items-center justify-center gap-3"
            >
              Explore Luka {"  "}
              <ArrowRight className=" h-4 w-4" />
            </NavLink>
          </Button>
        </div>
      </main>
      <section className="max-w-[1300px] mx-auto h-auto mb-35">
        <div className="text-center flex space-y-5 flex-col">
          <h1 className=" font-bold lg:text-6xl ">Cutting-Edge Solutions</h1>
          <span className=" text-muted-foreground lg:text-2xl ">
            Discover how{" "}
            <span className="bg-blue-700/30 px-3 py-1 text-white rounded-lg">
              Luka
            </span>{" "}
            can transform your business with our innovative technologies.
          </span>
        </div>
        <div className="mt-15 grid max-w-5xl mx-auto gap-8 px-5 md:grid-cols-2 ">
          <div className="bg-zinc-900 p-8 outline-1 flex flex-col outline-muted-foreground/50 rounded-md">
            <div className="flex items-center gap-3">
              <BoxClosed
                className="text-white"
                style={{ width: "35px", height: "35px" }}
              />{" "}
              <h1 className="text-xl font-bold"> Manage Inventory</h1>
            </div>
            <span className="mt-3 text-muted-foreground">
              Track, organize, and control your stock in real-time to ensure
              smooth operations.
            </span>
          </div>
          <div className="bg-zinc-900 p-8 outline-1 flex flex-col outline-muted-foreground/50 rounded-md">
            <div className="flex items-center gap-3">
              <PersonWorker
                className="text-white"
                style={{ width: "30px", height: "30px" }}
              />{" "}
              <h1 className="text-xl font-bold"> Manage Employee</h1>
            </div>
            <span className="mt-3  text-muted-foreground">
              Streamline employee records, roles, and performance to enhance
              productivity and team coordination.
            </span>
          </div>
          <div className="bg-zinc-900 p-8 outline-1 flex flex-col outline-muted-foreground/50 rounded-md">
            <div className="flex items-center gap-3">
              <InvoiceOutline
                className="text-white"
                style={{ width: "35px", height: "35px" }}
              />{" "}
              <h1 className="text-xl font-bold"> Generate Invoices</h1>
            </div>
            <span className="mt-3  text-muted-foreground">
              Create, manage, and send professional invoices quickly to ensure
              smooth and timely payments.
            </span>
          </div>
          <div className="bg-zinc-900 p-8 outline-1 flex flex-col outline-muted-foreground/50 rounded-md">
            <div className="flex items-center gap-3">
              <AnalyticsOutline
                className="text-white"
                style={{ width: "35px", height: "35px" }}
              />{" "}
              <h1 className="text-xl font-bold"> Real-time Analytics</h1>
            </div>
            <span className="mt-3  text-muted-foreground">
              Gain insights from data with real-time reports and trends to drive
              smarter business decisions.
            </span>
          </div>
        </div>
      </section>
      <Separator
        orientation="horizontal"
        className=" border-[1px] border-zinc-800/30"
      />
      <section className="">
        <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Ready to revolutionize your business?
          </h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Join <span className="underline underline-offset-3">Luka Inc.</span>{" "}
            to drive your digital transformation and stay ahead in the rapidly
            evolving tech landscape.
          </p>
          <NavLink to={"/signup"}>
            <Button size="lg" className="mt-4 cursor-pointer ">
              Get Started Today
            </Button>
          </NavLink>
        </div>
      </section>
      <Separator
        orientation="horizontal"
        className=" border-[1px] border-zinc-800/30"
      />
      <footer className="py-6">
        <p className="text-center texet-sm text-muted-foreground">
          © {new Date().getFullYear()} Luka, Inc. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;
