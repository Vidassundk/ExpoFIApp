import "dotenv/config";

interface Extra {
  devBaseUrl: string;
  prodBaseUrl: string;
}

export default ({ config }: { config: any }) => ({
  ...config,
  extra: {
    devBaseUrl: process.env.DEV_BASE_URL,
    prodBaseUrl: process.env.PROD_BASE_URL,
  } as Extra,
});
