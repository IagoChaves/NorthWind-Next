import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Icon,
  Button,
  Table,
  Checkbox,
  Link,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import {
  RiAddLine,
  RiArrowGoBackLine,
  RiPencilLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import NextLink from "next/link";

const data = ["User1", "User2", "User3", "User4", "User5"];

const Dashboard: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(() =>
    new Array(data.length).fill(false)
  );

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  return (
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
            colorScheme="green"
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
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
          </NextLink>
        </Stack>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]} color="gray.300" width="8">
              <Checkbox
                colorScheme="pink"
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) =>
                  setCheckedItems((prev) => prev.map(() => e.target.checked))
                }
              />
            </Th>
            <Th>Usuário</Th>

            <Th width="8" />
          </Tr>
        </Thead>
        <Tbody>
          {data.map((user, index) => (
            <Tr key={user}>
              <Td px={["4", "4", "6"]}>
                <Checkbox
                  colorScheme="pink"
                  isChecked={checkedItems[index]}
                  onChange={() => {
                    setCheckedItems((prev) => {
                      prev[index] = !prev[index];
                      return [...prev];
                    });
                  }}
                />
              </Td>
              <Td>
                <Box>
                  <Link href="#none" color="purple.400">
                    <Text fontWeight="bold">{user}</Text>
                  </Link>
                  <Text fontSize="sm" color="gray.700">
                    Descrição user
                  </Text>
                </Box>
              </Td>
              <Td>
                <NextLink href={`/users/${encodeURIComponent(user)}`} passHref>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="blue"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    Editar
                  </Button>
                </NextLink>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex mt="8" justify="flex-end" align="center">
        <Button
          isDisabled={!checkedItems.some(Boolean)}
          colorScheme="red"
          size="sm"
          fontSize="sm"
          leftIcon={<Icon as={RiDeleteBin6Line} fontSize="20" />}
        >
          Remover selecionados
        </Button>
      </Flex>
    </Box>
  );
};

export default Dashboard;
