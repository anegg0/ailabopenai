# Pattern guide

## General guide
1. **Sentence-case** all sidebar/menu/title/header/list text.
2. When linking to things, avoid anchoring links to words like “here” or “this”. Use a descriptive anchor instead.
3. Don't modify quicklooks: e.g., <a data-quicklook-from="arbitrum-one">Arbitrum One</a>https://arbitrum.io/.
4. Address the reader as “you”.
5. Write like you’d speak to a smart friend who is in a rush.
6. Use contractions wherever it feels natural - this can help convey a friendly and informal tone.
7. Write for a specific audience doing a specific thing.
8. Lead with what matters most to the reader.
9. Supplement jargon with “just in case” definitions by using Quicklooks.
10. Spell out words like “and” or “or” in published docs.
11. Write brief and accessible text.
12. Tell the reader what to expect.
13. When in doubt, cut the content.
14. Accessible accuracy > technical precision whenever technical precision isn't needed.
15. Concisely set prior knowledge expectations at the top of the doc.
16. If there are prerequisites, identify the most important ones at the top of the doc.
17. More → [40 One-Sentence Writing Tips](https://joshspector.com/one-sentence-writing-tips/)
    
## **terminology guide**
        

| Term                                                                    | Acceptable spelling                                                                          | Not Acceptable spelling       |
|-------------------------------------------------------------------------+----------------------------------------------------------------------------------------------+-------------------------------|
| JavaScript                                                              | JavaScript                                                                                   | js, javascript, Javascript    |
| DApp                                                                    | first mention on page → decentralized app (dApp) subsequent mentions → dApp                  | dapp                          |
| Layer 1 / Layer 2                                                       | first mention → Layer 1 (L1) subsequent mentions → L1                                        | Layer-1 layer 1               |
| Geth                                                                    | Geth                                                                                         | geth                          |
| Oracle                                                                  | oracle                                                                                       | Oracle                        |
| Transactions                                                            | transaction, transactions                                                                    | tx’s, tx                      |
| Data availability server                                                | “Data availability server (DAS)” for first-mentions within docs; DAS for subsequent mentions | Data Availability Server      |
| Smart contract                                                          | “smart contract” for first mentions; “contract” or “smart contract” for subsequent mentions  | smartcontract                 |
| Cross-chain                                                             | cross-chain                                                                                  | cross chain, crosschain       |
| Arbitrum Goerli                                                         | Arbitrum Goerli                                                                              | Nitro Goerli Rollup testnet   |
| ERC-XX (ERC-20, ERC-721, …)                                             | ERC-XX ⇒ `ERC-20`, `ERC-721`, `ERC-1155`,…                                                   | ERC20, erc721, …              |
| WASM                                                                    | `WASM`                                                                                       | Wasm, WASM                    |
| JavaScript function names: createRollupConfig, sequencerInboxPrepareTransactionRequest...     | `sequencerInboxPrepareTransactionRequest`                              | sequencerInboxPrepareTransactionRequest                    |
| Whitelist/Allowlist                                                     | allowlist/denylist                                                                           | whitelist/blacklist           |
| Sequencer Coordination Manager                                          | Sequencer Coordination Manager (SQM)                                                         | sequencer coordinator manager |
| AnyTrust                                                                | AnyTrust                                                                                     | anytrust, Anytrust            |

        
## **frontmatter guide** - the YAML-like blocks that appear at the top of many of our markdown files
    - Document frontmatter looks like this:
        
        ```markdown
        ---
        title: "How to use oracles in Arbitrum"
        sidebar_label: Use oracles in Arbitrum
        author: <github alias>
        sme: <github alias>
        description: Learn how to integrate oracles into your dApp
        user_story: as a <developer, user, chain operator>, I want to _______
        content_type: <how-to, concept, etc>
        ---
        ```
        
    - We use it as a standard way to identify document metadata that helps us establish consistency through conventions.
    - The following frontmatter properties are especially useful:
        - `title` - the document’s title - renders into a `<h1>title</h1>` unless you override it with your own `h1` or `#title`
        - `sidebar_label` - determines how the document’s title appears from the sidebar. How-tos use this to remove “how to” from the title when rendered in the sidebar.
        - `description` - determines the text that appears when search engines display the content. Keyword-rich descriptions aligned with readers’ intent and search terms can help with SEO.
        - `user_story` - unofficial - helps us align on who we’re writing for and what they’re trying to do
        - `content_type` - unofficial - helps us align on one of our content types
        - `author` - unofficial - helps attribute work to authors, and eventually can help auto-assign issues on github
    
