import { FC, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import NextLink from "next/link";
import { User } from "@prisma/client";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await auth<(User & { error: string }) | { error: string }>(
      mode,
      {
        firstName,
        lastName,
        email,
        password,
      }
    );
    if (!response.error) {
      return router.push("/");
    }
    setError(response.error);
    setIsLoading(false);
  };

  const inverseMode = mode === "signin" ? "signup" : "signin";

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" height={60} width={60} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100% - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={!!error}>
              {mode === "signup" && (
                <>
                  <Input
                    value={firstName}
                    placeholder="firstName"
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    marginY="1rem"
                  />
                  <Input
                    value={lastName}
                    id="lastName"
                    placeholder="setLastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <Input
                value={email}
                id="email"
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                marginY="1rem"
              />
              <Input
                id="password"
                value={password}
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}

              <Button
                type="submit"
                bg="green.500"
                isLoading={isLoading}
                sx={{
                  "&:hover": {
                    bg: "green.400",
                  },
                }}
              >
                {mode}
              </Button>
              <NextLink href={`/${inverseMode}`} passHref>
                <Button
                  type="submit"
                  bg="green.500"
                  margin="1rem"
                  sx={{
                    "&:hover": {
                      bg: "green.400",
                    },
                  }}
                >
                  {inverseMode}
                </Button>
              </NextLink>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
