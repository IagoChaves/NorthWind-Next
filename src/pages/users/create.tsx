import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "@src/components/Form/Input/Input";

type CreateUserFormData = {
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

const createUserFormSchema = yup.object().shape({
  CustomerID: yup.string().required("ID obrigatório"),
  CompanyName: yup.string().required("Empresa obrigatória"),
  ContactName: yup.string().notRequired(),
  ContactTitle: yup.string().notRequired(),
  Address: yup.string().notRequired(),
  City: yup.string().notRequired(),
  Region: yup.string().notRequired(),
  PostalCode: yup.number().notRequired(),
  Country: yup.string().notRequired(),
  Phone: yup.number().notRequired(),
  Fax: yup.number().notRequired(),
});

const CreateUser: React.FC = () => {
  const router = useRouter();
  // const createUser = useMutation(
  //   async (user: CreateUserFormData) => {
  //     const response = await api.post(ServerRoutes.users(), {
  //       user: {
  //         ...user,
  //         createdAt: new Date(),
  //       },
  //     });
  //     return response.data.user;
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('users');
  //     },
  //   },
  // );

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    console.log("User to create -> ", values);
    // router.push(Routes.USERS);
  };
  return (
    <Box
      as="form"
      flex="1"
      borderWidth={1}
      boxShadow="lg"
      borderRadius={8}
      p={["6", "8"]}
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <Heading size="lg" fontWeight="normal">
        Criar usuário
      </Heading>
      <Divider my="6" />

      <VStack spacing={8}>
        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
          <Input
            name="CustomerID"
            label="ID do cliente"
            {...register("CustomerID")}
            error={errors.CustomerID}
          />
          <Input
            name="CompanyName"
            label="Nome da empresa"
            {...register("CompanyName")}
            error={errors.CompanyName}
          />
          <Input
            name="ContactName"
            label="Usuário"
            {...register("ContactName")}
          />
          <Input
            name="ContactTitle"
            label="Profissão"
            {...register("ContactTitle")}
          />
        </SimpleGrid>
        <Divider />
        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
          <Input name="Address" label="Endereço" {...register("Address")} />
          <Input name="City" label="Cidade" {...register("City")} />
          <Input name="Region" label="Região" {...register("Region")} />
          <Input
            name="PostalCode"
            label="CEP"
            type="number"
            defaultValue={0}
            {...register("PostalCode")}
          />
          <Input name="Country" label="País" {...register("Country")} />
          <Input
            name="Phone"
            label="Telefone para contato"
            type="number"
            defaultValue={0}
            {...register("Phone")}
          />
          <Input
            name="Fax"
            label="Fax"
            type="number"
            defaultValue={0}
            {...register("Fax")}
          />
        </SimpleGrid>
      </VStack>

      <Flex mt={8} justify="flex-end">
        <HStack spacing="4">
          <Link href={"/"} passHref>
            <Button>Cancelar</Button>
          </Link>
          <Button
            type="submit"
            // isLoading={formState.isSubmitting}
            colorScheme="pink"
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CreateUser;
