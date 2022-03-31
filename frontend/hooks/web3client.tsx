import { useEffect, useReducer, useCallback, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { Hyphen, SIGNATURE_TYPES, RESPONSE_CODES } from "@biconomy/hyphen";

import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from '../reducers'

import { toast } from 'react-toastify'

const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Boilerplate Next',
      infuraId: `${process.env.NEXT_PUBLIC_INFURA_ID}`,
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: `${process.env.NEXT_PUBLIC_INFURA_ID}`,
    },
  },
}

let web3Modal: Web3Modal | null;
let hyphen: Hyphen | null;

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', 
    cacheProvider: false,
    providerOptions, 
  });
}

export const useWeb3 = () => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState)
  const { provider, web3Provider, address, network } = state;
  const [fromChain, setFromChain] = useState<any | null>();
  const [toChain, setToChain] = useState<any | null>();
  
  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect()
        const web3Provider = new ethers.providers.Web3Provider(provider)
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        const network = await web3Provider.getNetwork()

        let hyphen = new Hyphen( provider, {
          debug: true, 
          environment: "prod",
          onFundsTransfered: (data) => {
            console.log(data)
          }
        });
  
        await hyphen.init();

        toast.success('Connected to Web3')

        dispatch({
          type: 'SET_WEB3_PROVIDER',
          provider,
          web3Provider,
          address,
          network,
        } as Web3Action)

      } catch (e) {
        console.log('connect error', e)
      }
    } else {
      console.error('No Web3Modal')
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      toast.error('Disconnected from Web3')
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      } as Web3Action)
    } else {
      console.error('No Web3Modal')
    }
  }, [provider])

  const transfer = useCallback(async(address: string, tokenAddress: string, amount: number) => {
    try {
      if(hyphen){
        let preTransferStatus = await hyphen.preDepositStatus({
          tokenAddress: tokenAddress,
          amount: amount,
          fromChainId: 137,
          toChainId: 43114, // Chain id where tokens are supposed to be sent
          userAddress: address, // User wallet address who want's to do the transfer
        });

        if (preTransferStatus.code === RESPONSE_CODES.OK) {
          console.log("// ✅ ALL CHECKS PASSED. Proceed to do deposit transaction")
        } else if(preTransferStatus.code === RESPONSE_CODES.ALLOWANCE_NOT_GIVEN) {
          console.log("// ❌ Not enough apporval from user address on LiquidityPoolManager contract on fromChain")
        } else if (preTransferStatus.code === RESPONSE_CODES.UNSUPPORTED_NETWORK) {
          console.log("// ❌ Target chain id is not supported yet")
        } else if (preTransferStatus.code === RESPONSE_CODES.NO_LIQUIDITY) {
          console.log("// ❌ No liquidity available on target chain for given tokenn")
        } else if (preTransferStatus.code === RESPONSE_CODES.UNSUPPORTED_TOKEN) {
          console.log("// ❌ Requested token is not supported on fromChain yet")
        } else {
          console.log("// ❌ Any other unexpected error")
        }
      }

    } catch(error){
      console.log(error)
    }
  },[])

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info('Changed Web3 Account')
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        } as Web3Action)
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== 'undefined') {
          console.log('switched to chain...', _hexChainId)
          toast.info('Web3 Network Changed')
          window.location.reload()
        } else {
          console.log('window is undefined')
        }
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return {
    provider,
    web3Provider,
    address,
    network,
    web3Modal,
    connect,
    disconnect,
    transfer
  } as Web3ProviderState
}