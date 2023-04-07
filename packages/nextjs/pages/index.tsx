import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: delegate } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "delegate",
  });

  const [newDelegate, setNewDelegate] = React.useState("");

  const { writeAsync: doSetDel } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setDelegate",
    args: [newDelegate],
  });

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
      <div className="flex items-center flex-col flex-grow pt-10">
        Current delegate is
        <Address address={delegate} />
        <div className=" flex flex-row space-x-4 p-8">
          <AddressInput
            value={newDelegate}
            onChange={v => {
              setNewDelegate(v);
            }}
          ></AddressInput>
          {/* {newDelegate} */}
        </div>
        <div className="p-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (newDelegate) {
                // check if newDelegate is not empty or undefined
                doSetDel();
              }
              // doSetDel();
            }}
          >
            Set Delegate
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
