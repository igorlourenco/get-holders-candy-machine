import { Button, ButtonProps } from "@chakra-ui/button";

export const NoiaButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      bgGradient="linear(to-r, #8FF7A7, #54F2F2)"
      color="#000"
      fontSize="md"
      fontWeight="bold"
      rounded="full"
      px={5}
      _hover={{ bgGradient: "linear(to-r, #54F2F2, #8FF7A7)" }}
      _active={{ bgGradient: "linear(to-r, #54F2F2, #8FF7A7)" }}
      {...props}
    >
      {children}
    </Button>
  );
};
