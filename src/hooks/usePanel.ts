import api from "@src/services/api";
import useSWR from "swr";

export type ClientesType = {
  CustomerID: string;
  Nome: string;
  Quantidade: number;
};

export type VendasType = {
  CategoryName: string;
  ProductName: string;
  Total: number;
};

export type GetPanelResponse = {
  Clientes: ClientesType[];
  Vendas: VendasType[];
};

async function getPanel(isAvailable: boolean): Promise<GetPanelResponse> {
  if (isAvailable) {
    const { data } = await api.get<GetPanelResponse>("/top3");

    return data;
  }
  return null;
}

const usePanel = (isAvailable: boolean) => {
  const { data, error } = useSWR("panel", () => getPanel(isAvailable));

  return { data, isLoading: !error && !data, error };
};

export default usePanel;
