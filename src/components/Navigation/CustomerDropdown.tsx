"use client";
import { User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Customer } from "@putiikkipalvelu/storefront-sdk";
import { logout } from "@/lib/actions/authActions";

const CustomerDropdown = ({ user }: { user: Customer | null }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-whisper-pink/50 transition-colors duration-300"
        >
          <User size={24} className="text-midnight" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-soft-ivory/98 backdrop-blur-md border border-stone/10"
        sideOffset={5}
      >
        {user ? (
          <>
            <DropdownMenuLabel className="text-midnight font-secondary">
              Tervetuloa {user.firstName}!
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href="/mypage"
                className="text-midnight/80 hover:text-blush transition-colors"
              >
                Oma sivu
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form
                action={() => {
                  logout();
                }}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto text-midnight/80 hover:text-blush hover:bg-transparent"
                >
                  Kirjaudu ulos
                </Button>
              </form>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/login"
                className="text-midnight/80 hover:text-blush transition-colors"
              >
                Kirjaudu
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/register"
                className="text-blush hover:text-blush/80 transition-colors"
              >
                Rekisteroidy
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerDropdown;
