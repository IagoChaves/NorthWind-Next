import { memo } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Stat,
  StatNumber,
  StatLabel,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { GetPanelResponse } from "@src/hooks/usePanel";
import { useEffect } from "react";
import api from "@src/services/api";
import { useState } from "react";

type PanelProps = {
  isThreadAvailable: boolean;
};

const Panel: React.FC<PanelProps> = ({ isThreadAvailable }: PanelProps) => {
  const [data, setData] = useState<GetPanelResponse>();

  useEffect(() => {
    if (isThreadAvailable) {
      api.get<GetPanelResponse>("/top3").then((res) => {
        setData(res.data);
      });
    }
  }, [isThreadAvailable]);

  return (
    <>
      {["Clientes", "Vendas"].map((item) => (
        <Box key={item}>
          <div style={{ minWidth: "100px" }}>
            <Button
              sx={{
                borderRadius: "0 3px 3px 0",
                background: "#FFFFFF",
                borderLeft: `3px solid blue`,
                fontWeight: "bold",
                margin: "1em",
              }}
            >
              Top 3 {item}
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
                  {!data ? (
                    <>
                      <Skeleton color="gray.800" height="10px" />
                      <Skeleton color="gray.800" height="10px" />
                      <Skeleton color="gray.800" height="10px" />
                    </>
                  ) : (
                    <>
                      <StatLabel
                        fontWeight="medium"
                        isTruncated
                        color="gray.400"
                      >
                        {item === "Clientes"
                          ? `${data.Clientes[0].Nome} (${data.Clientes[0].CustomerID})`
                          : `${data.Vendas[0].ProductName} (${data.Vendas[0].CategoryName})`}
                      </StatLabel>
                      <StatNumber
                        fontSize="3xl"
                        fontWeight="medium"
                        color="gray.900"
                      >
                        {item === "Clientes" ? (
                          <Flex align="center">
                            {data.Clientes[0].Quantidade}
                            <Text fontSize="xs" ml={1} color="gray.400">
                              {" "}
                              pedidos
                            </Text>
                          </Flex>
                        ) : (
                          <Flex align="center">
                            {data.Vendas[0].Total}
                            <Text fontSize="xs" ml={1} color="gray.400">
                              {" "}
                              pedidos
                            </Text>
                          </Flex>
                        )}
                      </StatNumber>
                    </>
                  )}
                </Stat>
                <Stat
                  px={{ base: 4, sm: 6 }}
                  py="5"
                  shadow="base"
                  rounded="lg"
                  borderWidth={1}
                  bg="gray.50"
                >
                  {!data ? (
                    <>
                      <Skeleton color="gray.800" height="10px" />
                      <Skeleton color="gray.800" height="10px" />
                      <Skeleton color="gray.800" height="10px" />
                    </>
                  ) : (
                    <>
                      <StatLabel
                        fontWeight="medium"
                        isTruncated
                        color="gray.400"
                      >
                        {item === "Clientes"
                          ? `${data.Clientes[1].Nome} (${data.Clientes[1].CustomerID})`
                          : `${data.Vendas[1].ProductName} (${data.Vendas[1].CategoryName})`}
                      </StatLabel>
                      <StatNumber
                        fontSize="3xl"
                        fontWeight="medium"
                        color="gray.900"
                      >
                        {item === "Clientes" ? (
                          <Flex align="center">
                            {data.Clientes[1].Quantidade}
                            <Text fontSize="xs" ml={1} color="gray.400">
                              {" "}
                              pedidos
                            </Text>
                          </Flex>
                        ) : (
                          <Flex align="center">
                            {data.Vendas[1].Total}
                            <Text fontSize="xs" ml={1} color="gray.400">
                              {" "}
                              pedidos
                            </Text>
                          </Flex>
                        )}
                      </StatNumber>
                    </>
                  )}
                </Stat>
                <Stat
                  px={{ base: 4, sm: 6 }}
                  py="5"
                  shadow="base"
                  rounded="lg"
                  borderWidth={1}
                  bg="gray.50"
                >
                  {!data ? (
                    <>
                      <Skeleton color="gray.800" height="10px" />
                      <Skeleton color="gray.800" height="10px" />
                      <Skeleton color="gray.800" height="10px" />
                    </>
                  ) : (
                    <>
                      <StatLabel
                        fontWeight="medium"
                        isTruncated
                        color="gray.400"
                      >
                        {item === "Clientes"
                          ? `${data.Clientes[2].Nome} (${data.Clientes[2].CustomerID})`
                          : `${data.Vendas[2].ProductName} (${data.Vendas[2].CategoryName})`}
                      </StatLabel>
                      <StatNumber
                        fontSize="3xl"
                        fontWeight="medium"
                        color="gray.900"
                      >
                        {item === "Clientes" ? (
                          <Flex align="center">
                            {data.Clientes[2].Quantidade}
                            <Text fontSize="xs" ml={1} color="gray.400">
                              {" "}
                              pedidos
                            </Text>
                          </Flex>
                        ) : (
                          <Flex align="center">
                            {data.Vendas[2].Total}
                            <Text fontSize="xs" ml={1} color="gray.400">
                              {" "}
                              pedidos
                            </Text>
                          </Flex>
                        )}
                      </StatNumber>
                    </>
                  )}
                </Stat>
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default memo(Panel);
