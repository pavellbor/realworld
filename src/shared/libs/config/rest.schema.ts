import convict from 'convict';

export type RestSchema = {
  PORT: number;
};

const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
});
