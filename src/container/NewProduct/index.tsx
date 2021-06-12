import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiPencilLine,
  RiShoppingBasket2Line,
} from "react-icons/ri";
import NextLink from "next/link";
import TableComponent, { ColumsProps } from "@src/components/Table";

const data: ProductType[] = [
  {
    id: 10249,
    CategoryID: "Beverages",
    ProductName: "Arroz",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10248,
    CategoryID: "Beverages",
    ProductName: "Vinho",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10247,
    CategoryID: "Beverages",
    ProductName: "Beer",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 1027,
    CategoryID: "Beverages",
    ProductName: "Test",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10250,
    CategoryID: "Fruit",
    ProductName: "Apple",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10251,
    CategoryID: "Fruit",
    ProductName: "Grape",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10252,
    CategoryID: "Fruit",
    ProductName: "Orange",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10253,
    CategoryID: "Fruit",
    ProductName: "Kiwi",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10254,
    CategoryID: "Fruit",
    ProductName: "Banana",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10255,
    CategoryID: "Fruit",
    ProductName: "Melon",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
  {
    id: 10256,
    CategoryID: "Fruit",
    ProductName: "Pineapple",
    UnitPrice: 10,
    UnitsInStock: 100,
  },
];

type ProductType = {
  id: number;
  ProductName: string;
  CategoryID: string;
  UnitsInStock: number;
  UnitPrice: number;
};

type ProductCartType = {
  id: number;
  ProductName: string;
  CategoryID: string;
  UnitPrice: number;
  qtd: number;
  Total: number;
};

type AddToCartProps = {
  id: number;
  qtd: number;
};

const NewProduct: React.FC = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<ProductCartType[]>(
    [] as ProductCartType[]
  );
  const [productQtd, setProductQtd] = useState<AddToCartProps[]>(
    [] as AddToCartProps[]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo<ColumsProps<ProductType>>(() => {
    return [
      { key: "ProductName", title: "PRODUTO" },
      { key: "CategoryID", title: "CATEGORIA" },
      {
        key: "id",
        title: "ID DO PRODUTO",
        isNumeric: true,
      },
      { key: "UnitsInStock", title: "QTD DISPONIVEIS", isNumeric: true },
      { key: "UnitPrice", title: "PREÇO POR UNIDADE", isNumeric: true },
    ];
  }, []);

  const columnsCart = useMemo<ColumsProps<ProductCartType>>(() => {
    return [
      { key: "ProductName", title: "PRODUTO" },
      { key: "CategoryID", title: "CATEGORIA" },

      { key: "qtd", title: "QUANTIDADE", isNumeric: true },
      { key: "UnitPrice", title: "PREÇO POR UNIDADE", isNumeric: true },
      {
        key: "Total",
        title: "Total",
        isNumeric: true,
        Cell: ({ Total }: ProductCartType) => <Text>R$ {Total}</Text>,
      },
    ];
  }, []);

  const handleAddOnCart = useCallback((product: ProductType, qtd: number) => {
    setTotal((prev) => {
      const total = [...prev];
      const finded = total.findIndex(
        (predicate) => predicate.id === product.id
      );

      if (finded !== -1) {
        const [sameProduct] = total.splice(finded, 1);
        return [
          {
            qtd: qtd + sameProduct.qtd,
            ProductName: product.ProductName,
            CategoryID: product.CategoryID,
            UnitPrice: product.UnitPrice,
            Total: product.UnitPrice * (qtd + sameProduct.qtd),
            id: product.id,
          },
          ...total,
        ];
      }
      return [
        {
          qtd,
          ProductName: product.ProductName,
          CategoryID: product.CategoryID,
          UnitPrice: product.UnitPrice,
          Total: product.UnitPrice * qtd,
          id: product.id,
        },
        ...total,
      ];
    });
  }, []);

  const handleRemoveOnCart = useCallback((product: ProductCartType) => {
    setTotal((prev) => {
      return prev.filter((predicate) => predicate.id !== product.id);
    });
  }, []);

  return (
    <>
      <Button
        size="sm"
        fontSize="sm"
        variant="outline"
        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
        onClick={onOpen}
      >
        Nova compra
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent m={0}>
          <ModalHeader>Lista de produtos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableComponent<ProductType>
              onPageChange={(NewPage) => {
                setPage(NewPage);
              }}
              error={false}
              isLoading={false}
              data={data}
              columns={columns}
              totalCount={data.length}
              additionalFeature={(product) => {
                const { UnitsInStock, id } = product;
                const findProduct = productQtd.find(
                  (predicate) => predicate.id === id
                );
                return (
                  <Stack direction="row">
                    <NumberInput
                      size="sm"
                      maxW={20}
                      value={findProduct?.qtd || 0}
                      onChange={(value) => {
                        setProductQtd((prev) => [
                          { id, qtd: Number(value) },
                          ...prev,
                        ]);
                      }}
                      min={0}
                      max={UnitsInStock}
                      width="max-content"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button
                      size="sm"
                      fontSize="sm"
                      variant="solid"
                      isDisabled={!(!!findProduct && findProduct?.qtd > 0)}
                      leftIcon={
                        <Icon as={RiShoppingBasket2Line} fontSize="20" />
                      }
                      colorScheme="blue"
                      onClick={() => handleAddOnCart(product, findProduct.qtd)}
                    >
                      Adicionar
                    </Button>
                  </Stack>
                );
              }}
            />

            <Divider my={5} />
            <Heading size="md" fontWeight="bold" mb={5}>
              Carrinho
            </Heading>
            <TableComponent<ProductCartType>
              onPageChange={(NewPage) => {
                setPage(NewPage);
              }}
              error={false}
              isLoading={false}
              data={total}
              columns={columnsCart}
              totalCount={total.length}
              hasSearch={false}
              message="Adicione produtos no seu carrinho antes"
              totalTd
              additionalFeature={(product) => {
                return (
                  <Button
                    size="sm"
                    fontSize="sm"
                    variant="ghost"
                    leftIcon={<Icon as={RiDeleteBin6Line} fontSize="20" />}
                    colorScheme="red"
                    onClick={() => {
                      handleRemoveOnCart(product);
                    }}
                  >
                    Remover
                  </Button>
                );
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="pink" isDisabled={total.length === 0}>
              Finalizar compras
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewProduct;
