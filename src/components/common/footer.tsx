import { Stack, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Stack
      py={4}
      px={["1rem", "2rem", "4rem", "5rem"]}
      bgGradient="linear(to-r, #040608, #1A1F24)"
    >
      <Text fontFamily="Poppins">
        Copyright &copy; 2021. All rights reserved.
      </Text>
    </Stack>
  );
};
