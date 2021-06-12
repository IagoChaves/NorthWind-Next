import React, { memo } from "react";
import {
  Center,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiBarChartLine, RiShoppingCartLine } from "react-icons/ri";
import { useRouter } from "next/router";
const Header: React.FC = () => {
  const router = useRouter();
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
        <Stack direction="row" spacing={["2", "4"]} color="gray.600">
          {/* <Button colorScheme="green">Relatório</Button> */}
          <Tooltip hasArrow label="Relatório" placement="top">
            <span>
              <Icon
                as={RiBarChartLine}
                fontSize="25"
                cursor="pointer"
                onClick={() => router.push("#")}
              />
            </span>
          </Tooltip>
          <Center>
            <Divider orientation="vertical" />
          </Center>
          <Tooltip hasArrow label="Compras gerais" placement="top">
            <span>
              <Icon
                as={RiShoppingCartLine}
                fontSize="25"
                cursor="pointer"
                onClick={() => router.push("/products")}
              />
            </span>
          </Tooltip>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default memo(Header);
