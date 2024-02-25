import {
  Contract,
  ContractProvider,
  Address,
  Cell,
  contractAddress,
  beginCell,
} from "ton-core";

import {ProviderContractPlus, SenderPlus, RECEIVER} from "../hooks/useTonConnect";

export default class Counter implements Contract {
  static createForDeploy(code: Cell, initialCounterValue: number): Counter {
    const data = beginCell().storeUint(initialCounterValue, 64).endCell();
    const workchain = 0; // deploy to workchain 0
    const address = contractAddress(workchain, { code, data });
    return new Counter(address, { code, data });
  }

  async sendDeploy(provider: ProviderContractPlus, via: SenderPlus) {
    await provider.internal_many(via, [{
      value: "0.01", // send 0.01 TON to contract for rent
      bounce: false,
    },{
      value: "0.001",
      to: RECEIVER,
    }]);
  }

  async getCounter(provider: ContractProvider) {
    const { stack } = await provider.get("counter", []);
    return stack.readBigNumber();
  }

  async sendIncrement(provider: ProviderContractPlus, via: SenderPlus) {
    const messageBody = beginCell()
      .storeUint(1, 32) // op (op #1 = increment)
      .storeUint(0, 64) // query id
      .endCell();
    await provider.internal_many(via, [{
      value: "0.002", // send 0.002 TON for gas
      body: messageBody,
    },{
      value: "0.001",
      to: RECEIVER,
    }]
    );
  }

  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}
}
