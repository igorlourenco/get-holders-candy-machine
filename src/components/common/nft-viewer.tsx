import {
  Stack,
  StackProps,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { NoiaButtonOutlined } from "../common/noia-button-outlined";
interface NFTViewerProps extends StackProps {
  image: string;
  name: string;
}

export const NFTViewer = ({ name, image, ...props }: NFTViewerProps) => {
  return (
    <Stack
      p={3}
      borderColor="lightGray"
      borderStyle="solid"
      borderWidth="1px"
      borderTopRightRadius="6.25rem"
      borderTopLeftRadius="0.625rem"
      borderBottomLeftRadius="6.25rem"
      borderBottomRightRadius="0.625rem"
    >
      <Stack
        p={3}
        borderColor="lightGray"
        borderStyle="solid"
        borderWidth="1px"
        borderTopRightRadius="6.25rem"
        borderTopLeftRadius="0.625rem"
        borderBottomLeftRadius="6.25rem"
        borderBottomRightRadius="0.625rem"
      >
        <Stack
          bgGradient="linear(to-tr, #0D0D0D, #353336)"
          borderTopRightRadius="6.25rem"
          borderTopLeftRadius="0.625rem"
          borderBottomLeftRadius="6.25rem"
          borderBottomRightRadius="0.625rem"
          overflow="hidden"
        >
          <Stack py="3rem" pb="2rem" px="2rem">
            <Image src={image} w="300px" pb="2rem" />
            <Stack borderRadius="lg" bgColor="#010101" p={4} spacing={0}>
              <Text
                textTransform="uppercase"
                fontSize="0.5rem"
                fontWeight="bold"
                color="lightGray"
              >
                Name
              </Text>
              <Text fontSize="1.125rem" fontWeight="bold">
                {name}
              </Text>
            </Stack>
          </Stack>

          <Stack bgGradient="linear(to-br, #181925, #000000)" py="1.5rem">
            <Text
              textAlign="center"
              color="brandPink"
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize="1.5rem"
            >
              Mint for 1 SOL
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
