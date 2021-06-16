import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "@src/components/Form/Input/Input";
import api from "@src/services/api";

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
  const toast = useToast();

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    try {
      const response = await api.post("/cliente", values);
      if (response.data?.ERROR) {
        throw new Error("Cliente já existe");
      }
      toast({
        title: "Usuário criado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      toast({
        title: "Não foi possível criar o usuário.",
        description: "Já existe um usuário com esse ID, tente outro.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
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
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CreateUser;
