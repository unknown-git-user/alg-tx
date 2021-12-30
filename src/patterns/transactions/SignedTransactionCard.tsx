import React from 'react';
import { SignedTransaction } from 'algosdk';
import { friendlyTypeName } from '../../lib/algo/transactions';
import { TransactionCardContent } from './shared';
import TransactionDetails from './Details';
import TransactionWarnings from './Warnings';
import { shortenAddress } from '../../lib/algo/address';

type SignedTransactionCardProps = {
  transaction: SignedTransaction;
};

const signer = ({ transaction }: SignedTransactionCardProps) => {
  if (transaction.sgnr) {
    return shortenAddress(transaction.sgnr);
  }
  return shortenAddress(transaction.txn.from);
};

const SignedTransactionCard = ({ transaction }: SignedTransactionCardProps) => (
  <div className="expandable-card bg-grey-50">
    <div className="header">
      <h3 className="mb-2">Signed {friendlyTypeName(transaction.txn.type)}</h3>
      <TransactionCardContent transaction={transaction} />
      <div className="text-sm text-subtle">
        Signed by: {signer({ transaction })}
      </div>
      <TransactionWarnings transaction={transaction.txn} />
    </div>
    <TransactionDetails txn={transaction.txn} signedTranasction={transaction} />
  </div>
);

export default SignedTransactionCard;
