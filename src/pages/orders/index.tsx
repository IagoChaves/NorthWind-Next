import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Icon,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/ri";
import TableComponent, { ColumsProps } from "@src/components/Table";
import useOrders, { Order as OrdersType } from "@src/hooks/useOrders";

const Products: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, mutate, revalidate } = useOrders(page);

  const columns = useMemo<ColumsProps<OrdersType>>(() => {
    return [
      { key: "CustomerID", title: "ID do cliente" },
      {
        key: "ProductName",
        title: "PRODUTO",
      },
      { key: "OrderID", title: "ID do pedido", isNumeric: true },
      { key: "Quantity", title: "QUANTIDADE", isNumeric: true },
      { key: "UnitPrice", title: "PREÇO POR UNIDADE", isNumeric: true },
    ];
  }, []);

  return (
    <Box flex="1" borderWidth={1} boxShadow="lg" borderRadius={8} p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Todos os pedidos
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
        </Stack>
      </Flex>

      <TableComponent<OrdersType>
        onPageChange={(NewPage) => {
          setPage(NewPage);
        }}
        error={error}
        isLoading={isLoading}
        data={data?.orders}
        columns={columns}
        totalCount={data?.totalCount}
      />
    </Box>
  );
};

export default Products;
