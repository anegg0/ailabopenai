# How to Deploy an Orbit Rollup Chain Using the Arbitrum Orbit SDK

This guide focuses on deploying an Orbit Rollup chain using the Arbitrum Orbit SDK, tailored for intermediate to advanced developers familiar with blockchain fundamentals. We will explore the key functions involved in this process and provide detailed explanations and examples to ensure clarity and accuracy throughout the deployment.

Refer to the [source code example](https://github.com/OffchainLabs/arbitrum-orbit-sdk/tree/main/examples/create-rollup-eth) for a practical implementation.

## Deploying an Orbit Rollup Chain Instance

Deploying an Orbit Rollup chain involves preparing the transaction for deploying core contracts, signing and sending the transaction, and retrieving the transaction receipt. Here, we walk through these steps using key functions within the Arbitrum Orbit SDK.

### 1. Prepare the Transaction for Deploying Core Contracts

The initial step involves preparing the transaction to deploy the core contracts for the Rollup chain.

```js
// prepare the transaction for deploying the core contracts
const request = await createRollupPrepareTransactionRequest({
  params: {
    config: createRollupPrepareConfig({
      chainId: BigInt(chainId),
      owner: deployer.address,
      chainConfig,
    }),
    batchPoster,
    validators: [validator],
  },
  account: deployer.address,
  publicClient: parentChainPublicClient,
});
```

#### Function: `createRollupPrepareTransactionRequest`
This function creates a transaction request for deploying the core contracts of the Rollup chain.

**Output:**
```json
{
  "method": "POST",
  "path": "/api/rollup/prepare",
  "body": {
    "config": "<Prepared Config Object>",
    "batchPoster": "<Batch Poster Address>",
    "validators": ["<Validator Addresses>"]
  }
}
```

**Parameters:**

| Name        | Type     | Optional | Description                                             |
|-------------|----------|----------|---------------------------------------------------------|
| `params`    | Object   | No       | Contains configuration details, batch poster, and validators for the transaction. |
| `account`   | String   | No       | The address of the deployer's account.                 |
| `publicClient` | Object | No       | The public client interfacing with the parent chain.    |

#### Nested Function: `createRollupPrepareConfig`
Configures the specifics of the Rollup chain being prepared for deployment.

**Example Output:**
```json
{
  "chainId": "12345678901234567890",
  "owner": "0x12345ABCDE12345ABCDE12345ABCDE12345ABCDE",
  "chainConfig": {
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "berlinBlock": 0,
    "londonBlock": 0,
    "clique": {
      "period": 15,
      "epoch": 30000
    },
    "arbitrum": {
      "EnableArbOS": true,
      "AllowDebugPrecompiles": false,
      "DataAvailabilityCommittee": true,
      "InitialArbOSVersion": 1,
      "GenesisBlockNum": 0,
      "MaxCodeSize": 24576,
      "MaxInitCodeSize": 49152
    }
  }
}
```

**Parameters:**

| Name            | Type          | Optional | Description                                                  |
|-----------------|---------------|----------|--------------------------------------------------------------|
| `chainId`       | `BigInt`      | No       | Unique identifier for the chain.                             |
| `owner`         | `String`      | No       | Address of the owner of the Rollup chain.                    |
| `chainConfig`   | `Object`      | No       | Configuration parameters for the chain setup.                |
| `homesteadBlock`| `number`      | Yes      | The block number of the Homestead hard fork.                 |
| `daoForkBlock`  | `number`      | Yes      | The block number of the DAO hard fork.                       |
| `daoForkSupport`| `boolean`     | Yes      | Indicates support for the DAO fork.                          |
| `eip150Block`   | `number`      | Yes      | The block number of the EIP-150 hard fork.                   |
| `eip150Hash`    | `string`      | Yes      | The hash of the EIP-150 hard fork.                           |
| `eip155Block`   | `number`      | Yes      | The block number of the EIP-155 hard fork.                   |
| `eip158Block`   | `number`      | Yes      | The block number of the EIP-158 hard fork.                   |
| `byzantiumBlock`| `number`      | Yes      | The block number of the Byzantium hard fork.                 |
| `constantinopleBlock` | `number`| Yes      | The block number of the Constantinople hard fork.            |
| `petersburgBlock`| `number`     | Yes      | The block number of the Petersburg hard fork.                |
| `istanbulBlock` | `number`      | Yes      | The block number of the Istanbul hard fork.                  |
| `muirGlacierBlock`| `number`    | Yes      | The block number of the Muir Glacier hard fork.              |
| `berlinBlock`   | `number`      | Yes      | The block number of the Berlin hard fork.                    |
| `londonBlock`   | `number`      | Yes      | The block number of the London hard fork.                    |
| `clique`        | `Object`      | Yes      | Configuration for the Clique proof-of-authority protocol.    |
| `period`        | `number`      | Yes      | The block period for creating new blocks in Clique.          |
| `epoch`         | `number`      | Yes      | The epoch length for voting checkpoints in Clique.           |
| `arbitrum`      | `Object`      | Yes      | Specific configurations for Arbitrum Rollup chains.          |
| `EnableArbOS`   | `boolean`     | Yes      | Whether to enable ArbOS on the chain.                        |
| `AllowDebugPrecompiles`| `boolean`| Yes   | Allows debug precompiles in the chain configuration.         |
| `DataAvailabilityCommittee` | `boolean`| Yes| Indicates if the data availability committee is enabled.     |
| `InitialArbOSVersion` | `number`| Yes      | Specifies the initial version of ArbOS to use.               |
| `GenesisBlockNum`| `number`     | Yes      | The block number at which this chain starts.                 |
| `MaxCodeSize`   | `number`      | Yes      | The maximum allowed size for smart contract code.            |
| `MaxInitCodeSize`| `number`     | Yes      | The maximum allowed size for smart contract initialization code. |

### 2. Sign and Send the Transaction

After configuring the chain and preparing the transaction request, the next step involves signing and sending the transaction to the blockchain network.

```js
// sign and send the transaction
const txHash = await parentChainPublicClient.sendRawTransaction({
  serializedTransaction: await deployer.signTransaction(request),
});
```

#### Function: `sendRawTransaction`
Sends a signed transaction to the blockchain.

**Output:**
```json
{
  "txHash": "0x12345ABCDEF..."
}
```

**Parameters:**

| Name                   | Type    | Optional | Description                            |
|------------------------|---------|----------|----------------------------------------|
| `serializedTransaction`| String  | No       | The transaction data, signed by the deployer. |

### 3. Retrieve the Transaction Receipt

Finally, confirm the deployment by retrieving the transaction receipt.

```js
// get the transaction receipt after waiting for the transaction to complete
const txReceipt = createRollupPrepareTransactionReceipt(
  await parentChainPublicClient.waitForTransactionReceipt({ hash: txHash }),
);
```

#### Function: `createRollupPrepareTransactionReceipt`
Processes and formats the transaction receipt post-deployment.

**Output:**
```json
{
  "status": "success",
  "blockNumber": 1023456,
  "transactionIndex": 5
}
```

**Parameters:**

| Name  | Type    | Optional | Description                           |
|-------|---------|----------|---------------------------------------|
| `hash`| String  | No       | The hash of the transaction to track. |

### Conclusion

By adhering to these steps and utilizing the detailed function explanations and parameters, you can effectively deploy an Orbit Rollup chain within the Arbitrum ecosystem. For further information and context, consult the [Arbitrum Orbit SDK documentation](https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain).

This guide aims to provide clarity and precision in deploying Orbit Rollup chains, enhancing your understanding and practical application of the Arbitrum Orbit SDK.
