import { Stack, StackProps } from "@chakra-ui/react";
import { Footer } from "./footer";
import { Header } from "./header";
import { SubFooterLanding } from "../landing/subfooter-landing";
import { useRouter } from "next/router";

export const Layout = ({ children, ...props }: StackProps) => {
  const router = useRouter();
  return (
    <>
      <Stack
        pt="1rem"
        px={["2rem", "2rem", "3rem", "4rem"]}
        {...props}
        minH="100vh"
      >
        <Header />
        {children}
      </Stack>
      <SubFooterLanding display={router.pathname === "/" ? "block" : "none"} />
      <Footer />
    </>
  );
};
