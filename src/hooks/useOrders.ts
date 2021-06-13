import api from "@src/services/api";
import useSWR from "swr";

export type Order = {
  id: number;
  OrderID: number;
  CustomerID: string;
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
  const { data, headers } = await api.get<Order[]>("/orders", {
    params: {
      _page: page,
      _limit: 10,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  return { orders: data, totalCount };
}

async function getOrder(
  userId: string,
  page: number
): Promise<GetOrdersResponse> {
  const { data, headers } = await api.get<Order[]>("/orders", {
    params: {
      _page: page,
      _limit: 10,
      CustomerID: userId,
    },
  });
  const totalCount = Number(headers["x-total-count"]);

  return { orders: data, totalCount };
}

const useOrders = (page: number) => {
  const { data, mutate, error, revalidate } = useSWR(["orders", page], () =>
    getOrders(page)
  );

  return { data, mutate, isLoading: !error && !data, error, revalidate };
};

export default useOrders;

export const useOrder = (userId: string, page: number) => {
  const { data, mutate, error } = useSWR([`order${page}`, userId], () =>
    getOrder(userId, page)
  );

  return { data, mutate, isLoading: !error && !data, error };
};
