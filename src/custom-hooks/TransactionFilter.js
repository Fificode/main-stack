import { useState, useEffect } from 'react';

const useTransactionFilter = (transactions) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions); // Initialize with all transactions

  useEffect(() => {
    const filterTransactions = (transactions, period) => {
      if (!transactions) {
        return [];
      }
      const now = new Date();

      return transactions.filter((tx) => {
        const txDate = new Date(tx.date);

        if (period === 'today') {
          return txDate.toDateString() === now.toDateString();
        }

        if (period === 'last7') {
          const last7 = new Date();
          last7.setDate(now.getDate() - 7);
          return txDate >= last7 && txDate <= now;
        }

        if (period === 'thisMonth') {
          return (
            txDate.getMonth() === now.getMonth() &&
            txDate.getFullYear() === now.getFullYear()
          );
        }

        if (period === 'last3Months') {
          const last3 = new Date();
          last3.setMonth(now.getMonth() - 3);
          return txDate >= last3 && txDate <= now;
        }

        return true; // 'all'
      });
    };

    const filtered = filterTransactions(transactions, selectedPeriod);
    setFilteredTransactions(filtered);
  }, [transactions, selectedPeriod]); // Re-run filter when transactions or selectedPeriod change

  return {
    selectedPeriod,
    setSelectedPeriod,
    filteredTransactions,
  };
};

export default useTransactionFilter;