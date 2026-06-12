import { createApp } from './bootstrap';

async function bootstrap() {
  const server = await createApp();
  server.listen(process.env.PORT ?? 3001);
}
void bootstrap();
