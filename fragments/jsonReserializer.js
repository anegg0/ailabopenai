// Initial JSON structure as a string for demonstration
let jsonString = `
{
  "confirmPeriodBlocks": "150",
  "extraChallengeTimeBlocks": "0",
  "stakeToken": "0x0000000000000000000000000000000000000000",
  "baseStake": "100000000000000000",
  "wasmModuleRoot": "0x8b104a2e80ac6165dc58b9048de12f301d70b02a0ab51396c22b4b4b802a16a4",
  "loserStakeEscrow": "0x0000000000000000000000000000000000000000",
  "genesisBlockNum": "0",
  "sequencerInboxMaxTimeVariation": {
    "delayBlocks": "5760",
    "futureBlocks": "48",
    "delaySeconds": "86400",
    "futureSeconds": "3600"
  },
  "chainId": "97400766948",
  "owner": "0x8BdF2e6822631664433e47a5aa8D6cF4addAc1f0",
  "chainConfig": "{\\"homesteadBlock\\":0,\\"daoForkBlock\\":null,\\"daoForkSupport\\":true,\\"eip150Block\\":0,\\"eip150Hash\\":\\"0x0000000000000000000000000000000000000000000000000000000000000000\\",\\"eip155Block\\":0,\\"eip158Block\\":0,\\"byzantiumBlock\\":0,\\"constantinopleBlock\\":0,\\"petersburgBlock\\":0,\\"istanbulBlock\\":0,\\"muirGlacierBlock\\":0,\\"berlinBlock\\":0,\\"londonBlock\\":0,\\"clique\\":{\\"period\\":0,\\"epoch\\":0},\\"arbitrum\\":{\\"EnableArbOS\\":true,\\"AllowDebugPrecompiles\\":false,\\"DataAvailabilityCommittee\\":true,\\"InitialArbOSVersion\\":20,\\"GenesisBlockNum\\":0,\\"MaxCodeSize\\":24576,\\"MaxInitCodeSize\\":49152,\\"InitialChainOwner\\":\\"0x8BdF2e6822631664433e47a5aa8D6cF4addAc1f0\\"},\\"chainId\\":97400766948}"
}
`;

// Parse the initial JSON structure
let jsonData = JSON.parse(jsonString);

// Parse the 'chainConfig' string into an object
let chainConfigObject = JSON.parse(jsonData.chainConfig);

// Replace the 'chainConfig' string in the main object with the parsed object
jsonData.chainConfig = chainConfigObject;

// Output the modified JSON object
console.log(JSON.stringify(jsonData, null, 2));
