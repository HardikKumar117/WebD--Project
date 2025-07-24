import { useStore } from "@/stores/AppStore";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { user, logout, searchTerm, setSearchTerm } = useStore();
  const navigate = useNavigate();

  return (
    <header>
      <div className="flex justify-between items-center p-4">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <Link to="/" className="text-xl font-bold">
                BlogVerse
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/create">Create Post</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {user ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
};
