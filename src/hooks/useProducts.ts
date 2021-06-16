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

async function getProducts(
  page: number,
  availableQueue: boolean
): Promise<GetProductsResponse> {
  console.log(availableQueue);
  if (availableQueue) {
    const { data, headers } = await api.get<Product[]>("/products", {
      params: {
        offset: page,
        limit: 10,
      },
    });

    const totalCount = Number(headers["x-total-count"]);

    return { products: data, totalCount };
  }
  return null;
}

const useProducts = (page: number, availableQueue: boolean) => {
  const { data, mutate, error, revalidate } = useSWR(["products", page], () =>
    getProducts(page - 1, availableQueue)
  );

  return { data, mutate, isLoading: !error && !data, error, revalidate };
};

export default useProducts;
