import React, { useState, useCallback, useMemo } from "react";
import { Box, Flex, Heading, Stack, Icon, Button } from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/ri";
import TableComponent, { ColumsProps } from "@src/components/Table";

const data: OrdersType[] = [
  {
    id: 10249,
    CategoryID: "Beverages",
    ProductName: "Arroz",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10248,
    CategoryID: "Beverages",
    ProductName: "Vinho",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10247,
    CategoryID: "Beverages",
    ProductName: "Beer",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 1027,
    CategoryID: "Beverages",
    ProductName: "Test",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10250,
    CategoryID: "Fruit",
    ProductName: "Apple",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10251,
    CategoryID: "Fruit",
    ProductName: "Grape",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10252,
    CategoryID: "Fruit",
    ProductName: "Orange",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10253,
    CategoryID: "Fruit",
    ProductName: "Kiwi",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10254,
    CategoryID: "Fruit",
    ProductName: "Banana",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10255,
    CategoryID: "Fruit",
    ProductName: "Melon",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
  {
    id: 10256,
    CategoryID: "Fruit",
    ProductName: "Pineapple",
    UnitPrice: 10,
    CustomerID: "ALFKI",
    Quantity: 30,
  },
];

type OrdersType = {
  id: number;
  CustomerID: string;
  ProductName: string;
  CategoryID: string;
  Quantity: number;
  UnitPrice: number;
};

const Products: React.FC = () => {
  const [page, setPage] = useState(1);

  const columns = useMemo<ColumsProps<OrdersType>>(() => {
    return [
      { key: "CustomerID", title: "ID do cliente" },
      {
        key: "ProductName",
        title: "PRODUTO",
      },
      { key: "id", title: "ID do pedido", isNumeric: true },
      { key: "Quantity", title: "QUANTIDADE", isNumeric: true },
      { key: "UnitPrice", title: "PREÇO POR UNIDADE", isNumeric: true },
    ];
  }, []);

  return (
    <Box flex="1" borderWidth={1} boxShadow="lg" borderRadius={8} p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Todos os pedidos
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
        </Stack>
      </Flex>

      <TableComponent<OrdersType>
        onPageChange={(NewPage) => {
          setPage(NewPage);
        }}
        error={false}
        isLoading={false}
        data={data}
        columns={columns}
        totalCount={data.length}
      />
    </Box>
  );
};

export default Products;
