import React, { useState, useMemo } from "react";
import { Box, Flex, Heading, Stack, Spinner } from "@chakra-ui/react";

import { useRouter } from "next/router";
import NewProduct from "@src/container/NewProduct";
import TableComponent, { ColumsProps } from "@src/components/Table";
import { useOrder, Order as OrdersType } from "@src/hooks/useOrders";

const UserProducts: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [page, setPage] = useState(1);
  const { data, error, isLoading, mutate } = useOrder(userId as string, page);

  const columns = useMemo<ColumsProps<OrdersType>>(() => {
    return [
      { key: "ProductName", title: "PRODUTO" },
      { key: "CategoryName", title: "CATEGORIA" },
      {
        key: "OrderID",
        title: "ID do pedido",
        isNumeric: true,
      },
      { key: "Quantity", title: "QUANTIDADE", isNumeric: true },
      { key: "UnitPrice", title: "PREÇO POR UNIDADE", isNumeric: true },
    ];
  }, []);

  return (
    <Box flex="1" borderWidth={1} boxShadow="lg" borderRadius={8} p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Pedidos - {userId}
          {isLoading && <Spinner size="sm" color="gray.500" ml="4" />}
        </Heading>
        <Stack direction="row">
          <NewProduct />
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

export default UserProducts;
