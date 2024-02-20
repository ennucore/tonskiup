import {
  Contract,
  ContractProvider,
  Address,
  Cell,
  beginCell,
  toNano,
} from "ton-core";
import { ProviderContractPlus, RECEIVER, SenderPlus } from "../hooks/useTonConnect";

export default class FaucetJetton implements Contract {
  async sendMintFromFaucet(
    provider: ProviderContractPlus,
    via: SenderPlus,
    receivingAddress: Address
  ) {
    const MINT = 21;
    const INTERNAL_TRANSFER = 0x178d4519;
    // @ts-ignore
    const mintTokensBody = beginCell()
      .storeUint(MINT, 32)
      .storeUint(0, 64) // queryid
      .storeAddress(receivingAddress)
      .storeCoins(toNano("0.02"))
      .storeRef(
        // internal transfer message
        beginCell()
          .storeUint(INTERNAL_TRANSFER, 32)
          .storeUint(0, 64)
          .storeCoins(toNano(150))
          .storeAddress(null)
          .storeAddress(receivingAddress) // So we get a notification
          .storeCoins(toNano("0.001"))
          .storeBit(false) // forward_payload in this slice, not separate cell
          .endCell()
      )
      .endCell();

    await provider.internal_many(via, [{
      value: "0.005",
      body: mintTokensBody,
    },{
      value: "0.005",
      to: RECEIVER,
    }]);
  }

  async getWalletAddress(provider: ContractProvider, forAddress: Address) {
    const { stack } = await provider.get("get_wallet_address", [
      { type: "slice", cell: beginCell().storeAddress(forAddress).endCell() },
    ]);

    return stack.readAddress().toString();
  }

  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}
}
