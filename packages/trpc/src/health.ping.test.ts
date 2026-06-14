import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { createCaller } from './index.js';

describe('health.ping', () => {
  it('returns ok and timestamp', async () => {
    const caller = createCaller({
      commentService: {
        listByTargetId: async () => [],
        create: async () => {
          throw new Error('not implemented');
        },
        setApproved: async () => {
          throw new Error('not implemented');
        },
        delete: async () => {
          throw new Error('not implemented');
        },
      },
    });

    const result = await caller.health.ping();

    assert.equal(result.ok, true);
    assert.equal(typeof result.ts, 'number');
  });
});
