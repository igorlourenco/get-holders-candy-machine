import { Stack, Heading, Text, StackProps } from "@chakra-ui/layout";
import { NoiaButton } from "../common/noia-button";
import { useRouter } from "next/router";

export const SubFooterLanding = ({ ...props }: StackProps) => {
  const router = useRouter();
  return (
    <Stack
      bgRepeat="no-repeat"
      bgPosition="right top"
      bgSize="contain"
      backgroundImage="/images/subfooter.svg"
      {...props}
    >
      <Stack
        bgGradient="linear(to-r, #000, transparent)"
        py={[4, 8, 12, 16]}
        px={["1rem", "2rem", "4rem", "4rem"]}
        alignItems="flex-start"
        spacing={8}
      >
        <Heading
          fontSize="4xl"
          fontFamily="DM Sans"
          fontWeight="normal"
          w={["100%", "100%", "50%", "50%"]}
        >
          Get the NFTs from the{" "}
          <Text as="span" fontWeight="bold">
            world's hottest community!
          </Text>
        </Heading>
        <NoiaButton onClick={() => router.push("#mint")}>
          I want a NoiaDuck!
        </NoiaButton>
      </Stack>
    </Stack>
  );
};
