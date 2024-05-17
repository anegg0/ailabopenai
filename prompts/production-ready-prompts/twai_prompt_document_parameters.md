VARS:

* = Required


*[FUNCTION]* = Function explained in the code  | Example: createRollupPrepareConfig
*[OUTPUT-TYPE]* = What type of content is expect as output from the prompt | Examples: how-to | tutorial | Overview | README
*[OUTPUT-LENGTH]* = The length of the output in number of words. | Examples: 500
*[SOURCE-1]* = URL where reference content can be found to gather context or additional information about the content subject | Example: https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain
*[SOURCE-2]* = Another source, Similar [SOURCE-2]
*[SOURCE-3]* = Another source, Similar [SOURCE-3]
*[CODE-BLOCK-1]* = code block | Example: 
``` python
def main(args):
    md_file = args.input_md

    md_content = parse_md_file(md_file)
    json_data = load_json_from_url()  # Fetch JSON from the hardcoded URL

    pairs = [(value['title'], f'<a data-quicklook-from="{key}">{value["title"]}</a>') for key, value in json_data.items()]

    md_content_with_quicklook = replace_with_quicklook(md_content, pairs)

    # Write the modified Markdown content to the output file
    with open(args.output_md, 'w') as f:
        f.write(md_content_with_quicklook)
```

*[TRUTH-SOURCE]* = URL where reference content can be found to verify output content against real data  | Example: https://github.com/OffchainLabs/arbitrum-orbit-sdk/
*[PATTERN-GUIDE]* = A formal document defining what the tone, voice, acronyms should be used by the language model.
*[PERSONA]* = Description of the role/mode the LLM model should use to generate the output  | Example: You are a technical writer with specialized expertise in blockchain development documentation. You work for Arbitrum, an L2 project.
*[CONSTRAINTS]* Defines some rules to apply for the LLM | Example: Stick as closely as possible to the [TRUTH-SOURCE] for your information. If the information doesn't exist in the [TRUTH-SOURCE], don't invent information. Instead, write "No information available in source material" for that part of the template.
*[DONTS]* = What the LLMs shouldn't do | Example: "Don't make up functions if they don't exist in the [TRUTH-SOURCE]"
*[AUDIENCE]* = Define the type of audience targeted by the output. | Example: intermediate to advanced developers who have a solid understanding of blockchain fundamentals
*[OUTPUT-FORMAT]* = What should be the output format. | Examples: MD | GFM | Latex | Orgmode
*[ARTICLE]* = The output of the prompt 
*[CODE-OUTPUT]* = How code should be provided by the language model. | Example: provide the whole code, don't use abbreviations.
*[GLOSSARY]* = Terminology list with definitions to provide context and use the right terms in the [ARTICLE] | Example: 'https://raw.githubusercontent.com/OffchainLabs/arbitrum-docs/master/website/static/glossary.json'

--------
START OF PROMPT:

>>>>> Write a SDK Reference guide explaining the configuration parameters for deploying an Orbit Chain using the Orbit SDK

**[ARTICLE]** = The actual content and steps of the guide.
**[OUTPUT-TYPE]** = SDK Reference guide
**[OUTPUT-LENGTH]** = Approximately 500 words.
**[SOURCE-1]** = [https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain](https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain)
**[SOURCE-2]** = [https://github.com/OffchainLabs/arbitrum-orbit-sdk/blob/main/examples/create-rollup-eth/low_level.ts](https://github.com/OffchainLabs/arbitrum-orbit-sdk/blob/main/examples/create-rollup-eth/low_level.ts)
**[SOURCE-3]** = [https://docs.arbitrum.io/launch-orbit-chain/orbit-sdk-introduction](https://docs.arbitrum.io/launch-orbit-chain/orbit-sdk-introduction)
**[TRUTH-SOURCE]** = [https://github.com/OffchainLabs/arbitrum-orbit-sdk/](https://github.com/OffchainLabs/arbitrum-orbit-sdk/)
**[PATTERN-GUIDE]** = https://www.dropbox.com/scl/fi/x8l0s0wwlarimjcmeooqk/Pattern-guide_OCL.md?rlkey=k4gwm8wtzarvtsx1liaezbbzt&st=sr1p3nxh&dl=0
**[PERSONA]** = You are a technical writer with specialized expertise in blockchain development documentation. You work for Arbitrum, an L2 project.
**[CONSTRAINTS]** = Stick as closely as possible to the [TRUTH-SOURCE], [SOURCE-1] and [SOURCE-2] for your information. If the information doesn't exist in the [TRUTH-SOURCE], don't invent information. Instead, write "No information available in source material" for that part of the template. EXPLAIN ALL PARAMETERS and NESTED PARAMETERS AS THOROUGHLY. Provide the actual parameters types for blockchain-related functions, e.g., `Address`, not just `string`. All code example must be comprehensive, without abbreviation such as: "0x3.....", or "nested parameter".
**[DONTS]** = Don't use an academic style or pedantic English. Don't praise Arbitrum technology. Don't use marketing voice. Don't make long statements about the document itself, e.g., "We will explore the key functions involved in this process and provide detailed explanations and examples to ensure clarity and accuracy throughout the deployment".
**[AUDIENCE]** = Intermediate to advanced developers who have a solid understanding of blockchain fundamentals and want to build a project on top of an Orbit chain.
**[OUTPUT-FORMAT]** = GFM
**[CONTEXT-WHAT]** = Arbitrum is a decentralized blockchain protocol, arbitrum nodes do not use a REST API. The Orbit SDK parameters follow the Ethereum model.
**[CODE-OUTPUT]** = For each function, provide the function's: name, function, use example, parameters, output, output example. For each parameter, provide  `Name`, `Type`, `Optional` and `Description` referenced inside a GFM table. Make you can find the parameters in the [TRUTH-SOURCE], then generate a full example of the object parameters and nested parameters with some useful commments. 
**[GLOSSARY]** = https://raw.githubusercontent.com/OffchainLabs/arbitrum-docs/master/website/static/glossary.json
**[CODE-BLOCK-1]** =
```json
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
  "chainConfig": {
    "homesteadBlock": 0,
    "daoForkBlock": null,
    "daoForkSupport": true,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
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
      "period": 0,
      "epoch": 0
    },
    "arbitrum": {
      "EnableArbOS": true,
      "AllowDebugPrecompiles": false,
      "DataAvailabilityCommittee": true,
      "InitialArbOSVersion": 20,
      "GenesisBlockNum": 0,
      "MaxCodeSize": 24576,
      "MaxInitCodeSize": 49152,
      "InitialChainOwner": "0x8BdF2e6822631664433e47a5aa8D6cF4addAc1f0"
    },
    "chainId": 97400766948
  }
}
```


All the functions mentioned must be directly inspected in [TRUTH-SOURCE]. The repository must be adhered to as the ultimate source of truth while ensuring no function or library is invented or presumed beyond what is documented therein. Also, make absolutely sure the output and parameters are all included.

### Document Structure

1. **Introduction**

- Very briefly explain that by the end of this [ARTICLE], readers should know how to configure an Orbit Rollup chain using the Orbit SDK.

2. **Configuring an Orbit Chain**
For each section below, ensure you enrich your explanations and the Description columns with additional information from [SOURCE-1].
- Provide explanation about the most important parameters:
- `DataAvailabilityCommittee`: explain why this parameter determines whether an Orbit chain can be a Rollup OR an Anytrust chain.
- `chainId`
- `InitialChainOwner`
- `MaxCodeSize`
- `MaxInitCodeSize`
Extract and include detailed information about each parameter from [SOURCE-1] to provide thorough and comprehensive descriptions.

B. Explain the `chainConfig` object parameter, as required by the [CODE-OUTPUT].

--------
