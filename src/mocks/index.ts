import { champHandler } from '@/mocks/handlers/champHandler';
import { itemHandler } from '@/mocks/handlers/itemHandler';

export const handlers = [...champHandler, ...itemHandler];

export async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    return server.listen();
  } else {
    const { worker } = await import('./browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
  }
}
