import React, { memo } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Link href={"/"} passHref>
        <Text
          fontSize={["md", "2xl", "3xl"]}
          fontWeight="bold"
          letterSpacing="tight"
          w="64"
          cursor="pointer"
          userSelect="none"
        >
          NorthWind-Next
          <Text as="span" ml="1" color="blue.500">
            .
          </Text>
        </Text>
      </Link>

      <Flex align="center" ml="auto">
        <Button colorScheme="green">Relatório</Button>
      </Flex>
    </Flex>
  );
};

export default memo(Header);
