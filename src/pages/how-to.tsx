import { Stack, Text, Link } from "@chakra-ui/react";
import { Layout } from "../components/common/layout";

export default function HowTo() {
  return (
    <Layout>
      <Stack alignItems="center" py={20} spacing={4}>
        <Stack maxWidth={["100vw", "90vw", "80vw", "70vw"]} spacing={8}>
          <Text fontSize="2rem">
            A guide to getting your{" "}
            <Text as="span" fontWeight="semibold">
              NoiaDuck
            </Text>
          </Text>
          <Stack spacing={3}>
            <Text fontSize="1.25rem">
              0. If you already have SOL in any Solana wallet, just go to{" "}
              <Link href="/#mint" color="lightGreen">
                the minting page
              </Link>{" "}
              and mint your NoiaDuck!{" "}
            </Text>
            <Text fontSize="1.25rem">
              1. Download your Solana wallet from{" "}
              <Link href="https://phantom.app/" isExternal color="lightGreen">
                phantom.app
              </Link>
              .
            </Text>
            <Stack>
              <Text fontSize="1.25rem">
                2. Now go to{" "}
                <Link href="https://binance.com" isExternal color="lightGreen">
                  binance.com
                </Link>{" "}
                and buy your cryptocurrencies to mint the NoiaDucks.
              </Text>
              <Stack px={5}>
                <Text fontSize="1.125rem">
                  a. Follow{" "}
                  <Link
                    href="https://www.binance.com/pt-BR/fiat/deposit/USD"
                    isExternal
                    color="lightGreen"
                  >
                    this link
                  </Link>{" "}
                  to deposit FIAT (your country's currency) to buy some SOL. we
                  recommend that you deposit the amount equivalent to 1.1 SOL,
                  to pay the transaction fees.
                </Text>
                <Text fontSize="1.125rem">
                  b.{" "}
                  <Link
                    href="https://www.binance.com/pt-BR/convert"
                    color="lightGreen"
                    isExternal
                  >
                    Here
                  </Link>{" "}
                  you can trade your FIAT for SOL.
                </Text>
                <Text fontSize="1.125rem">
                  c. Now, if you go to{" "}
                  <Link
                    href="https://www.binance.com/pt-BR/my/wallet/account/main"
                    color="lightGreen"
                    isExternal
                  >
                    your wallet on Binance
                  </Link>{" "}
                  you can see your SOL balance. Click on WITHDRAW to receive
                  this tokens on your wallet (created at the beginning of the
                  tutorial).
                </Text>
                <Text fontSize="1.125rem">
                  d. In the form that you are seeing, fill the "Address" field
                  with your Phantom wallet address, which you can get by
                  clicking on the address showed on Phantom.
                </Text>
                <Text fontSize="1.125rem">
                  f. Select how many SOL do you want to withdraw, complete the
                  security steps and in few minutes you'll be able to see your
                  cryptocurrencies on your Phantom wallet.
                </Text>
                <Text fontSize="1.125rem">
                  g. Now you can mint your NoiaDuck, just go to{" "}
                  <Link href="/#mint" color="lightGreen">
                    the minting page
                  </Link>{" "}
                  and be happy!
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
}
