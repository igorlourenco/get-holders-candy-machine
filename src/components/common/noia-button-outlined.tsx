import { Button, ButtonProps } from "@chakra-ui/button";

export const NoiaButtonOutlined = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      color="lightGreen"
      bgColor="transparent"
      borderColor="lightGreen"
      borderStyle="solid"
      borderWidth="1px"
      fontSize="md"
      fontWeight="bold"
      rounded="full"
      px={5}
      _hover={{ bgGradient: "linear(to-r, #54F2F2, #8FF7A7)", color: "#000" }}
      _active={{ bgGradient: "linear(to-r, #54F2F2, #8FF7A7)", color: "#000" }}
      {...props}
    >
      {children}
    </Button>
  );
};
