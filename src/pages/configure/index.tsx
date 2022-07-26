import { Button, Flex } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { createRef, useEffect, useRef, useState } from "react";
import { CreateLink } from "../../components/CreateLink";
import { EditLink } from "../../components/EditLink";
import { reloadIframe } from "../../utils/reload-iframe";
import { authOptions } from "../api/auth/[...nextauth]";

const ConfigurePage: NextPage = () => {
  const { data: session, status } = useSession();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [createLink, setCreateLink] = useState(false);

  console.log(session);

  return (
    <Flex w="100%" h="100%" justify="space-between">
      <Flex flexDirection="column" p="20px" gap="10px" h="max">
        <Button
          w="600px"
          size="lg"
          background="#7c41ff"
          _hover={{
            background: "#a071ff",
          }}
          onClick={() => {
            setCreateLink(!createLink);
          }}
        >
          Create link
        </Button>
        {createLink && (
          <CreateLink
            close={() => {
              setCreateLink(false);
            }}
            onSuccess={() => {
              reloadIframe();
            }}
          />
        )}
        {session?.user?.links
          ?.slice()
          .reverse()
          .map((link) => {
            return <EditLink key={link.id} link={link} />;
          })}
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ConfigurePage;
