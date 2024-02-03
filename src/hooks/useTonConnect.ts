import { CHAIN } from "@tonconnect/protocol";
import { Sender, SenderArguments } from "ton-core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import TonWeb from "tonweb";

export function useTonConnect(): {
  connected: boolean;
  wallet: string | null;
  sender: { send: (args: SenderArguments[]) => Promise<void> };
  network: CHAIN | null
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return {
    sender: {
      send: async (args: SenderArguments[]) => {
        // @ts-ignore
        var messages: SendTransactionRequest.messages = []
        var arg: SenderArguments
        for (var i in args){
          arg = args[i]
          messages.push({
            address: arg.to.toString(),
            amount: arg.value.toString(),
            // @ts-ignore
            payload: TonWeb.utils.bytesToBase64(await arg.body?.toBoc(false))// args.body?.toBoc().toString("base64"),
          })
        }
        tonConnectUI.sendTransaction({
          messages,
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },   // todo: method to send many transactions
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    network: wallet?.account.chain ?? null,
  };
}
