import { toHexString } from '@chainsafe/ssz'
import { MemoryLevel } from 'memory-level'

import type { StateNetwork } from './state.js'
import type { Debugger } from 'debug'

export class StateDB {
  db: MemoryLevel<string, Uint8Array>
  logger: Debugger | undefined
  state?: StateNetwork
  blocks: Map<number, string>
  stateRoots: Map<string, string>
  constructor(state?: StateNetwork) {
    this.db = new MemoryLevel({
      createIfMissing: true,
      valueEncoding: 'view',
    })
    this.state = state
    this.logger = state?.logger.extend('StateDB')
    this.stateRoots = new Map()
    this.blocks = new Map()
  }

  /**
   * Store content by content key
   * @param contentKey
   * @param content
   * @returns true if content is stored successfully
   */
  async storeContent(contentKey: Uint8Array, content: Uint8Array) {
    await this.db.put(toHexString(contentKey), content)
    return true
  }

  /**
   * Get content by content key
   * @param contentKey
   * @returns stored content or undefined
   */
  async getContent(contentKey: Uint8Array): Promise<Uint8Array | undefined> {
    return this.db.get(toHexString(contentKey))
  }
}
