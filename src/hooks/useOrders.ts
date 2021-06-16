import api from "@src/services/api";
import useSWR from "swr";

export type Order = {
  id: number;
  OrderID: number;
  CustomerID: string;
  OrderDate: string;
  ProductName: string;
  CategoryName: string;
  Quantity: number;
  UnitPrice: number;
};

type GetOrdersResponse = {
  totalCount: number;
  orders: Order[];
};

async function getOrders(page: number): Promise<GetOrdersResponse> {
  const { data, headers } = await api.get<Order[]>("/comprasAll", {
    params: {
      offset: page,
      limit: 10,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const formattedData = data.map((item) => ({
    ...item,
    OrderID: Number(item.OrderID),
    Quantity: Number(item.Quantity),
    UnitPrice: Number(item.UnitPrice),
  }));
  return { orders: formattedData, totalCount };
}

async function getOrder(
  userId: string,
  page: number
): Promise<GetOrdersResponse> {
  const { data, headers } = await api.get<Order[]>("/compras", {
    params: {
      offset: page,
      limit: 10,
      id: userId,
    },
  });
  const totalCount = Number(headers["x-total-count"]);

  const formattedData = data.map((item) => ({
    ...item,
    OrderID: Number(item.OrderID),
    Quantity: Number(item.Quantity),
    UnitPrice: Number(item.UnitPrice),
  }));
  return { orders: formattedData, totalCount };
}

const useOrders = (page: number) => {
  const { data, mutate, error, revalidate } = useSWR(["orders", page], () =>
    getOrders(page - 1)
  );

  return { data, mutate, isLoading: !error && !data, error, revalidate };
};

export default useOrders;

export const useOrder = (userId: string, page: number) => {
  const { data, mutate, error } = useSWR([`order${page}`, userId], () =>
    getOrder(userId, page - 1)
  );

  return { data, mutate, isLoading: !error && !data, error };
};
