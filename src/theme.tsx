import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const styles = {
  global: {
    body: {
      fontFamily: "'DM Sans', sans-serif",
      backgroundColor: "#000",
      color: "#fff",
    },
  },
};

const theme = extendTheme({
  colors: {
    lightGreen: "#8FF7A7",
    lightGray: "#A6A6A6",
    brandPink: "#FB62F6",
    mediumGray: "#6f7073",
  },
  styles,
  fonts,
  breakpoints,
});

export default theme;
