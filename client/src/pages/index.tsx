import type { NextPage } from "next";
import UserTable from "../common/components/UserTable";
import { Input, Center, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import useDebounce from "../common/hooks/useDebounce";

const Home: NextPage = () => {
  const [query, setQuery] = useState<string>("");
  const bg = useColorModeValue("white", "gray.800");
  const debouncedQuery: string = useDebounce<string>(query, 500);

  return (
    <>
      <Center>
        <Input
          variant="outline"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bg={bg}
          placeholder="Search by name..."
          size="lg"
          width="auto"
          _focus={{ background: bg }}
          mb="3"
        />
      </Center>
      <UserTable query={debouncedQuery} />
    </>
  );
};

export default Home;
