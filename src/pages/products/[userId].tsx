import React, { useState, useCallback, useMemo } from "react";
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
import Pagination from "@src/components/Pagination";
import { useRouter } from "next/router";
import NewProduct from "@src/container/NewProduct";
import TableComponent, { ColumsProps } from "@src/components/Table";

const data: OrdersType[] = [
  {
    id: 10249,
    ProductName: "Arroz",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10248,
    ProductName: "Vinho",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10247,
    ProductName: "Beer",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 1027,
    ProductName: "Test",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10250,
    ProductName: "Apple",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10251,
    ProductName: "Grape",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10252,
    ProductName: "Orange",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10253,
    ProductName: "Kiwi",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10254,
    ProductName: "Banana",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10255,
    ProductName: "Melon",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
  {
    id: 10256,
    ProductName: "Pineapple",
    UnitPrice: 10,
    Discount: 0,
    Quantity: 30,
  },
];

type OrdersType = {
  id: number;
  ProductName: string;
  Quantity: number;
  UnitPrice: number;
  Discount: number;
};

const UserProducts: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [page, setPage] = useState(1);

  const handleChangePage = useCallback((Newpage: number) => {
    setPage(Newpage);
  }, []);

  const columns = useMemo<ColumsProps<OrdersType>>(() => {
    return [
      { key: "ProductName", title: "PRODUTO" },
      {
        key: "id",
        title: "ID do pedido",
        isNumeric: true,
      },
      { key: "id", title: "ID do pedido", isNumeric: true },
      { key: "Quantity", title: "QUANTIDADE", isNumeric: true },
      { key: "UnitPrice", title: "PREÇO POR UNIDADE", isNumeric: true },
      { key: "Discount", title: "DESCONTO", isNumeric: true },
    ];
  }, []);

  return (
    <Box flex="1" borderWidth={1} boxShadow="lg" borderRadius={8} p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Pedidos - {userId}
          {/* {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )} */}
        </Heading>
        <Stack direction="row">
          <NewProduct />
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

export default UserProducts;
