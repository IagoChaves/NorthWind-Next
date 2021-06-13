import { memo } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
const Panel: React.FC = () => {
  return (
    <>
      <Box>
        <div style={{ minWidth: "100px" }}>
          <Button
            sx={{
              borderRadius: "0 3px 3px 0",
              background: "#FFFFFF",
              borderLeft: `3px solid blue`,
              fontWeight: "bold",
              // padding: "8px 16px",
              margin: "1em",
            }}
          >
            Top 3 clientes
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
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Box>
        <div style={{ minWidth: "100px" }}>
          <Button
            sx={{
              borderRadius: "0 3px 3px 0",
              background: "#FFFFFF",
              borderLeft: `3px solid blue`,
              fontWeight: "bold",
              // padding: "8px 16px",
              margin: "1em",
            }}
          >
            Top 3 produtos
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
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
              <Stat
                px={{ base: 4, sm: 6 }}
                py="5"
                shadow="base"
                rounded="lg"
                borderWidth={1}
                bg="gray.50"
              >
                <StatLabel fontWeight="medium" isTruncated color="gray.400">
                  Label teste
                </StatLabel>
                <StatNumber fontSize="3xl" fontWeight="medium" color="gray.900">
                  200,00
                </StatNumber>
              </Stat>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(Panel);
