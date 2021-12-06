import { Stack, Text, Button } from "@chakra-ui/react";
import { Layout } from "../components/common/layout";
import { HoldersList } from "../components/common/holders-list";
import * as anchor from "@project-serum/anchor";

const rpcHost = "https://solana-mainnet.phantom.tech";
const connection = new anchor.web3.Connection(rpcHost);

export default function HoldersPage() {
  return (
    <Layout>
      <Stack alignItems="center" py={20} spacing={4}>
        <HoldersList connection={connection} />
      </Stack>
    </Layout>
  );
}
