type Config = {
  httpApiUrl: string;
  wsApiUrl: string;
}

const config: Config = {
  httpApiUrl: process.env.HTTP_API_URL ?? '',
  wsApiUrl: process.env.NEXT_PUBLIC_WS_API_URL ?? ''
}

export default config;