import { Stack, Text, Flex, Image } from "@chakra-ui/react";
import { NoiaButton } from "../common/noia-button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { getCandyMachineState } from "../../utils/candy-machine";

export const Hero = (props: any) => {
  const router = useRouter();
  const wallet = useAnchorWallet();
  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { itemsAvailable, itemsRemaining, itemsRedeemed } =
        await getCandyMachineState(
          wallet as anchor.Wallet,
          props.candyMachineId,
          props.connection
        );

      setItemsAvailable(itemsAvailable);
      setItemsRedeemed(itemsRedeemed);
    }
    if (!wallet) return;

    fetchData();
  }, [wallet]);

  return (
    <Flex
      alignItems="flex-start"
      justifyContent="space-between"
      flexDir={["column", "column", "row", "row"]}
    >
      <Stack
        spacing={16}
        justifyContent="space-between"
        w={["100%", "100%", "50%", "50%"]}
      >
        <Stack pt={16} alignItems="flex-start" spacing={2}>
          <Stack spacing={0}>
            <Text fontWeight="500" fontSize="1.5rem">
              Discover Foton's NFTs
            </Text>
            <Text
              bgGradient="linear(to-l, #FB62F6, #974DFF)"
              bgClip="text"
              fontSize="3rem"
              fontWeight="bold"
            >
              NoiaDucks by Foton
            </Text>
          </Stack>
          <Stack>
            <Text color="mediumGray" mb={3}>
              Have you ever thought about acquiring an NFT where you can profit
              over the royalties?{" "}
              <Text as="span" color="white">
                With NoiaDucks you will profit from a 50% share of royalties!
              </Text>
            </Text>
            <Text color="mediumGray">
              Even better than that, in 2022, Foton will launch a cross-chain
              Ethereum-Solana NFT marketplace, where the holders will earn with
              profit shares of it
            </Text>
          </Stack>
          <Stack pt={2}>
            <NoiaButton onClick={() => router.push("#mint")}>
              I want to mint a NoiaDuck
            </NoiaButton>
          </Stack>
        </Stack>
        <Flex>
          <Stack
            pr="2rem"
            py="1.5rem"
            borderRightWidth="1.69px"
            borderRightStyle="solid"
            borderRightColor="#46485CB2"
          >
            <Text fontWeight="semibold" fontSize="1.5rem">
              1000
            </Text>
            <Text color="#8D8392" fontFamily="0.875">
              NoiaDucks
            </Text>
          </Stack>
          <Stack pl="2rem" py="1.5rem">
            <Text fontWeight="semibold" fontSize="1.5rem">
              {itemsRedeemed}
            </Text>
            <Text color="#8D8392" fontFamily="0.875">
              Already minted
            </Text>
          </Stack>
        </Flex>
      </Stack>

      <Image
        src="/images/hero.svg"
        alt="logo"
        w={["100%", "100%", "50%", "50%"]}
      />
    </Flex>
  );
};
