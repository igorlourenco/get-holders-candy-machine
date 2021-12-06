
import { Stack, Text, Button } from "@chakra-ui/react";
import { Layout } from "../components/common/layout";
import { HoldersList } from "../components/common/holders-list";
import * as anchor from "@project-serum/anchor";

const rpcHost = "https://cool-winter-haze.solana-mainnet.quiknode.pro/4a52a079a306a036cd67383149f42bac92d3e7c9";
const connection = new anchor.web3.Connection(rpcHost);

export default function HoldersPage() {
  return (
    <Layout>
      <Stack alignItems="center" py={20} spacing={4}>
        <HoldersList connection={connection}/>
      </Stack>
    </Layout>
  );
}
