"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogIn, UserPlus, LogOut } from "lucide-react";

export function DropdownMenuDemo() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            id="nav-menu-trigger"
            size="icon"
            variant="outline"
            className="h-15 w-15 rounded-2xl bg-yellow-50 shadow-xl"
          >
            <Menu size={30} />
          </Button>
        }
      />
      <DropdownMenuContent className="w-44 bg-yellow-50" align="start">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            id="nav-login"
            className="cursor-pointer gap-2"
            onClick={() => router.push("/login")}
          >
            <LogIn size={14} />
            Sign in
          </DropdownMenuItem>
          <DropdownMenuItem
            id="nav-signup"
            className="cursor-pointer gap-2"
            onClick={() => router.push("/signup")}
          >
            <UserPlus size={14} />
            Create account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            id="nav-logout"
            className="cursor-pointer gap-2 text-red-500 focus:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={14} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
