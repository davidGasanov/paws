import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild className="dark:bg-primary-foreground dark:text-primary">
        <Link href="/sign-in">
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }

  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex gap-2 items-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-full">
            <div className="items-center hidden md:flex">
              <Button
                variant="ghost"
                className="bg-gray-200 relative w-8 h-8 rounded-full md:ml-4 flex items-center justify-center dark:bg-primary-foreground"
              >
                {firstInitial}
              </Button>
            </div>
            <div className="items-center flex md:hidden w-full">
              <Button
                variant="ghost"
                className="bg-gray-200 relative w-full flex items-center justify-center"
              >
                <FaUser className="opacity-90" />
                {session?.user?.name}
              </Button>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href="/user/profile">User profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/user/orders">Order History</Link>
          </DropdownMenuItem>

          {session?.user?.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/admin/overview">Admin</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem className="p-0 mb-1">
            <form action={signOutUser} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="w-full py-4 px-2 h-4 justify-start"
              >
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
