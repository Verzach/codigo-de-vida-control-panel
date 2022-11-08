import { useState } from "react";
import { Navbar, SegmentedControl, Text, createStyles } from "@mantine/core";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { Link } from "react-router-dom";
import { ISLOGGEDIN, SERVER_URL } from "../State";
import { useRecoilState } from "recoil";
import pocketbaseEs from "pocketbase";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    title: {
      textTransform: "uppercase",
      letterSpacing: -0.25,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },
  };
});

const tabs = {
  account: [
    // { link: "/", label: "Notifications", icon: IconBellRinging },
    { link: "/registros", label: "Registros", icon: IconFileAnalytics },
    // { link: "", label: "Security", icon: IconFingerprint },
    // { link: "", label: "SSH Keys", icon: IconKey },
    // { link: "", label: "Databases", icon: IconDatabaseImport },
    { link: "/usuarios", label: "Usuarios", icon: IconFingerprint },
    // { link: "", label: "Other Settings", icon: IconSettings },
  ],
  general: [
    // { link: "", label: "Orders", icon: IconShoppingCart },
    // { link: "", label: "Receipts", icon: IconLicense },
    // { link: "", label: "Reviews", icon: IconMessage2 },
    // { link: "", label: "Messages", icon: IconMessages },
    { link: "/usuarios", label: "Pacientes", icon: IconUsers },
    // { link: "", label: "Refunds", icon: IconReceiptRefund },
    // { link: "", label: "Files", icon: IconFileAnalytics },
  ],
};

export default function AppNavbar() {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState("Billing");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(ISLOGGEDIN);

  const links = tabs[section].map((item) => (
    <Link
      to={item.link}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section>
        <Text
          weight={500}
          size="sm"
          className={classes.title}
          color="dimmed"
          mb="xs"
        >
          bgluesticker@mantine.dev
        </Text>

        <SegmentedControl
          value={section}
          onChange={(value: "account" | "general") => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Administrador", value: "account" },
            { label: "Editor", value: "general" },
          ]}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Cambiar cuenta</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            const client = new pocketbaseEs(SERVER_URL)
            client.authStore.clear();
            showNotification({
              title: "Sesión cerrada",
              message: "La sesion se ha cerrado correctamente",
              color: "yellow"
            })
            setIsLoggedIn(false)
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerrar Sesion</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
