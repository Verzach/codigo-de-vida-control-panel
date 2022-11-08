import {
  useMantineTheme,
  Group,
  Avatar,
  Badge,
  Anchor,
  ActionIcon,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import pocketbaseEs from "pocketbase";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../State";

interface UsersTableProps {
  data: {
    avatar: string;
    name: string;
    job: string;
    email: string;
    phone: string;
  }[];
}

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

export function Users() {
  const theme = useMantineTheme();
  const [data, setData] = useState<any>();
  useEffect(() => {
    updateUser()
    return () => {
    }
  }, [])
  
  async function updateUser(){
    const client = new pocketbaseEs(SERVER_URL);
    setData(await client.users.getList())

  }

  const rows = data?.items.map((item: any) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.profile.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {item.profile.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {item.profile.access_level}
        </Badge>
      </td>
      <td>
        <Anchor<"a">
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="dimmed">
          {item.phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default Users;
