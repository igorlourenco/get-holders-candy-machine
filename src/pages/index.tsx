import { Stack, Text, Button } from "@chakra-ui/react";
import { Layout } from "../components/common/layout";
import { HoldersList } from "../components/common/holders-list";
import * as anchor from "@project-serum/anchor";

const rpcHost = "https://bitter-ancient-violet.solana-mainnet.quiknode.pro/2a06d36e288a343cff964c14dde72a90b27c773c";
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
