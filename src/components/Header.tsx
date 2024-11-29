import { ThemeToggle } from "./theme-toggle";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex h-16 items-center gap-4 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                RapidDSA
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Question Bank</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-2"
          >
            Save
          </Button> */}
          <ThemeToggle />


          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Suspense>
              <UserButton />

            </Suspense>
          </Button>




        </div>
      </div>
    </header>
  );
};

export default Header;