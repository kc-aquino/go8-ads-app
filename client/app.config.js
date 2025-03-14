// app.config.js
import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      apiUrl: process.env.API_URL,
      socketUrl: process.env.SOCKET_URL
    },
  };
};
