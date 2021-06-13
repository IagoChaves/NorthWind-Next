import api from "@src/services/api";
import useSWR from "swr";

type User = {
  CustomerID: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: number;
  Country: string;
  Phone: number;
  Fax: number;
};

type Users = {
  id: string;
  ContactName: string;
  CompanyName: string;
  ContactTitle: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: Users[];
};

type GetUserResponse = {
  user: User;
};

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<User[]>("/customers", {
    params: {
      _page: page,
      _limit: 10,
    },
  });

  const users = data.map((user) => ({
    id: user.CustomerID,
    ContactName: user.ContactName,
    CompanyName: user.CompanyName,
    ContactTitle: user.ContactTitle,
  }));
  const totalCount = Number(headers["x-total-count"]);

  return { users: users, totalCount };
}

async function getUser(userId: string): Promise<GetUserResponse> {
  const { data } = await api.get<User>(`/customers/${userId}`);

  return { user: data };
}

const useUsers = (page: number) => {
  const { data, mutate, error, revalidate } = useSWR(["customers", page], () =>
    getUsers(page)
  );

  return { data, mutate, isLoading: !error && !data, error, revalidate };
};

export default useUsers;

export const useUser = (userId: string) => {
  const { data, mutate, error } = useSWR(["customer", userId], () =>
    getUser(userId)
  );

  return { data, mutate, isLoading: !error && !data, error };
};
