/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import {
  Checkbox,
  Flex,
  Skeleton,
  Table,
  Text,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import * as R from "ramda";
import TableHeader from "./TableHeader";
import Pagination from "../Pagination";
import TableSearch from "./TableSearch";

export type ColumsProps<ObjectType> = {
  key: keyof ObjectType;
  title: string;
  Cell?: (value: ObjectType) => JSX.Element;
  isNumeric?: boolean;
}[];
interface TableComponentProps<ObjectType> {
  data: ObjectType[];
  columns: ColumsProps<ObjectType>;
  totalCount: number;
  hasCheckbox?: boolean;
  additionalFeature?: (value: ObjectType) => JSX.Element;
  onPageChange(page: number): void;
  isLoading: boolean;
  withoutHeader?: boolean;
  error: boolean;
  hasSearch?: boolean;
  totalTd?: boolean;
  message?: string;
  registersPerPage?: number;
}

type FiltersProps = {
  sortBy: "asc" | "desc";
  accessor: string;
}[];

interface TableComponentWithGenerics<ObjectType> {
  id: string | number;
}

const TableComponent = <ObjectType extends { id: string | number }>({
  data,
  columns,
  totalCount,
  additionalFeature = undefined,
  hasCheckbox = false,
  onPageChange,
  error,
  isLoading,
  withoutHeader = false,
  hasSearch = true,
  totalTd = false,
  message,
  registersPerPage = 10,
}: TableComponentProps<ObjectType>): JSX.Element => {
  const [page, setPage] = useState(1);
  const [sortedData, setSortedData] = useState<ObjectType[]>([]);
  const filters = useRef<FiltersProps>([]);
  const searchFilter = useRef("");

  useEffect(() => {
    if (data) {
      setSortedData(data);

      columns.forEach((column) => {
        filters.current.push({
          accessor: String(column.key),
          sortBy: "asc",
        });
      });
    }
  }, [data, columns]);

  const handleChangePage = useCallback(
    (Newpage: number) => {
      onPageChange(Newpage);
      setPage(Newpage);
    },
    [onPageChange]
  );

  const handleSortBy = useCallback(
    (sortBy: "asc" | "desc", accessor: string) => {
      const newSortBy = sortBy === "asc" ? "desc" : "asc";

      filters.current = [
        { accessor, sortBy: newSortBy },
        ...filters.current.filter(
          (predicate) => predicate.accessor !== accessor
        ),
      ];
      const sort = R.sortWith(
        filters.current.map((filter) =>
          R[filter.sortBy === "asc" ? "ascend" : "descend"](
            R.prop(filter.accessor)
          )
        )
      );
      const sorted = sort(sortedData) as ObjectType[];

      setSortedData(sorted);
    },
    [sortedData]
  );

  const handleOnSearch = useCallback(
    (value: string) => {
      searchFilter.current = value;
      if (value.length) {
        setSortedData((prev) => {
          const dataResult = [...data];

          const values = columns.reduce((acc, column) => {
            const filteredValues = dataResult.filter((predicate) =>
              String(predicate[column.key])
                .toLowerCase()
                .includes(value.toLowerCase())
            );
            filteredValues.forEach((fv) =>
              dataResult.splice(
                dataResult.findIndex(
                  (predicate) => predicate[column.key] === fv[column.key]
                ),
                1
              )
            );
            return [...filteredValues, ...acc];
          }, []);
          return [...values];
        });
      } else {
        setSortedData(data);
      }
    },
    [data, columns]
  );

  return (
    <>
      {!isLoading && error ? (
        <Flex>
          <Text>Falha ao obter dados dos usuários</Text>
        </Flex>
      ) : isLoading ? (
        <>
          {hasSearch && <TableSearch handleOnSearch={handleOnSearch} />}
          <Table colorScheme="whiteAlpha">
            {!withoutHeader && (
              <TableHeader
                columns={columns}
                handleSortBy={handleSortBy}
                hasCheckbox={hasCheckbox}
              />
            )}

            <Tbody>
              {new Array(10).fill(0).map((_i, index) => (
                <Tr key={`loading-${index}`}>
                  {hasCheckbox && (
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                  )}
                  {columns.map((column) => (
                    <Td key={String(column.key)}>
                      <Skeleton color="gray.800" height="10px" />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <>
          {hasSearch && <TableSearch handleOnSearch={handleOnSearch} />}
          <Table colorScheme="blackAlpha">
            {!withoutHeader && (
              <TableHeader
                hasCheckbox={hasCheckbox}
                columns={columns}
                additionalFeature={!!additionalFeature}
                handleSortBy={handleSortBy}
                // activeColumn={activeColumn}
              />
            )}

            <Tbody>
              <>
                {sortedData &&
                  sortedData.map((object) => (
                    <Tr key={object.id}>
                      {hasCheckbox && (
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                      )}
                      {columns.map((column) => {
                        return column.Cell ? (
                          <Td
                            key={String(column.key)}
                            isNumeric={typeof object[column.key] === "number"}
                          >
                            {column.Cell(object)}
                          </Td>
                        ) : (
                          <Td
                            isNumeric={typeof object[column.key] === "number"}
                            key={String(column.key)}
                          >
                            {object[column.key]}
                          </Td>
                        );
                      })}
                      {additionalFeature && (
                        <Td>{additionalFeature(object)}</Td>
                      )}
                    </Tr>
                  ))}
                {totalTd && (
                  <Tr>
                    {columns.map((column, index) => {
                      if (index + 1 === columns.length) return;
                      if (index === 0)
                        return (
                          <Td key={String(`Total-${column.key}`)}>TOTAL</Td>
                        );
                      return <Td key={String(`Total-${column.key}`)}></Td>;
                    })}
                    <Td isNumeric>
                      R${" "}
                      {sortedData &&
                        sortedData.reduce((acc, current) => {
                          return (acc += current["Total"]);
                        }, 0)}
                    </Td>
                  </Tr>
                )}
              </>
            </Tbody>
          </Table>
          {sortedData && !sortedData.length && (
            <Flex mt="5">
              <Text>
                {message || "Não existem registros de acordo com sua busca"}
              </Text>
            </Flex>
          )}
          <Pagination
            totalCountOfRegister={totalCount}
            currentPage={page}
            registerPerPage={registersPerPage}
            onPageChange={handleChangePage}
          />
        </>
      )}
    </>
  );
};

// const TableComponent = forwardRef(TableComponentRef) as <
//   ObjectType extends { id: string }
// >(
//   p: TableComponentProps<ObjectType> & { ref?: Ref<RefProps> },
// ) => JSX.Element;

export default memo(TableComponent) as typeof TableComponent;
