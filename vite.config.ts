import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/ensembl': {
        target: 'https://rest.ensembl.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ensembl/, ''),
      },
      '/api/uniprot': {
        target: 'https://rest.uniprot.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/uniprot/, ''),
      },
      '/api/chembl': {
        target: 'https://www.ebi.ac.uk/chembl/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chembl/, ''),
      },
      '/api/alphafold': {
        target: 'https://alphafold.ebi.ac.uk/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/alphafold/, ''),
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
