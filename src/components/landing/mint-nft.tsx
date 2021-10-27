import { NoiaButton } from "../common/noia-button";
import { NFTViewer } from "../common/nft-viewer";
import { useEffect, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Badge,
  Flex,
  Text,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
} from "../../utils/candy-machine";
import { isAdmin, isWhitelisted } from "../../utils/whitelisted";
import Connect from "../common/connect";
import { AccountInfo } from "@solana/web3.js";

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

interface Confirmation {
  sum1: number;
  sum2: number;
  result: number;
}

export const MintNft = (props: HomeProps) => {
  const toast = useToast();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const wallet = useAnchorWallet();
  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [loading, setLoading] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation>({
    sum1: 0,
    sum2: 0,
    result: 0,
  });
  const [answer, setAnswer] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const now = new Date().getTime();
  const launchDateWhitelisted = new Date(
    Date.UTC(2021, 9, 11, 17, 0, 0, 0)
  ).getTime();
  const launchDate = new Date(Date.UTC(2021, 9, 11, 17, 2, 0, 0)).getTime();
  const [whitelisted, setWhitelisted] = useState(false);
  const [canMint, setCanMint] = useState(false);

  const updateCanMint = () => {
    const date = new Date().getTime();

    if (!address) {
      setCanMint(false);
      return;
    }

    if (isAdmin(address)) {
      setCanMint(true);
      return;
    }

    if (date < launchDateWhitelisted) {
      setCanMint(false);
      return;
    }

    if (whitelisted && date >= launchDateWhitelisted) {
      setCanMint(true);
      return;
    }

    if (!whitelisted && date >= launchDateWhitelisted && date < launchDate) {
      setCanMint(false);
      return;
    }

    if (date >= launchDate) {
      setCanMint(true);
      return;
    }
  };

  useEffect(() => {
    updateCanMint();
  }, [whitelisted, address]);

  useEffect(() => {
    if (wallet) setAddress(wallet?.publicKey.toBase58());
  }, [wallet]);

  useEffect(() => {
    if (address) {
      setWhitelisted(isWhitelisted(address));
    }
  }, [address]);

  const updateConfirmation = () => {
    const sum1 = Math.floor(Math.random() * (12 - 1)) + 1;
    const sum2 = Math.floor(Math.random() * (12 - 1)) + 1;
    const result = sum1 + sum2;
    setConfirmation({ sum1, sum2, result });
    setAnswer("");
  };

  const closeModal = () => {
    updateConfirmation();
    onClose();
  };

  useEffect(() => {
    updateConfirmation();
  }, []);

  useEffect(() => {
    refreshCandyMachineState();
  }, [wallet]);

  useEffect(() => {
    getAddresses();
  }, [wallet]);

  const getAddresses = async () => {
    const mint = await new anchor.web3.PublicKey(
      "93ZbvjRrrLEKX11jPSLFjQKoMBEbTGZqAxG8kiHtj45f"
    );

    const a = await props.connection.getMultipleAccountsInfo([mint]);
  };

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const text = "Just minted my NoiaDuck 😎🦆";

  const shareOnTwitter = () => {
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const { candyMachine, itemsAvailable, itemsRemaining, itemsRedeemed } =
        await getCandyMachineState(
          wallet as anchor.Wallet,
          props.candyMachineId,
          props.connection
        );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);
      setSoldOut(itemsRemaining <= 0);
      setCandyMachine(candyMachine);
    })();
  };

  const checkAndMint = () => {
    const answerNumber = parseInt(answer);

    if (answerNumber !== confirmation.result) {
      toast({
        title: "Wrong answer",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
      return;
    }

    closeModal();
    onMint();
  };

  const onMint = async () => {
    try {
      setLoading(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          shareOnTwitter();
        }
      }
      setLoading(false);
    } catch (error: any) {
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } finally {
      refreshCandyMachineState();
    }
  };

  return (
    <Flex
      id="mint"
      px={[0, 0, "2rem", "4rem"]}
      py="4rem"
      gridGap={[2, 2, 4, 4]}
      alignItems="center"
      justifyContent="space-between"
      flexDir={["column", "column", "row", "row"]}
    >
      <NFTViewer image="/ducks/egg.svg" name={`NoiaDuck #${itemsRedeemed}`} />
      <Stack w={["100%", "100%", "50%", "50%"]} spacing={4}>
        <Heading
          fontWeight="bold"
          fontSize="4rem"
          fontFamily="DM Sans"
          textAlign={["center", "center", "left", "left"]}
        >
          {soldOut ? "NoiaDucks sold out!!!" : `NoiaDuck #${itemsRedeemed}`}
        </Heading>
        <Flex
          alignItems="center"
          gridGap={[4, 4, 8, 8]}
          flexDir={["column", "column", "row", "row"]}
        >
          <Text
            textTransform="uppercase"
            color="brandPink"
            fontWeight="bold"
            fontSize="1.5rem"
          >
            Mint for 1 SOL
          </Text>
          <Text color="mediumGray" fontWeight="bold" fontSize="1.5rem">
            {itemsRedeemed}/{itemsAvailable} minted
          </Text>
        </Flex>
        <Stack spacing={3}>
          <Text>
            NoiaDucks is a collection of 1000 uniquely generated 24-bit ducks.
            They represent the seed that gives life to Foton's revolution
            towards a more decentralized world.
          </Text>

          <Text>
            Buying a NoiaDuck is not just about buying digital art. It's about
            believing in decentralization and in our ability to improve people's
            lives.
          </Text>
        </Stack>
        {wallet ? (
          <>
            {whitelisted && (
              <Flex pt={4}>
                <Badge colorScheme="green">You're whitelisted</Badge>
              </Flex>
            )}
            <NoiaButton
              display={soldOut ? "none" : "block"}
              isDisabled={loading || !canMint}
              w={["100%", "100%", "50%", "50%"]}
              onClick={onOpen}
            >
              {loading ? "Minting..." : "Mint your NoiaDuck"}
            </NoiaButton>
          </>
        ) : (
          <Flex>
            <Connect />
          </Flex>
        )}
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent bgGradient="linear(to-tr, #0D0D0D, #353336)">
            <ModalHeader>Resolve to mint your NoiaDuck</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4} pb={4}>
                <Stack>
                  <Text>
                    {confirmation.sum1}+{confirmation.sum2} =
                  </Text>
                  <Input
                    value={answer}
                    onChange={(e: any) => setAnswer(e.target.value)}
                  />
                </Stack>
                <NoiaButton onClick={checkAndMint}>Mint!</NoiaButton>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Flex>
  );
};
