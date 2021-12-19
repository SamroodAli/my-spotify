import { FC, useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {} from "swr";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: string }> = ({ modes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex justify="center" align="center" height="100px">
        hello
      </Flex>
      <Flex justify="center" align="center" height="calc(100% - 100px)">
        form
      </Flex>
    </Box>
  );
};

export default AuthForm;
