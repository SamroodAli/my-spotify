import { FC, useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {} from "swr";
import NextImage from "next/image";
import NextLink from "next/link";
import { auth } from "../lib/mutations";

export enum Mode {
  signin = "signin",
  signup = "signup",
}

const AuthForm: FC<{ mode: Mode }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  const inverseMode = mode === Mode.signin ? Mode.signup : Mode.signin;

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
            {mode === Mode.signup && (
              <>
                <Input
                  value={firstName}
                  placeholder="firstName"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  marginY="1rem"
                />
                <Input
                  value={lastName}
                  placeholder="setLastName"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <Input
              value={email}
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginY="1rem"
            />
            <Input
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
