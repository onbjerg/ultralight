import { Button, FormControl, HStack, Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { AppContext, StateChange } from '../globalReducer'

export default function GetBlockByHash() {
  const { state, dispatch } = useContext(AppContext)
  const [blockHash, setBlockhash] = useState('')
  async function eth_getBlockByHash(blockHash: string, includeTransactions: boolean) {
    try {
      const block = await state!.historyProtocol!.ETH.getBlockByHash(blockHash, includeTransactions)
      dispatch!({ type: StateChange.SETBLOCK, payload: block })
    } catch {
      return 'Block not found'
    }
  }

  async function handleClick() {
    dispatch!({ type: StateChange.TOGGLELOADING })
    await eth_getBlockByHash(blockHash, true)
    dispatch!({ type: StateChange.TOGGLELOADING })
  }

  return (
    <HStack marginY={1}>
      <Button width={'40%'} onClick={handleClick}>
        Get Block by Hash
      </Button>
      <FormControl isInvalid={!blockHash.startsWith('0x')}>
        <Input
          bg="whiteAlpha.800"
          placeholder={`BlockHash`}
          type={'string'}
          onChange={(e) => setBlockhash(e.target.value)}
        />
      </FormControl>
    </HStack>
  )
}