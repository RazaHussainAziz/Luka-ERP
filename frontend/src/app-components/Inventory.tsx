import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BoxClosed, PriceTag } from "@/icons/icons";
import { FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
function Inventory() {
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger className="ml-2" />
        <div className="font-semibold">Inventory</div>
      </header>
      <main className="my-5">
        <div className="text-center space-y-3">
          <h1 className="p-1 bg-white inline-block rounded-xl">
            <BoxClosed width={50} height={50} className="text-black" />
          </h1>
          <h1 className="md:text-4xl font-bold">Add New Product</h1>
          <span className="text-muted-foreground text-xl">
            Add a new item to your inventory with detailed information
          </span>
        </div>
        {/* Product Info from */}

        <form action="" className="my-10 space-y-10 mx-auto md:max-w-5xl">
          {/* section for basic info */}
          <section className="  rounded-2xl overflow-hidden bg-zinc-900  shadow-lg ">
            <div className="  bg-gradient-to-r from-blue-600 to-indigo-600 md:p-6 ">
              <h1 className="flex items-center gap-2 md:text-3xl font-bold">
                {" "}
                <FileText /> Basic Information
              </h1>
              <p className="text-gray-200">
                Enter the essential details about your product
              </p>
            </div>
            <div className=" mt-3 grid md:grid-cols-2 gap-10  md:p-6">
              <div className="space-y-3">
                <Label htmlFor="product" className="text-md">
                  Product Name *
                </Label>
                <Input
                  id="product"
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="code" className="text-md">
                  SKU / Product Code *
                </Label>
                <Input
                  id="code"
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="e.g., PRD-001"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="category" className="text-md">
                  Category *
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 ">
                    <SelectGroup id="category">
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="stationary">Stationary</SelectItem>
                      <SelectItem value="sport">Home & Garden</SelectItem>
                      <SelectItem value="pineapple">
                        Sports & Outdoors
                      </SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="brand" className="text-md">
                  Brand
                </Label>
                <Input
                  id="code"
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="Enter brand name"
                />
              </div>
            </div>
          </section>

          <section className=" rounded-2xl overflow-hidden  bg-zinc-900  shadow-lg  ">
            <div className="  bg-gradient-to-r from-emerald-600 to-teal-600 md:p-6 ">
              <h1 className="flex items-center gap-2 md:text-3xl font-bold">
                {" "}
                <PriceTag width={25} height={25} /> Price and Inventroy
              </h1>
              <p className="text-gray-200">Set pricing and stock information</p>
            </div>
            <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 gap-10  md:p-6">
              <div className="space-y-3">
                <Label htmlFor="cost" className="text-md">
                  Cost Price Rs. *
                </Label>
                <Input
                  id="cost"
                  type="number"
                  required
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="sell" className="text-md">
                  Sell Price Rs. *
                </Label>
                <Input
                  id="sell"
                  required
                  type="number"
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="quantity" className="text-md">
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  required
                  type="number"
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="0"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="stock" className="text-md">
                  Minimum Stock Level
                </Label>
                <Input
                  id="stock"
                  type="number"
                  className="bg-zinc-600/20 placeholder:text-zinc-500"
                  placeholder="0"
                />
              </div>
            </div>
          </section>
          <div className="text-center">
            <Button className="cursor-pointer">
              <BoxClosed />
              Add to Inventory
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Inventory;
