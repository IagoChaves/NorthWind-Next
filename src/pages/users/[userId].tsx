import React, { useCallback } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Spinner,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RiDeleteBinLine, RiAccountCircleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@src/components/Form/Input/Input";
import Link from "next/link";
import { useUser } from "@src/hooks/useUsers";
import api from "@src/services/api";
import { mutate as mutateGlobal } from "swr";

type EditUserFormData = {
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

const updateUserFormSchema = yup.object().shape({
  CompanyName: yup.string().required("Empresa obrigatória"),
  ContactName: yup.string().notRequired(),
  ContactTitle: yup.string().notRequired(),
  Address: yup.string().notRequired(),
  City: yup.string().notRequired(),
  Region: yup.string().notRequired(),
  PostalCode: yup.number().notRequired(),
  Country: yup.string().notRequired(),
  Phone: yup.string().notRequired(),
  Fax: yup.string().notRequired(),
});

const Profile: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { userId } = router.query;
  const { data, error, isLoading, mutate } = useUser(userId as string);

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(updateUserFormSchema),
  });
  const { errors, isSubmitting } = formState;

  const handleEditUser: SubmitHandler<EditUserFormData> = useCallback(
    async (values) => {
      mutate({ user: values }, false);

      mutateGlobal("customers");

      await api.put("/cliente", values, {
        params: {
          id: userId,
        },
      });

      toast({
        title: "Usuário alterado com sucesso!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      router.push("/");
    },
    []
  );

  return (
    <Box
      as="form"
      flex="1"
      borderWidth={1}
      boxShadow="lg"
      borderRadius={8}
      p={["6", "8"]}
      onSubmit={handleSubmit(handleEditUser)}
    >
      <Flex mb="8" justify="space-between" align="center">
        <Heading
          size="lg"
          fontWeight="normal"
          alignItems="center"
          flex="1"
          display="flex"
          flexWrap="wrap"
          textAlign="center"
        >
          <Icon
            as={RiAccountCircleFill}
            fontSize="150"
            flexGrow={1}
            flexBasis="100%"
          />
          <Text flexGrow={1} flexBasis="50%">
            {userId}
          </Text>
        </Heading>
      </Flex>
      <Divider my="6" />
      <VStack direction="row">
        <Button
          ml="auto"
          size="sm"
          fontSize="sm"
          colorScheme="red"
          leftIcon={<Icon as={RiDeleteBinLine} fontSize="20" />}
          // onClick={() => delete()}
        >
          Deletar
        </Button>
      </VStack>

      {isLoading ? (
        <Flex align="center" justify="center">
          <Spinner size="sm" color="gray.500" ml="4" />
        </Flex>
      ) : (
        <VStack spacing={8}>
          <SimpleGrid minChildWidth="240px" spacing={["6", "12"]} w="100%">
            <Input
              name="CustomerID"
              isDisabled
              defaultValue={userId}
              label="ID do cliente"
            />
            <Input
              name="CompanyName"
              label="Nome da empresa"
              defaultValue={data?.user.CompanyName}
              {...register("CompanyName")}
              error={errors.CompanyName}
            />
            <Input
              name="ContactName"
              label="Usuário"
              defaultValue={data?.user.ContactName}
              {...register("ContactName")}
            />
            <Input
              name="ContactTitle"
              label="Profissão"
              defaultValue={data?.user.ContactTitle}
              {...register("ContactTitle")}
            />
            <Input
              name="Address"
              label="Endereço"
              defaultValue={data?.user.Address}
              {...register("Address")}
            />
            <Input
              name="City"
              label="Cidade"
              defaultValue={data?.user.City}
              {...register("City")}
            />
            <Input
              name="Region"
              label="Região"
              defaultValue={data?.user.Region}
              {...register("Region")}
            />
            <Input
              name="PostalCode"
              label="CEP"
              type="number"
              defaultValue={data?.user.PostalCode}
              {...register("PostalCode")}
            />
            <Input
              name="Country"
              label="País"
              defaultValue={data?.user.Country}
              {...register("Country")}
            />
            <Input
              name="Phone"
              label="Telefone para contato"
              defaultValue={data?.user.Phone}
              {...register("Phone")}
            />
            <Input
              name="Fax"
              label="Fax"
              defaultValue={data?.user.Fax}
              {...register("Fax")}
            />
          </SimpleGrid>
        </VStack>
      )}

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

export default Profile;
