import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="query"
          type="text"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[250px]"
        />
        <Button variant="secondary">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;
