import React from 'react';
import Dialog from '../../components/Dialog';
import '../../components/css/button.css';
import { Wallet } from '../../hooks/useWallets/types';
import { walletName } from '../../lib/helpers/wallet';
import AddressBox from '../AddressBox';

const WalletConnectDisconnectText = () => (
  <>
    <p className="my-2">
      Are you sure you want to disconnect your algorand wallet?
    </p>
    <p className="my-2">You can reconnect again via the connection menu.</p>
  </>
);

const MyAlgoDisconnectText = () => (
  <>
    <p className="my-2">
      This will remove the wallet from brx&apos;s wallet list, though My Algo
      will still track it.
    </p>
    <p className="my-2">
      To disconnect My Algo from brx, visit{' '}
      <a
        href="https://wallet.myalgo.com/settings"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary-h"
      >
        My Algo Settings
      </a>{' '}
      and remove brx from &quot;Connected Sites&quot;.
    </p>
  </>
);

const DisconnectWalletDialog = ({
  open,
  wallet,
  onClose,
}: {
  open: boolean;
  wallet?: Wallet;
  onClose: () => void;
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    title={`Disconnect ${wallet && walletName(wallet)}`}
    description={`This will disconnect your algorand wallet ${
      wallet && walletName(wallet)
    }`}
  >
    <div className="py-2">
      Address:
      <AddressBox address={wallet?.address || ''} />
    </div>
    {wallet?.type === 'WalletConnect' ? (
      <WalletConnectDisconnectText />
    ) : (
      <MyAlgoDisconnectText />
    )}
    <div className="flex flex-row justify-end mt-4 gap-2">
      <button onClick={onClose} className="btn-secondary">
        Cancel
      </button>
      <button
        className="btn-primary"
        onClick={async () => {
          await wallet?.disconnect();
          onClose();
        }}
      >
        Disconnect
      </button>
    </div>
  </Dialog>
);

export default DisconnectWalletDialog;
