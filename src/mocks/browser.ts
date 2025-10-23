import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/index';

export const worker = setupWorker(...handlers);
