import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import pocketbaseEs, { ClientResponseError } from "pocketbase";
import { useRecoilState } from "recoil";
import { ISLOGGEDIN, SERVER_URL } from "../State";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(ISLOGGEDIN);

  async function handleLogin(values: {
    email: string;
    password: string;
    admin: boolean;
  }) {
    const client = new pocketbaseEs(SERVER_URL);
    try {
      if (values.admin) {
        await client.admins.authViaEmail(values.email, values.password);
      } else {
        await client.users.authViaEmail(values.email, values.password);
      }
      showNotification({
        title: "Sesion iniciada",
        message: "Bienvenido de nuevo",
        color: "teal",
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      const typedError = error as ClientResponseError;
      showNotification({
        title: "Error",
        message:
          typedError.status === 400
            ? "Email o Contraseña incorrecta"
            : "Unknown error",
        color: "red",
      });
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      admin: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => event.preventDefault()}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="tu.correo@email.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Constraseña"
            placeholder="Tu contraseña"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Admin" {...form.getInputProps("admin")} />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Contraseña olvidada?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Iniciar Sesion
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
