import { Logger } from '@nestjs/common';
import { createApp } from './bootstrap';

async function bootstrap() {
  const server = await createApp();
  const port = process.env.PORT ?? 3001;
  server.listen(port, () => {
    Logger.log(`API listening at http://localhost:${port}`, 'Bootstrap');
  });
}
void bootstrap();
