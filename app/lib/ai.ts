import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';

const bedrock = createAmazonBedrock({
  region: process.env.BEDROCK_AWS_REGION,
  accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY
});

export const model = bedrock('anthropic.claude-3-5-sonnet-20240620-v1:0');