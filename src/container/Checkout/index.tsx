import React, { memo, ReactNode, useCallback, useMemo, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import TableComponent, { ColumsProps } from "@src/components/Table";
import useCheckout, { CheckoutItem } from "@src/hooks/useCheckout";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { TriggerProps } from "../NewProduct";

type RefProps = {
  onOpen: () => void;
};

type CheckoutProps = {
  data: TriggerProps;
};

const Checkout: React.ForwardRefRenderFunction<RefProps, CheckoutProps> = (
  { data },
  ref
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  // const { data, error, isLoading } = useCheckout(page);
  const columns = useMemo<ColumsProps<CheckoutItem>>(() => {
    return [
      { key: "ProductName", title: "PRODUTO" },
      { key: "City", title: "CIDADE" },
      { key: "Country", title: "PAÍS DE ORIGEM" },
    ];
  }, []);

  useImperativeHandle(ref, () => ({
    onOpen,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
      <ModalOverlay />
      <ModalContent bg="green.100">
        <ModalBody>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            justifyContent="flex-end"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Ordem efetuada!
            </AlertTitle>
            <AlertDescription maxWidth="sm" mb={8}>
              Verifique o detalhe dos pedidos abaixo
            </AlertDescription>
            <Flex w="100%" direction="column">
              <TableComponent<CheckoutItem>
                onPageChange={(NewPage) => {
                  setPage(NewPage);
                }}
                registersPerPage={5}
                error={!data}
                isLoading={false}
                data={data?.Compras}
                columns={columns}
                totalCount={data?.Compras.length}
                hasSearch={false}
              />
            </Flex>
          </Alert>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(forwardRef(Checkout));
