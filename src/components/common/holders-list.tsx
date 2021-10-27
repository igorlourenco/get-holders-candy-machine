import { Stack, Text, Input } from "@chakra-ui/react";
import { MetadataProgram, Metadata } from "@metaplex/js";
import * as anchor from "@project-serum/anchor";
import React, { useState } from "react";
import { NoiaButton } from "./noia-button";

export const MAX_NAME_LENGTH = 32;
export const MAX_URI_LENGTH = 200;
export const MAX_SYMBOL_LENGTH = 10;
export const MAX_CREATOR_LEN = 32 + 1 + 1;

export const HoldersList = ({ connection }: any) => {
  const [holders, setHolders] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [holdersCount, setHoldersCount] = useState(0);
  const [candyMachineId, setCandyMachineId] = useState("");

  const getHolderList = async (setProgress: any, connection: any) => {
    setLoading(true);
    const hash = candyMachineId.replaceAll(" ", "");
    console.log({ hash });
    const metadataAccounts = await MetadataProgram.getProgramAccounts(
      connection,
      {
        filters: [
          {
            memcmp: {
              offset:
                1 +
                32 +
                32 +
                4 +
                MAX_NAME_LENGTH +
                4 +
                MAX_URI_LENGTH +
                4 +
                MAX_SYMBOL_LENGTH +
                2 +
                1 +
                4 +
                0 * MAX_CREATOR_LEN,
              bytes: hash,
            },
          },
        ],
      }
    );

    const allHolders = [];

    for (let index = 0; index < metadataAccounts.length; index++) {
      const account = metadataAccounts[index];
      const accountInfo: any = await connection.getParsedAccountInfo(
        account.pubkey
      );

      const metadata = new Metadata(hash.toString(), accountInfo.value);
      const allTokenHolders: any = await connection.getTokenLargestAccounts(
        new anchor.web3.PublicKey(metadata.data.mint)
      );
      const onlyHolders = allTokenHolders.value.filter(
        (tokenHolder: any) => tokenHolder.uiAmount
      );
      const largestTokenHolder = onlyHolders[0];
      const tokenHolderAddress = largestTokenHolder.address;
      const tokenHolderOwner: any = await connection.getParsedAccountInfo(
        tokenHolderAddress
      );
      setProgress(index);

      allHolders.push(tokenHolderOwner.value.data.parsed.info.owner);
    }

    setHolders(JSON.stringify(allHolders));
    const countHolders = new Set(allHolders);
    setHoldersCount(countHolders.size);
    setLoading(false);
  };

  return (
    <>
      <Stack w={["90%", "80%", "70%", "60%"]}>
        <Input
          placeholder="Your Candy Machine ID"
          onChange={(e: any) => setCandyMachineId(e.target.value)}
        />
      </Stack>
      <NoiaButton
        isLoading={loading}
        onClick={async () => await getHolderList(setProgress, connection)}
      >
        GET HOLDERS
      </NoiaButton>
      {loading && (
        <>
          <Text>{progress} loaded...</Text>
          <Text>it can take a few minutes...</Text>
        </>
      )}

      <Stack>
        {holdersCount > 0 && (
          <Text maxW="80vw">Unique holders: {holdersCount}</Text>
        )}
        <Text maxW="80vw">Holders list: {holders}</Text>
      </Stack>
    </>
  );
};
