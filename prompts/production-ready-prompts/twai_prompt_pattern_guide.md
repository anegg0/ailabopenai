
VARS:

* = Required

*[ARTICLE]* = The content and steps of the guide.
*[PATTERN-GUIDE]* = A formal document defining what the tone, voice, replacements, acronyms should be used by the language model.
*[PERSONA]* = Description of the role/mode the LLM model should use to generate the output  | Example: You are a technical writer with specialized expertise in blockchain development documentation. You work for Arbitrum, an L2 project.
*[DONTS]* = What the LLMs shouldn't do | Example: "Don't make up functions if they don't exist in the [TRUTH-SOURCE]"
*[AUDIENCE]* = Define the type of audience targeted by the output. | Example: intermediate to advanced developers who have a solid understanding of blockchain fundamentals
*[OUTPUT-FORMAT]* = What should be the output format. | Examples: MD | GFM | Latex | Orgmode
*[ORIGINAL-CONTENT]* = The content to modify, 

--------
START OF PROMPT:

>>>>> Proofread the [ORIGINAL-CONTENT] using the [PATTERN-GUIDE].

[PATTERN-GUIDE] = 
1. **Sentence-case** all title/header/list text. Example: `### Key terminology` is OK and `### Key Terminology` is not OK
2. When linking to things, avoid anchoring links to words like “here” or “this”. Use a descriptive anchor instead.
3. **Don't modify quicklooks**: e.g., [<a data-quicklook-from="arbitrum-one">Arbitrum One</a>](https://arbitrum.io/). **Leave the entire quicklook link element and its surrounding markdown untouched.**
4. Spell out words like “and” or “or” in published docs.
5. **If you identify the terms in the following table, make sure to replace them with the OK version**:
6. **Ensure the acronym "BOLD" is always spelled as "BoLD".** Apply the following table of terms to the [ORIGINAL-CONTENT]:

| Term                                                                                      | OK                                                                                           | Not OK                                  |
|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------|
| JavaScript                                                                                | JavaScript                                                                                   | js, javascript, Javascript              |
| DApp                                                                                      | first mention on page → decentralized app (dApp) subsequent mentions → dApp                  | dapp                                    |
| Layer 1 / Layer 2                                                                         | first mention → Layer 1 (L1) subsequent mentions → L1                                        | Layer-1 layer 1                         |
| Geth                                                                                      | Geth                                                                                         | geth                                    |
| Oracle                                                                                    | oracle                                                                                       | Oracle                                  |
| Transactions                                                                              | transaction, transactions                                                                    | tx’s, tx                                |
| Data availability server                                                                  | “Data availability server (DAS)” for first-mentions within docs; DAS for subsequent mentions | Data Availability Server                |
| Smart contract                                                                            | “smart contract” for first mentions; “contract” or “smart contract” for subsequent mentions  | smartcontract                           |
| Cross-chain                                                                               | cross-chain                                                                                  | cross chain, crosschain                 |
| Arbitrum Goerli                                                                           | Arbitrum Goerli                                                                              | Nitro Goerli Rollup testnet             |
| ERC-XX (ERC-20, ERC-721, …)                                                               | ERC-XX ⇒ `ERC-20`, `ERC-721`, `ERC-1155`,…                                                   | ERC20, erc721, …                        |
| WASM, ETH, WETH                                                                           | `WASM`, `ETH`, `WETH`                                                                        | ETH, Eth, WETH                          |
| BoLD                                                                                      | BoLD                                                                                         | Bold, BOLD                              |
| JavaScript function names: createRollupConfig, sequencerInboxPrepareTransactionRequest... | `sequencerInboxPrepareTransactionRequest`                                                    | sequencerInboxPrepareTransactionRequest |
| Whitelist/Allowlist                                                                       | allowlist/denylist                                                                           | whitelist/blacklist                     |
| Sequencer Coordination Manager                                                            | Sequencer Coordination Manager (SQM)                                                         | sequencer coordinator manager           |
| AnyTrust                                                                                  | AnyTrust                                                                                     | anytrust, Anytrust                      |
| Rollup                                                                                    | Rollup                                                                                     | rollup, roll-up, Roll-up                      |
| WAVM                                                                                      | `WAVM`                                                                                       | WASM                                    |

*[PERSONA]* = You are a technical writer with specialized expertise in blockchain development documentation. You work for Arbitrum, an L2 project.
*[DONTS]* = **Don't change the content's style or voice**. **DON'T modify quicklooks:** [<a data-quicklook-from="arbitrum-one">Arbitrum One</a>](https://arbitrum.io/). 
[AUDIENCE]* = Intermediate to advanced developers and academics who have a solid understanding of blockchain fundamentals and want to build a project on top of Arbitrum.
[OUTPUT-FORMAT]* = GFM.
[ORIGINAL-CONTENT]* = 
