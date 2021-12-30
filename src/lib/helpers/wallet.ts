import { Wallet } from '../../hooks/useWallets/types';
import { shortenAddress } from '../algo/address';

export const prettyWalletType = (wallet: Wallet) => {
  switch (wallet.type) {
    case 'WalletConnect':
      return 'Algorand App';
    case 'MyAlgo':
      return 'My Algo';
    default:
      // @ts-ignore
      throw new Error(`Unknown wallet type ${wallet.type}`);
  }
};

export const walletName = (wallet: Wallet) => {
  if (wallet.name) {
    return wallet.name;
  }
  return shortenAddress(wallet.address);
};
