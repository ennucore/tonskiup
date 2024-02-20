import {CHAIN} from "@tonconnect/protocol";
import {Sender, SenderArguments} from "ton-core";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import {
    ContractProvider,
    Cell,
    Address,
    SendMode,
  } from "ton-core";

import { Maybe } from "ton-core/src/utils/maybe";

export const RECEIVER = Address.parse("UQDaut0EpxzShmYCGoBqrEcted73FhKyNtu2LW2aiAqLxTpJ")

export type SenderPlus = Sender & {
    send_many: (args: SenderArguments[]) => Promise<void>
}

export type ProviderContractPlus = ContractProvider & {
    internal_many(via: SenderPlus, args: {
        value: bigint | string;
        to?: Maybe<Address>;
        bounce?: Maybe<boolean>;
        sendMode?: SendMode;
        body?: Maybe<Cell | string>;
    }[]): Promise<void>;
}

export function useTonConnect(): {
    connected: boolean;
    wallet: string | null;
    sender: SenderPlus;
    network: CHAIN | null
} {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    return {
        sender: {
            send: async (args: SenderArguments) => {
                // @ts-ignore
                var messages: SendTransactionRequest.messages = []
                // var arg: SenderArguments
                // for (var i in args){
                //   arg = args[i]
                //   messages.push({
                //     address: arg.to.toString(),
                //     amount: arg.value.toString(),
                //     // @ts-ignore
                //     payload: TonWeb.utils.bytesToBase64(await arg.body?.toBoc(false))// args.body?.toBoc().toString("base64"),
                //   })
                // }
                messages.push({
                    address: args.to.toString(),
                    amount: args.value.toString(),
                    // @ts-ignore
                    payload: TonWeb.utils.bytesToBase64(await args.body?.toBoc(false))// args.body?.toBoc().toString("base64"),
                })

                tonConnectUI.sendTransaction({
                    messages,
                    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
            },
            send_many: async (args: SenderArguments[]) => {
                console.log("SEND MANY!!!", args)
                // @ts-ignore
                var messages: SendTransactionRequest.messages = []
                var arg: SenderArguments
                for (var i in args) {
                    arg = args[i]
                    if (arg.body){
                        messages.push({
                            address: arg.to.toString(),
                            amount: arg.value.toString(),
                            // @ts-ignore
                            payload: TonWeb.utils.bytesToBase64(await arg.body?.toBoc(false)),
                        })
                    } else{
                        messages.push({
                            address: arg.to.toString(),
                            amount: arg.value.toString(),
                        })
                    }
                }
                console.log(messages)
                tonConnectUI.sendTransaction({
                    messages,
                    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
            },
        },
        connected: !!wallet?.account.address,
        wallet: wallet?.account.address ?? null,
        network: wallet?.account.chain ?? null,
    };
}
