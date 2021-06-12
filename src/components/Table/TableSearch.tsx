/* eslint-disable react/no-children-prop */

import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

type TableSearchProps = {
  handleOnSearch: (value: string) => void;
};

const TableSearch: React.FC<TableSearchProps> = ({
  handleOnSearch,
}: TableSearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   const timeToSearch = setTimeout(() => handleOnSearch(searchValue), 750);
  //   return () => clearTimeout(timeToSearch);
  // }, [searchValue, handleOnSearch]);

  return (
    <Flex mb="3" justify="space-between" align="center">
      <InputGroup maxW={350}>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={RiSearchLine} fontSize="20" mt="2" />}
        />
        <Input
          placeholder="Digite para busca"
          variant="outline"
          size="lg"
          onChange={(e) => handleOnSearch(e.target.value)}
        />
      </InputGroup>
    </Flex>
  );
};

export default memo(TableSearch);
