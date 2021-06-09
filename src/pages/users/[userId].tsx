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
  Spinner,
  Icon,
  Text,
} from "@chakra-ui/react";
import { RiDeleteBinLine, RiAccountCircleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@src/components/Form/Input/Input";
import Link from "next/link";

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
  Phone: yup.number().notRequired(),
  Fax: yup.number().notRequired(),
});

const Profile: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  // const { data, isLoading, isFetching, error, refetch } = useUser(
  //   userId as string,
  // );

  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(updateUserFormSchema),
  });
  const { errors } = formState;

  const handleEditUser: SubmitHandler<EditUserFormData> = (values) => {
    console.log("User to edit -> ", values);
  };
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

export default Profile;
