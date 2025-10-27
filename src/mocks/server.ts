import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/index';

export const server = setupServer(...handlers);

let initialized = false;

export function initServerMock() {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_API_MOCKING === 'true' &&
    !initialized
  ) {
    server.listen({ onUnhandledRequest: 'bypass' });
    initialized = true;
    console.log('[MSW] Server mock listening...');
  }
}
