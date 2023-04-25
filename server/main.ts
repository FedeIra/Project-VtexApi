import { env } from './config.js';
import { createProductHandler } from './handlers/createProduct.js';
import { config as configEnvVars } from 'dotenv';
import { createCategoryHandler } from './handlers/createCategory.js';
import { createBrandHandler } from './handlers/createBrand.js';
import { enableInventoryHandler } from './handlers/enableInventory.js';
import { createSkuHandler } from './handlers/createSku.js';
import fastify from 'fastify';
import { setupErrorHandler } from './error.js';

configEnvVars();

const app = fastify();

createBrandHandler(app);
createProductHandler(app);
createCategoryHandler(app);
enableInventoryHandler(app);
createSkuHandler(app);

setupErrorHandler(app);

const port = parseInt(env.port.get());
try {
  await app.listen({ port });
  console.log(`Listening at http://localhost:${port}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
