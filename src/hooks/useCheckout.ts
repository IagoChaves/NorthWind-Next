import api from "@src/services/api";
import useSWR from "swr";

export type CheckoutItem = {
  id: number;
  ProductName: string;
  City: string;
  Country: string;
};

type GetCheckoutListResponse = {
  totalCount: number;
  checkoutList: CheckoutItem[];
};

async function getCheckoutList(page: number): Promise<GetCheckoutListResponse> {
  const { data, headers } = await api.get<CheckoutItem[]>("/checkout", {
    params: {
      _page: page,
      _limit: 5,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  return { checkoutList: data, totalCount };
}

const useCheckout = (page: number) => {
  const { data, mutate, error, revalidate } = useSWR(
    ["checkoutList", page],
    () => getCheckoutList(page)
  );

  return { data, mutate, isLoading: !error && !data, error, revalidate };
};

export default useCheckout;
