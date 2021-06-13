import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  Button,
  Divider,
  Icon,
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
  RiShoppingBasket2Line,
} from "react-icons/ri";
import TableComponent, { ColumsProps } from "@src/components/Table";
import useProducts, { Product as ProductType } from "@src/hooks/useProducts";

interface ProductCartType extends Omit<ProductType, "UnitsInStock"> {
  qtd: number;
  Total: number;
}

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
  const { data, error, isLoading, mutate } = useProducts(page);

  const columns = useMemo<ColumsProps<ProductType>>(() => {
    return [
      { key: "ProductName", title: "PRODUTO" },
      { key: "CategoryName", title: "CATEGORIA" },
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
      { key: "CategoryName", title: "CATEGORIA" },

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
            CategoryName: product.CategoryName,
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
          CategoryName: product.CategoryName,
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
              error={error}
              isLoading={isLoading}
              data={data?.products}
              columns={columns}
              totalCount={data?.totalCount}
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
