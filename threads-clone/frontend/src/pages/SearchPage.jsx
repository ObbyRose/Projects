import React, { useState } from "react";
import { Box, Input, Text, Link, Flex, Image, useColorMode, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdOutlineSettings, MdSearch } from "react-icons/md";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { colorMode } = useColorMode();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const response = await fetch(`/api/users/profile/${searchQuery}`, {
        method: "GET",
      });
      const data = await response.json();

      if (response.ok) {
        setSearchResults([data]);
      } else {
        setSearchResults([]);
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setSearchResults([]);
    }
  };

  return (
    <Flex direction="column" align="center" p={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdSearch size={24} color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          width="100%"
          maxWidth="500px"
          mb={4}
        />
      </InputGroup>
      {searchResults.length > 0 && (
        <Box
          w="100%"
          color={colorMode === "dark" ? "white" : "black"}
          zIndex="10"
          borderRadius="md"
          mt={2}
          maxH="300px"
          overflowY="auto"
          p={4}
        >
          {searchResults.map((user) => (
            <Link
              as={RouterLink}
              to={`/${user.username}`}
              key={user._id}
              p={2}
              display="flex"
              alignItems="center"
              _hover={{
                bg: colorMode === "dark" ? "gray.600" : "blue.200",
                transform: "scale(1.05)",
                transition: "transform 0.3s ease",
                borderRadius: "md"
              }}
            >
              <Image
                src={user.profilePic || "/default-avatar.png"}
                alt="Profile Picture"
                boxSize="50px"
                borderRadius="full"
                mr={3}
              />
              <Text>{user.username}</Text>
            </Link>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default SearchPage;
