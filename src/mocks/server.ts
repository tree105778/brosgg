import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/index';

export const server = setupServer(...handlers);
