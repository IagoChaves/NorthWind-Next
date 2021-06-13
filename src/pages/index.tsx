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
  Spinner,
} from "@chakra-ui/react";
import {
  RiAddLine,
  RiArrowGoBackLine,
  RiPencilLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import NextLink from "next/link";
import TableComponent, { ColumsProps } from "@src/components/Table";
import useUsers from "@src/hooks/useUsers";
import api from "@src/services/api";
import Panel from "@src/components/Panel";

type UsersType = {
  id: string;
  ContactName: string;
  CompanyName: string;
  ContactTitle: string;
};

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, mutate, revalidate } = useUsers(page);
  const columns = useMemo<ColumsProps<UsersType>>(() => {
    return [
      {
        key: "id",
        title: "USUÁRIO",
        Cell: ({ id, ContactName }: UsersType) => (
          <Box>
            <Link
              href={`/orders/${encodeURIComponent(id)}`}
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

  const handleOnRemove = useCallback(
    (id: string) => {
      api.delete(`/customers/${id}`);

      const updatedUsers = data?.users.filter(
        (predicate) => predicate.id !== id
      );

      mutate({ users: updatedUsers, totalCount: data?.totalCount - 1 }, false);
    },
    [page, data, mutate]
  );
  return (
    <Flex w="100%" direction="column">
      <Panel />

      <Box flex="1" borderWidth={1} boxShadow="lg" borderRadius={8} p="8">
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuários
            {isLoading && <Spinner size="sm" color="gray.500" ml="4" />}
          </Heading>
          <Stack direction="row">
            <Button
              size="sm"
              fontSize="sm"
              variant="outline"
              leftIcon={<Icon as={RiArrowGoBackLine} fontSize="20" />}
              onClick={() => revalidate()}
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
          error={error}
          isLoading={isLoading}
          data={data?.users}
          columns={columns}
          totalCount={data?.totalCount}
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
                  onClick={() => handleOnRemove(id)}
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
