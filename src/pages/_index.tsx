import React, {  useState } from "react";
import { Layout } from "../components/common/layout";
import { Stack } from "@chakra-ui/react";
import { HoldersList } from "../components/common/holders-list";

export default function Index() {
  if (typeof window === "undefined") return <></>;

  return (
	<Layout>
	<Stack alignItems="center" py={20} spacing={4}>
	  <HoldersList />
	</Stack>
  </Layout>
  );
}
