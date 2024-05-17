import { Chain, createPublicClient, http } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import { prepareChainConfig, createRollupPrepareConfig } from '@arbitrum/orbit-sdk';
import { sanitizePrivateKey, generateChainId } from '@arbitrum/orbit-sdk/utils';
import { config } from 'dotenv';
import { writeFile } from 'fs/promises';

config();

function withFallbackPrivateKey(privateKey: string | undefined): `0x${string}` {
  if (typeof privateKey === 'undefined' || privateKey === '') {
    return generatePrivateKey();
  }

  return sanitizePrivateKey(privateKey);
}

function getBlockExplorerUrl(chain: Chain) {
  return chain.blockExplorers?.default.url;
}

if (typeof process.env.DEPLOYER_PRIVATE_KEY === 'undefined') {
  throw new Error(`Please provide the "DEPLOYER_PRIVATE_KEY" environment variable`);
}

// Load or generate a random batch poster account
const batchPosterPrivateKey = withFallbackPrivateKey(process.env.BATCH_POSTER_PRIVATE_KEY);
const batchPoster = privateKeyToAccount(batchPosterPrivateKey).address;

// Load or generate a random validator account
const validatorPrivateKey = withFallbackPrivateKey(process.env.VALIDATOR_PRIVATE_KEY);
const validator = privateKeyToAccount(validatorPrivateKey).address;

// Set the parent chain and create a public client for it
const parentChain = arbitrumSepolia;
const parentChainPublicClient = createPublicClient({ chain: parentChain, transport: http() });

// Load the deployer account
const deployer = privateKeyToAccount(sanitizePrivateKey(process.env.DEPLOYER_PRIVATE_KEY));

// Function to handle BigInt serialization in JSON
function bigintReplacer(key: any, value: any) {
  if (typeof value === 'bigint') {
    return value.toString(); // Convert BigInt to string for JSON serialization
  }
  return value;
}

async function main() {
  // Generate a random chain id
  const chainId = generateChainId();

  // Create the chain config
  const chainConfig = prepareChainConfig({
    chainId,
    arbitrum: { InitialChainOwner: deployer.address, DataAvailabilityCommittee: true },
  });

  // Serialize the chainConfig object using the custom replacer for BigInt
  const jsonChainConfig = JSON.stringify(await chainConfig, null, 2);

  // Prepare the transaction for deploying the core contracts
  const config = await createRollupPrepareConfig({
    chainId: BigInt(chainId), // Already a BigInt
    owner: deployer.address,
    chainConfig,
  });

  const jsonConfig = JSON.stringify(await config, bigintReplacer, 2); // Use the replacer function here as well

  // Write the chainConfig to a JSON file
  try {
    await writeFile('chainConfig.json', jsonChainConfig);
    console.log('chainConfig has been saved to chainConfig.json');
  } catch (error) {
    console.error('Failed to write chainConfig to a file:', error);
  }

  try {
    await writeFile('config.json', jsonConfig);
    console.log('config has been saved to config.json');
  } catch (error) {
    console.error('Failed to write config to a file:', error);
  }
}

main();
