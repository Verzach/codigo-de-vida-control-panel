import {
  ActionIcon,
  Affix,
  Button,
  Chip,
  createStyles,
  Group,
  Modal,
  SegmentedControl,
  Table,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconPrinter,
  IconSearch,
} from "@tabler/icons";
import pocketbaseEs, { Record } from "pocketbase";
import React, { createRef, useEffect, useState } from "react";
import { SERVER_URL } from "../State";
// @ts-ignore
import Pdf from "react-to-pdf";
const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));
function Logs() {
  const theme = useMantineTheme();
  const [open, setOpened] = useState(false);
  const [logs, setLogs] = React.useState<any>();
  const { classes } = useStyles();
  async function getLogs() {
    const client = new pocketbaseEs(SERVER_URL);
    const logs = await client.records.getList("registros");
    setLogs(logs);
    console.log(logs);
  }

  useEffect(() => {
    getLogs();
    return () => {};
  }, []);

  const rows = logs?.items?.map((element: any) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.id_usuario}</td>
      <td>{element.email_usuario}</td>
      <td>{element.id_paciente}</td>
      <td>{element.cedula_paciente}</td>
      <td>{element.cliente}</td>
      <td>{element.desde}</td>
    </tr>
  ));

  const ref = createRef();

  return (
    <>
      <div style={{ justifyContent: "center" }}>
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          radius="xl"
          size="md"
          my={5}
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              {theme.dir === "ltr" ? (
                <IconArrowRight size={18} stroke={1.5} />
              ) : (
                <IconArrowLeft size={18} stroke={1.5} />
              )}
            </ActionIcon>
          }
          placeholder="Search questions"
          rightSectionWidth={42}
        />
        <SegmentedControl
          radius="xl"
          size="md"
          data={[
            "Id",
            "Id Usuario",
            "Email Usuario",
            "Id Paciente",
            "Cedula Paciente",
            "Cliente",
            "Desde",
          ]}
          classNames={classes}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Usuario</th>
            <th>Email Usuario</th>
            <th>Id Paciente</th>
            <th>Cedula Paciente</th>
            <th>Cliente</th>
            <th>Desde</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Modal
        opened={open}
        onClose={() => setOpened(false)}
        title="Imprimir"
        size="auto"
      >
        <Table ref={ref as any}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Id Usuario</th>
              <th>Email Usuario</th>
              <th>Id Paciente</th>
              <th>Cedula Paciente</th>
              <th>Cliente</th>
              <th>Desde</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Modal>

      <Pdf targetRef={ref} filename="logs.pdf">
        {({ toPdf }: any) => (
          <Affix position={{ bottom: 20, right: 20 }}>
            <ActionIcon
              size="xl"
              radius="xl"
              variant="filled"
              onClick={() => {
                setOpened(true);
                setTimeout(() => {
                  toPdf();
                }, 500);
              }}
            >
              <IconPrinter size={34} />
            </ActionIcon>
            <ActionIcon />
          </Affix>
        )}
      </Pdf>
    </>
  );
}

export default Logs;
