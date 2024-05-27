### 
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

Proofread the [ORIGINAL-CONTENT] using the following find and replace rules and the [PATTERN-GUIDE]. Ensure all headers are in sentence-case capitalization.

## Find and Replace Rules
| Incorrect Terms                                                                                            | Correct Terms                                                                            |
|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| JavaScript, js, javascript, Javascript                                                                     | JavaScript                                                                               |
| DApp, dapp                                                                                                 | first mention on page → decentralized app (dApp); subsequent mentions → dApp             |
| Layer 1 / Layer 2,  Layer-1, layer 1                                                                       | first mention → Layer 1 (L1); subsequent mentions → L1                                   |
| Geth, geth                                                                                                 | Geth                                                                                     |
| Oracle, Oracle                                                                                             | oracle                                                                                   |
| Transactions, tx’s, tx                                                                                     | transaction, transactions                                                                |
| Data availability server, Data Availability Server                                                         | “Data availability server (DAS)” for first-mentions within docs; DAS for subsequent mentions |
| Smart contract, smartcontract                                                                              | “smart contract” for first mentions; “contract” or “smart contract” for subsequent mentions |
| Cross-chain, cross chain, crosschain                                                                       | cross-chain                                                                              |
| Arbitrum Goerli, Nitro Goerli Rollup testnet                                                               | Arbitrum Goerli                                                                          |
| ERC-XX (ERC-20, ERC-721, …), ERC20, erc721, …                                                              | ERC-XX ⇒ `ERC-20`, `ERC-721`, `ERC-1155`,…                                               |
| WASM, ETH, WETH, ETH, Eth, WETH                                                                            | `WASM`, `ETH`, `WETH`                                                                    |
| BoLD, BOLD, Bold, BOLD                                                                                      | BoLD                                                                                     |
| JavaScript function names: createRollupConfig, sequencerInboxPrepareTransactionRequest...                  | `sequencerInboxPrepareTransactionRequest`                                                |
| Whitelist, blacklist                                                                                       | allowlist, denylist                                                                       |
| Sequencer Coordination Manager, sequencer coordinator manager                                              | Sequencer Coordination Manager (SQM)                                                     |
| AnyTrust, anytrust, Anytrust                                                                                | AnyTrust                                                                                 |
| Rollup, rollup, roll-up, Roll-up                                                                           | Rollup                                                                                   |
| WAVM, WASM                                                                                                 | `WAVM`                                                                                   |
- Don't modify quicklooks: e.g., <a data-quicklook-from="arbitrum-one">Arbitrum One</a>. Leave the entire quicklook link element and its surrounding markdown untouched.

*[PERSONA]* = You are a technical writer with specialized expertise in blockchain development documentation. You work for Arbitrum, an L2 project.
*[DONTS]* = **Don't change the content's style or voice**. **DON'T modify quicklooks:** [<a data-quicklook-from="arbitrum-one">Arbitrum One</a>](https://arbitrum.io/). 
[AUDIENCE]* = Intermediate to advanced developers and academics who have a solid understanding of blockchain fundamentals and want to build a project on top of Arbitrum.
[OUTPUT-FORMAT]* = GFM.
[ORIGINAL-CONTENT]* = 
## Overview

Under the hood, BoLD can offer time-bounded, permissionless validation because a correct <a data-quicklook-from="arbitrum">Arbitrum</a> state assertion is not tied to a single validator or entity. Instead, claims are tied to deterministic Merkle proofs and hashes that will be proven on Ethereum. Any party can bond capital to the correct state and, through interactive fraud proofs, have their claim proven correct. This means that a single honest party bonding on the correct state assertion will always win disputes, guaranteed.

To put it simply, Arbitrum’s current dispute protocol assumes that any assertion that gets challenged must be defended against by each unique challenger. It is similar to a 1-vs-1 tournament, where the honest party may participate in one or more concurrent tournaments at any time. BoLD, on the other hand, enables an all-vs-all battle royal between two categories: Good vs Evil, where there must and will always be a single winner in the end.

Validators on Arbitrum can post their claim on the validity of state roots, known as **assertions**. Ethereum, of course, does not know anything about the validity of these Arbitrum state roots, but it _can_ help prove their correctness. _Anyone_ in the world can then initiate a challenge over any unconfirmed assertion to start the protocol’s game.

The assertions being disputed concern block hashes of an <a data-quicklook-from="arbitrum-chain">Arbitrum chain</a> at a given batch/inbox position. Given that Arbitrum chains are deterministic, there is only one correct history for all parties running the standard Nitro software. Using the notion of one-step proof, Ethereum can check whether someone is making a fraudulent assertion.

If a claim is honest, it can be confirmed on Ethereum after a 6.4-day period (although the DAO can change this period). If a claim is malicious, anyone who knows the correct Arbitrum state can successfully challenge it within that 6.4-day window _and always win_ within a challenge period.

The current implementation of BoLD involves both on-chain and off-chain components:

1. Rollup contracts to be deployed on Ethereum.

2. New challenge management contracts to be deployed on Ethereum.

3. [Honest validator software](https://github.com/offchainlabs/bold) equipped to submit assertions and perform challenge moves on any assertions it disagrees with. The honest validator is robust enough to win against malicious entities and always ensures honest assertions are the only ones confirmed on-chain.

### Key terminology

- **Arbitrum Rollup Contracts:** The set of smart contracts on Ethereum L1 that serve as both the data availability layer for Arbitrum and for confirming the rollup's state assertions after a challenge period has passed for each assertion made

- **Assertions:** A claim posted to the Arbitrum Rollup contracts on Ethereum L1 about the Arbitrum L2 execution state. Each claim consumes messages from the Arbitrum Rollup inbox contract. Each assertion can be confirmed after a period of 6.4 days, and anyone can challenge it during that period. A BoLD challenge will add an additional upper bound of 6.4 days to confirm an assertion. If an assertion is challenged near the end of 6.4 days, an additional 6.4 days will be needed to complete the challenge. Gaining the right to post assertions requires placing a large, one-time bond, which can get taken away in the case of losing a challenge to a competing assertion. Opening challenges requires opening smaller “challenge-bonds” each time.

- **Validating Bridge:** The smart contract that leverages Ethereum's security and censorship-resistance to unlock bridged assets from L2 back to L1. Assets can be unlocked after an assertion has been posted and confirmed after a challenge period has passed

- **Fraud Proofs:** Proofs of a single step of `WAVM` execution of Arbitrum's state transition function, which are submitted to Ethereum and verified in the `EVM` via a smart contract. These proofs allow Ethereum to be the final arbiter of disagreements over assertions in the Rollup contracts, which cannot be falsified by any parties as there is only a single, correct result of executing a `WASM` instruction on a pre-state.

- **Challenge Protocol:** A set of rules through which a disagreement on an assertion is resolved using Ethereum as the final arbiter. Ethereum's VM can verify one-step proofs of deterministic computation that can confirm a challenge winner in Arbitrum's Rollup contracts.

- **Bonding of funds:** Creating an assertion in the Rollup contracts requires the submitter to join the validator set by putting up a large bond in the form of `WETH`. Subsequent assertions posted by the same party do not require more bonds. Instead, the protocol always considers validators to be bonded to their latest posted assertion. The bonded funds are taken away if another competing assertion is confirmed. In the case of confirming an assertion, the associated bonded funds can be withdrawn

- **Honest Validator**: An entity that knows the correct state of the Arbitrum L2 chain and will participate in confirming assertions and challenging invalid assertions if they exist

- **Challenge Period:** Window of time ([~6.4 days on Arbitrum One](https://docs.arbitrum.io/build-decentralized-apps/reference/chain-params)) over which an assertion can be challenged, after which the assertion can be confirmed. This is configurable by the DAO.

- **Edge**: Edges are a portion of a claim made by a validator about the history of the chain from some end state all the way back to some initial state. Edges are the fundamental unit in a challenge.

- **Delay Attacks:** In a delay attack, a malicious party (or group of parties) acts within the Rollup protocol, forcing the honest party to play 1-vs-1 games against them to delay the confirmation of results back to the L1 chain. BoLD has a proven, constant upper bound on confirmation times for assertions in Arbitrum, addressing the biggest flaw of the current challenge mechanism. BoLD validators don’t need to play 1-vs-1 challenges and instead can defend a single challenge against many malicious claims. With delay attacks solved, Arbitrum will be able to allow permissionless validation

- **Permissionless Validation:** The ability for anyone to interact with the Arbitrum Rollup contracts on Ethereum to both post assertions and challenge others' assertions without needing permission. With the release of BoLD, the Rollup contracts on Arbitrum will no longer have a permissioned list of validators.

- **Validator Software:** Software that has knowledge of the correct Arbitrum L2 state at any point. It tracks the on-chain Rollup contracts for assertions posted and will automatically initiate challenges on malicious assertions if configured to do so by the user. It will participate in new and existing challenges and make moves as required by the protocol to win against any number of malicious entities. Its goal is to ensure only honest assertions about Arbitrum's state are confirmed on Ethereum. All Arbitrum full nodes are watchtower validators by default. This means they do not post claims or assertions unless configured to do so but will warn in case invalid assertions are detected on-chain.

### How BoLD Uses Ethereum

When it comes to implementing the protocol, BoLD needs to be deployed on a credibly-neutral, censorship-resistant backend to be fair to all participants. As such, Ethereum was chosen as the perfect candidate. Ethereum is currently the most decentralized, secure, smart contract blockchain to which the full protocol can be deployed, with challenge moves performed as transactions to the protocol’s smart contracts.

A helpful mental model for understanding the system is that it uses Ethereum itself as the ultimate referee for deciding assertion results. Participants in the challenge protocol can disagree over the _results of L2 state transitions_ and provide proofs to the protocol smart contracts that show which result is correct. Because computation is deterministic, there will always be a single correct result.

![900px-img](../assets/KSf_Image_1.png)

_From the **[Nitro whitepaper](https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf)**. L2 blocks are “settled to L1” after a 6.4 day period for each, during which anyone can challenge their validity on Ethereum._

In effect, there is a miniature Arbitrum state-transition VM[ ](https://sourcegraph.com/github.com/OffchainLabs/nitro/-/blob/contracts/src/osp/OneStepProofEntry.sol)[deployed as an Ethereum smart contrac](https://sourcegraph.com/github.com/OffchainLabs/nitro/-/blob/contracts/src/osp/OneStepProofEntry.sol)t to prove which assertions are correct. However, computation on Ethereum is expensive, which is why this mini-VM is built to handle “one-step proofs” consisting of a single step of WebAssembly code. The Arbitrum state transition logic, written in Golang, is also compiled to an assembly language called <a data-quicklook-from="wasm">`WASM`</a> and will therefore obtain the same results as the VM found in the on-chain smart contract. The soundness of the protocol depends on the assumptions that computation is deterministic and equivalent between the on-chain VM and the Golang state transition compiled to `WASM`.

All actors in the protocol have a local state from which they can produce valid proofs, and all honest parties will have the same local state. Malicious entities, however, can deviate from the honest parties in attempts to confirm invalid states through the protocol. Both the protocol and the honest validator client’s job is then to allow honest parties to always win against any number of malicious participants by always claiming the absolute truth.

### On-chain components

- **Rollup Contract:** This is a smart contract that lives on Ethereum and allows validators to bond on state assertions about Arbitrum. This contract, known as `RollupCore.sol`, is already used by Arbitrum chains to post assertions. BoLD requires several changes to how assertions work in this contract, and it now contains a reference to another contract called a `ChallengeManager`, new in BoLD.

- **ChallengeManager:** This is a contract that allows for initiating challenges on assertions within the `AssertionChain` and provides methods for anyone to participate in challenges in a permissionless fashion. This new challenge protocol will require a new `ChallengeManager` written in Solidity and deployed to Ethereum. The challenge manager contains entry points for making challenge moves, opening leaves, creating subchallenges, and confirming challenges.

- **OneStepProver:** A set of contracts that implement a miniature `WASM` VM capable of executing one-step-proofs of computation of the L2 state transition function. This is implemented in Solidity and already exists on Ethereum. No changes to the `OSP` contracts are needed for BoLD.

**Bonding:** Participants in the protocol need to bond a certain amount of `ETH` (`WETH` is used in the BoLD testnet) to gain the privilege of posting assertions to the Rollup contracts by locking up an `ETH` bond in the protocol contracts. Whenever someone wants to challenge an assertion, they must also place a smaller bond called a challenge bond in their challenge. Bonds, their rationale, and magnitude will be covered in greater detail in the Specifications section.

### Off-chain components

- **Chain bindings:** Software that can interact with an Ethereum node in order to make calls and transactions to the on-chain contracts needed for participating in the protocol. We utilize go-ethereum’s abigen utilities to create Go bindings to interact with the contracts above, with a few more developer-friendly wrappers.

- **State manager backend:** Software that can retrieve L2 chain states and produce commitments to `WAVM` histories for Arbitrum based on an execution server. The validator client, described below, will have access to a state manager backend in order to make moves on challenge vertices.

- **Validator Client:** A validator client is software that knows the correct history of the Arbitrum L2 chain via a state manager backend and can create assertions on L1 about them by bonding a claim. A validator is also active in ensuring honest assertions get confirmed and participating in challenging those it disagrees with. In BoLD, an honest validator will also participate in challenges other validators are a part of to support other honest participants. It interacts with the on-chain components via chain bindings described above.

- **Challenge Manager Client:** Software that can manage the life cycles of challenges a validator participates in. Validators need to participate in multiple challenges at once and manage individual challenge vertices correctly to act upon, confirm, or reject them. This and the validator's responsibilities can be coupled into a single binary.

### Assertions

A key responsibility for Arbitrum validators is to post claims about the Arbitrum chains’ state to Ethereum at certain checkpoints. These are known as assertions. Assertions contain information, most critically:

1. The L2 block hash being claimed

2. The batch number it corresponds to for the Arbitrum chain

3. The number of messages in the Arbitrum inbox at the time the assertion was posted on-chain

The following assertion to be posted on-chain must consume, at least, the specified number of inbox messages from its parent. There is a required delay in L1 blocks for assertion posting. Currently, this value is set to 1 hour for BoLD.

Anyone can confirm assertions after a period of 6.4 days if they have not been challenged. In particular, assertions facilitate the process of withdrawing from Arbitrum back to Ethereum. Arbitrum withdrawals require specifying a blockhash, which must be confirmed as an assertion on-chain. This is why withdrawals have a delay of 6.4 days if they are not actively challenged.

Validators must become proposers in the Rollup contract before being allowed to post assertions. This involves placing a one-time bond of 3600 `WETH` that is locked in the contract until they choose to withdraw. Validators can only withdraw their bond if their latest posted assertion gets confirmed. Every assertion a validator posts will become their latest bonded assertion. Subsequent bonds are not needed to post more assertions, instead, the protocol “moves” a validator’s bonds to their latest posted assertion.

Assertions form a chain in which there can be forks. For instance, a validator might disagree with the L2 blockhash of an assertion at a given batch. All <a data-quicklook-from="arbitrum-nitro">Arbitrum Nitro</a> nodes are configured to warn users if they observe an assertion they disagree with posted on-chain. However, if a node is configured as a validator and has deposited a bond to the rollup contract, then that validator post the correct, rival assertion to any invalid one it just observed. The validator will also be able to initiate a challenge by posting a challenge bond and other data to the `ChallengeManager`, signaling it is disputing an assertion.

#### Overflow assertions

Given the mandatory delay of one hour between assertions posted on-chain, and each assertion is a claim to a specific Arbitrum batch, there could be a very large number of blocks in between assertions. However, a single assertion only supports a maximum of 2^26 Arbitrum blocks since its parent. If this value is overflowed, a follow-up overflow assertion needs to be posted to consume the rest of the blocks above the maximum. This overflow assertion will not be subject to the mandatory 1-hour delay between assertions.

#### Trustles Bonding Pools

A large upfront assertion bond is critical for discouraging malicious actors from attacking Arbitrum and spamming the network (e.g., delay attacks), especially because malicious actors will always lose challenges and their entire bond. On the other hand, requiring such a high upfront assertion bond may be prohibitive for a single honest entity to put up—especially since the cost to defend Arbitrum is proportional to the number of malicious entities and ongoing challenges at any given point in time.

To address this, there is a [contract](https://github.com/OffchainLabs/bold/blob/main/contracts/src/assertionStakingPool/AssertionStakingPoolCreator.sol) that anyone can use to deploy a trustless, bonding (or staking) pool as a way of crowdsourcing funds from others who wish to help defend Arbitrum, but who may otherwise not individually be able to put up the sizeable upfront bond itself.

Anyone can deploy an assertion bonding pool using the `AssertionStakingPoolCreator.sol` contract as a means to crowdsource funds for bonding funds to an assertion. To defend Arbitrum using one of these pools, an entity would first deploy this pool with the assertion they believe is correct and wish to bond on to challenge an adversary's assertion. Then, anyone can verify that the claimed assertion is correct by running the inputs through their node's State Transition Function (`STF`). If other parties agree that the assertion is correct, they can deposit their funds into the contract. When enough funds have been deposited, anyone can trigger the creation of the assertion on-chain to start the challenge in a trustless manner. Finally, once the dispute protocol confirms the honest parties' assertion, all involved entities will get their funds reimbursed and can withdraw.

<a data-quicklook-from="trustless">Trustless</a> bonding pools can also be created to open challenges and make moves on challenges without sacrificing decentralization.

END OF PROMPT

I can't seem to get a correct output


<!-- Local Variables: -->
<!-- gptel-model: "gpt-4o" -->
<!-- gptel--backend-name: "ChatGPT" -->
<!-- gptel--bounds: ((6 . 1164) (1166 . 1217) (1219 . 6970)) -->
<!-- End: -->
