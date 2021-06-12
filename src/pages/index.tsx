import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Icon,
  Button,
  Link,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue as mode,
  Tag,
} from "@chakra-ui/react";
import {
  RiAddLine,
  RiArrowGoBackLine,
  RiPencilLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import NextLink from "next/link";
import TableComponent, { ColumsProps } from "@src/components/Table";

const data: UsersType[] = [
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "ALFKI",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "ANATR",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "ICHF",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "CHOPS",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "CMMID",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "COMMI",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "BOLID",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "VOLID",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "BERGS",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "AROUT",
    ContactName: "Anders Foden",
  },
  {
    CompanyName: "Alfreds Futterkiste	",
    ContactTitle: "Sales Representative",
    id: "BLAUS",
    ContactName: "Anders Foden",
  },
];

type UsersType = {
  id: string;
  ContactName: string;
  CompanyName: string;
  ContactTitle: string;
};

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);

  const columns = useMemo<ColumsProps<UsersType>>(() => {
    return [
      {
        key: "id",
        title: "USUÁRIO",
        Cell: ({ id, ContactName }: UsersType) => (
          <Box>
            <Link
              href={`/products/${encodeURIComponent(id)}`}
              color="purple.400"
              // onMouseEnter={() => handlePrefetchUser(id)}
            >
              <Text fontWeight="bold">{id}</Text>
            </Link>
            <Text fontSize="sm" color="gray.600">
              {ContactName}
            </Text>
          </Box>
        ),
      },
      { key: "CompanyName", title: "EMPRESA" },
      {
        key: "ContactTitle",
        title: "CARGO",
      },
    ];
  }, []);

  return (
    <Flex w="100%" direction="column">
      <Box>
        <div style={{ minWidth: "100px" }}>
          <Button
            sx={{
              borderRadius: "0 3px 3px 0",
              background: "#FFFFFF",
              borderLeft: `3px solid blue`,
              fontWeight: "bold",
              // padding: "8px 16px",
              margin: "1em",
            }}
          >
            Top 3 clientes
          </Button>
        </div>
        <Box as="section" p="4" mb={8}>
          <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Box>
        <div style={{ minWidth: "100px" }}>
          <Button
            sx={{
              borderRadius: "0 3px 3px 0",
              background: "#FFFFFF",
              borderLeft: `3px solid blue`,
              fontWeight: "bold",
              // padding: "8px 16px",
              margin: "1em",
            }}
          >
            Top 3 produtos
          </Button>
        </div>
        <Box as="section" p="4" mb={8}>
          <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>

      <Box flex="1" borderWidth={1} boxShadow="lg" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários
            {/* {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )} */}
          </Heading>
          <Stack direction="row">
            <Button
              size="sm"
              fontSize="sm"
              variant="outline"
              leftIcon={<Icon as={RiArrowGoBackLine} fontSize="20" />}
              // onClick={() => refetch()}
            >
              Recarregar
            </Button>
            <NextLink href={"/users/create"} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                variant="outline"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Novo usuário
              </Button>
            </NextLink>
          </Stack>
        </Flex>

        <TableComponent<UsersType>
          onPageChange={(NewPage) => {
            setPage(NewPage);
          }}
          error={false}
          isLoading={false}
          data={data}
          columns={columns}
          totalCount={data.length}
          additionalFeature={({ id }: UsersType) => {
            return (
              <Stack direction="row">
                <NextLink href={`/users/${encodeURIComponent(id)}`} passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    variant="outline"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    Editar
                  </Button>
                </NextLink>
                <Button
                  size="sm"
                  fontSize="sm"
                  variant="ghost"
                  colorScheme="red"
                  leftIcon={<Icon as={RiDeleteBin6Line} fontSize="16" />}
                >
                  Remover
                </Button>
              </Stack>
            );
          }}
        />
      </Box>
    </Flex>
  );
};

export default Dashboard;
