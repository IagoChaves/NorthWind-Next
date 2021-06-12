import {
  Thead,
  Tr,
  Th,
  Checkbox,
  TableColumnHeaderProps,
  Icon,
} from "@chakra-ui/react";
import React, { ReactNode, useCallback, useState } from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

interface HeadProps {
  columns: {
    key: number | symbol | string;
    title: string;
    isNumeric?: boolean;
  }[];
  additionalFeature?: boolean;
  hasCheckbox: boolean;
  handleSortBy: (
    sortBy: "asc" | "desc",
    accessor: number | symbol | string
  ) => void;
}

interface HeadCellProps extends TableColumnHeaderProps {
  accessor: string;
  children: ReactNode;
  handleSortBy: (sortBy: "asc" | "desc", accessor: string) => void;
}

// type RefProps = {
//   handleonSortBy: () => void;
//   sortBy: 'asc' | 'desc';
// };

const HeaderCell = ({
  children,
  handleSortBy,
  accessor,
  ...rest
}: HeadCellProps) => {
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  const handleOnClick = useCallback(() => {
    setSortBy((prev) => (prev === "asc" ? "desc" : "asc"));
    handleSortBy(sortBy, accessor);
  }, [accessor, handleSortBy, sortBy]);
  return (
    <Th
      _hover={{
        cursor: "pointer",
        color: "gray.700",
        transition: "color 0.3s ease",
      }}
      sx={{
        userSelect: "none",
      }}
      onClick={handleOnClick}
      {...rest}
    >
      <Icon
        as={sortBy === "desc" ? RiArrowDownLine : RiArrowUpLine}
        fontSize="14"
        color="orange"
        mr="1"
      />
      {children}
    </Th>
  );
};

const TableHeader: React.FC<HeadProps> = ({
  columns,
  additionalFeature = false,
  hasCheckbox,
  handleSortBy,
}: HeadProps) => {
  // const totalColumns = columns.length;
  // const [refs] = useState<MutableRefObject<RefProps>[]>(
  //   Array(totalColumns)
  //     .fill(undefined)
  //     .map(() => createRef<RefProps>()),
  // );

  return (
    <Thead>
      <Tr>
        {hasCheckbox && (
          <Th px={["4", "4", "6"]} color="gray.300" width="8">
            <Checkbox colorScheme="pink" />
          </Th>
        )}

        {columns.map((col) => (
          <HeaderCell
            isNumeric={col.isNumeric}
            accessor={String(col.key)}
            key={String(col.key)}
            // ref={refs[index]}
            handleSortBy={handleSortBy}
          >
            {col.title}
          </HeaderCell>
        ))}
        {additionalFeature && <Th width="12" />}
      </Tr>
    </Thead>
  );
};

TableHeader.defaultProps = {
  additionalFeature: false,
};
export default TableHeader;
