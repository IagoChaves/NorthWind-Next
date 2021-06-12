import React, { memo } from "react";
import { Button, useColorMode } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent,
  onPageChange,
  number,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button size="sm" fontSize="xs" width="4" colorScheme="facebook" disabled>
        {number}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      variant="solid"
      width="4"
      colorScheme="facebook"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
};

PaginationItem.defaultProps = {
  isCurrent: false,
};

export default memo(PaginationItem);
