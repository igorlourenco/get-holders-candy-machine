import { Flex, Image, Link, Text, Heading, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Connect from "./connect";

const MenuLink = ({ children, href, ...props }: LinkProps) => {
  return (
    <Link
      fontSize="md"
      textDecoration="none"
      textTransform="uppercase"
      href={href}
      _active={{ textDecoration: "none" }}
      _hover={{ textDecoration: "none" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const router = useRouter();

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex gridGap={2} alignItems="center">
        <Image
          src="/images/logo.png"
          h="2.5rem"
          onClick={() => router.push("/")}
          cursor="pointer"
        />
        <Heading
          as="p"
          pt="0.5rem"
          fontSize="1.5rem"
          fontWeight="semibold"
          fontFamily="Roboto Mono"
        >
          NoiaDucks
        </Heading>
      </Flex>
      <></>
      <></>
    </Flex>
  );
};
