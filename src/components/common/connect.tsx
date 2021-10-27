import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
const Connect = () => {
  const wallet = useAnchorWallet();

  return (
    <WalletDialogProvider>
      <WalletMultiButton
        style={{
          backgroundImage: "linear-gradient(to-r, #54F2F2, #8FF7A7)",
          borderRadius: "25px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      />
    </WalletDialogProvider>
  );
};

export default Connect;
