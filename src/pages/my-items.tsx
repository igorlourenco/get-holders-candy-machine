import { Heading, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { Layout } from "../components/common/layout";
import { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { NoiaButton } from "../components/common/noia-button";

export default function MyItems() {
  const [nfts, setNfts] = useState([]);

  if (nfts.length <= 0) {
    return (
      <Layout>
        <Stack py={24} spacing={8}>
          <Stack alignItems="center" spacing={16}>
            <Heading>Log in to view your NFTs</Heading>
            <NoiaButton px={4} onClick={() => {}}>
              Login
            </NoiaButton>
          </Stack>
        </Stack>
      </Layout>
    );
  }

  return (
    <Layout>
      <Stack paddingTop={16} spacing={8}>
        <Heading fontFamily="DM Sans" fontSize="2.5rem">
          My NFTs
        </Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={16}>
          {nfts.map((nft, index) => (
            <Stack key={index}>
              <Stack
                bgGradient="linear(to-tr, #0D0D0D, #353336)"
                py="5rem"
                px="2rem"
                borderRadius="10px"
              >
                {/* <Image src={nft.image} w="auto" /> */}
              </Stack>
              <Text
                fontSize="1.5rem"
                fontWeight="semibold"
                fontFamily="Poppins"
              >
                {/* {nft.name} */}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
        <Flex py="5rem">
          <Image src="/images/quack.svg" w="auto" />
        </Flex>
      </Stack>
    </Layout>
  );
}
