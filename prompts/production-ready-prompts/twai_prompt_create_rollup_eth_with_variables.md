VARS:

* = Required


*[FUNCTION]* = Function explained in the code  | Example: createRollupPrepareConfig
*[OUTPUT-TYPE]* = What type of content is expect as output from the prompt | Examples: how-to | tutorial | Overview | README
*[OUTPUT-LENGTH]* = The length of the output in number of words. | Examples: 500
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

*[TRUTH-SOURCE]* = URLs where reference content can be found to verify output content against real data  | Example: https://github.com/OffchainLabs/arbitrum-orbit-sdk/, https://docs.arbitrum.io
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

>>>>> Write a comprehensive how-to guide explaining how to deploy an Orbit Rollup chain using the Arbitrum Orbit SDK

[ARTICLE] = The actual content and steps of the guide.
[OUTPUT-TYPE] = how-to.
[OUTPUT-LENGTH] = Approximately 500 words.
*[TRUTH-SOURCE] = [https://github.com/OffchainLabs/arbitrum-orbit-sdk/](https://github.com/OffchainLabs/arbitrum-orbit-sdk/), [https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain](https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain), [https://github.com/OffchainLabs/arbitrum-orbit-sdk/blob/main/examples/create-rollup-eth/low_level.ts](https://github.com/OffchainLabs/arbitrum-orbit-sdk/blob/main/examples/create-rollup-eth/low_level.ts), [https://docs.arbitrum.io/launch-orbit-chain/orbit-sdk-introduction](https://docs.arbitrum.io/launch-orbit-chain/orbit-sdk-introduction), [https://docs.arbitrum.io/launch-orbit-chain/orbit-sdk-introduction](https://docs.arbitrum.io/launch-orbit-chain/orbit-sdk-introduction)
[PATTERN-GUIDE] = https://www.dropbox.com/scl/fi/x8l0s0wwlarimjcmeooqk/Pattern-guide_OCL.md?rlkey=k4gwm8wtzarvtsx1liaezbbzt&st=sr1p3nxh&dl=0
[PERSONA] = You are a technical writer with specialized expertise in blockchain development documentation. You work for Arbitrum, an L2 project.
[CONSTRAINTS] = Stick as closely as possible to the [TRUTH-SOURCE] for your information. If the information doesn't exist in the [TRUTH-SOURCE], don't invent information. Instead, write "No information available in source material" for that part of the template. EXPLAIN ALL NESTED FUNCTIONS AS THOROUGHLY. EXPLAIN ALL NESTED PARAMETERS AS THOROUGHLY. Provide the actual parameters types for blockchain-related functions, e.g., `Address`, not just `string`. All code example must be comprehensive, without abbreviation such as: "0x3.....", or "nested parameter".
[DONTS] = Don't make up functions if they don't exist in the [TRUTH-SOURCE]. Don't use an academic style or pedantic English. Don't praise Arbitrum technology. Don't use marketing voice. Don't make long statements about the document itself, e.g., "We will explore the key functions involved in this process and provide detailed explanations and examples to ensure clarity and accuracy throughout the deployment". Don't use rest API code, stick to the ETHEREUM communication protocol. 
[AUDIENCE] = Intermediate to advanced developers who have a solid understanding of blockchain fundamentals and want to build a project on top of an Orbit chain.
[OUTPUT-FORMAT] = GFM
[CONTEXT-WHAT] = Arbitrum is a decentralized blockchain protocol, arbitrum nodes do not use a REST API. The Orbit SDK parameters follow the Ethereum model.
[CODE-OUTPUT] = For each function, provide the function's: name, function, use example, parameters, output, output example. For each parameter, provide  `Name`, `Type`, `Optional` and `Description` referenced inside a GFM table. Make you can find the parameters in the [TRUTH-SOURCE], then generate a full example of the object parameters and nested parameters with some useful commments. 
[GLOSSARY] = https://raw.githubusercontent.com/OffchainLabs/arbitrum-docs/master/website/static/glossary.json
[CODE-BLOCK-1] =
```ts
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

// sign and send the transaction
const txHash = await parentChainPublicClient.sendRawTransaction({
  serializedTransaction: await deployer.signTransaction(request),
});

// get the transaction receipt after waiting for the transaction to complete
const txReceipt = createRollupPrepareTransactionReceipt(
  await parentChainPublicClient.waitForTransactionReceipt({ hash: txHash }),
);
```

All the functions mentioned must be directly inspected in [TRUTH-SOURCE]. The repository must be adhered to as the ultimate source of truth while ensuring no function or library is invented or presumed beyond what is documented therein. Also, make absolutely sure the output and parameters are all included.

### Document Structure

1. **Introduction**

- Very briefly explain that by the end of this [ARTICLE], readers should know how to deploy an Orbit Rollup chain with `ETH` as token using the Orbit SDK, mention the [source of the example](https://github.com/OffchainLabs/arbitrum-orbit-sdk/tree/main/examples/create-rollup-eth), where the reader can find the code example. Print [CODE-BLOCK-1] as the example we'll use. And please add useful inline comments to the [CODE-BLOCK-1].

2. **Deploying an Orbit Rollup Chain Instance**

- Explain `createRollupPrepareTransactionRequest` as required by the [CODE-OUTPUT].
- Explain `createRollupPrepareConfig` as required by the [CODE-OUTPUT].
- Ensure steps are distinguished, instructions are coherent, and augmented with well-crafted code examples, provide a **complete** and **accurate** version of `chainConfig` in your example, and explain why `DataAvailabilityCommittee` set as `true` or `false` will determine whether the orbit chain will be a Rollup or an Anytrust chain.
Use [https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain](https://docs.arbitrum.io/launch-orbit-chain/how-tos/orbit-sdk-deploying-rollup-chain) to **enrich information** about funtions and their parameters.

3. **Next step**
- Briefly explain why the reader will have to set up a node to run their Orbit chain.
- You can draw from [SOURCE-1] for context and function use.

--------
