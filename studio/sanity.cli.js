import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'bm13g5ye', // <-- Replace with your Sanity Project ID
    dataset: 'production'
  }
});
