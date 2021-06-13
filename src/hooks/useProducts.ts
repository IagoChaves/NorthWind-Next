import api from "@src/services/api";
import useSWR from "swr";

export type Product = {
  id: number;
  ProductName: string;
  UnitPrice: number;
  UnitsInStock: number;
  CategoryName: string;
};

type GetProductsResponse = {
  totalCount: number;
  products: Product[];
};

async function getProducts(page: number): Promise<GetProductsResponse> {
  const { data, headers } = await api.get<Product[]>("/products", {
    params: {
      _page: page,
      _limit: 10,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  return { products: data, totalCount };
}

// async function getOrder(
//   userId: string,
//   page: number
// ): Promise<GetOrdersResponse> {
//   const { data, headers } = await api.get<Order[]>("/orders", {
//     params: {
//       _page: page,
//       _limit: 10,
//       CustomerID: userId,
//     },
//   });
//   const totalCount = Number(headers["x-total-count"]);

//   return { orders: data, totalCount };
// }

const useProducts = (page: number) => {
  const { data, mutate, error, revalidate } = useSWR(["products", page], () =>
    getProducts(page)
  );

  return { data, mutate, isLoading: !error && !data, error, revalidate };
};

export default useProducts;

// export const useOrder = (userId: string, page: number) => {
//   const { data, mutate, error } = useSWR([`order${page}`, userId], () =>
//     getOrder(userId, page)
//   );

//   return { data, mutate, isLoading: !error && !data, error };
// };
