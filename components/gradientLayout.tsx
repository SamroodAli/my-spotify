import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, Skeleton, Stack } from "@chakra-ui/react";

const Gradientlayout = ({
  color,
  children,
  image,
  subtitle,
  isLoading,
  title,
  description,
  roundImage = false,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="#fff">
          <Text fontSize="sm" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Stack>
            <Skeleton
              isLoaded={!isLoading}
              startColor={`${color}.500`}
              endColor={`${color}.600`}
            >
              <Text fontSize="6xl">{title}</Text>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              startColor={`${color}.500`}
              endColor={`${color}.600`}
              height="20px"
            >
              <Text fontSize="small" fontWeight="100">
                {description}
              </Text>
            </Skeleton>
          </Stack>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default Gradientlayout;
