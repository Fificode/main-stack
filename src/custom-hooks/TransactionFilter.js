// import { useState, useEffect } from 'react';

// const useTransactionFilter = (transactions) => {
//   const [selectedPeriod, setSelectedPeriod] = useState('all');
//   const [filteredTransactions, setFilteredTransactions] = useState(transactions); // Initialize with all transactions

//   useEffect(() => {
//     const filterTransactions = (transactions, period) => {
//       if (!transactions) {
//         return [];
//       }
//       const now = new Date();

//       return transactions.filter((tx) => {
//         const txDate = new Date(tx.date);

//         if (period === 'today') {
//           return txDate.toDateString() === now.toDateString();
//         }

//         if (period === 'last7') {
//           const last7 = new Date();
//           last7.setDate(now.getDate() - 7);
//           return txDate >= last7 && txDate <= now;
//         }

//         if (period === 'thisMonth') {
//           return (
//             txDate.getMonth() === now.getMonth() &&
//             txDate.getFullYear() === now.getFullYear()
//           );
//         }

//         if (period === 'last3Months') {
//           const last3 = new Date();
//           last3.setMonth(now.getMonth() - 3);
//           return txDate >= last3 && txDate <= now;
//         }

//         return true; // 'all'
//       });
//     };

//     const filtered = filterTransactions(transactions, selectedPeriod);
//     setFilteredTransactions(filtered);
//   }, [transactions, selectedPeriod]); // Re-run filter when transactions or selectedPeriod change

//   return {
//     selectedPeriod,
//     setSelectedPeriod,
//     filteredTransactions,
//   };
// };

// export default useTransactionFilter;


// custom-hooks/TransactionFilter.js
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const useTransactionFilter = (transactions) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]
  const [transactionType, setTransactionType] = useState(null);
  const [transactionStatuses, setTransactionStatuses] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions || []);

  useEffect(() => {
    if (!transactions) {
      setFilteredTransactions([]);
      return;
    }

    let filtered = [...transactions];

    // Filter by period
    if (selectedPeriod === 'today') {
      filtered = filtered.filter(
        (t) => dayjs(t.date).isSame(dayjs(), 'day')
      );
    } else if (selectedPeriod === 'last7') {
      const sevenDaysAgo = dayjs().subtract(7, 'days');
      filtered = filtered.filter((t) => dayjs(t.date).isAfter(sevenDaysAgo));
    } else if (selectedPeriod === 'thisMonth') {
      filtered = filtered.filter(
        (t) => dayjs(t.date).isSame(dayjs(), 'month')
      );
    } else if (selectedPeriod === 'last3Months') {
      const threeMonthsAgo = dayjs().subtract(3, 'months');
      filtered = filtered.filter((t) => dayjs(t.date).isAfter(threeMonthsAgo));
    }

    // Filter by date range
    if (dateRange[0] && dateRange[1]) {
      const startDate = dayjs(dateRange[0]);
      const endDate = dayjs(dateRange[1]).endOf('day');
      filtered = filtered.filter((t) => {
        const transactionDate = dayjs(t.date);
        return transactionDate.isSame(startDate, 'day') ||
               transactionDate.isSame(endDate, 'day') ||
               (transactionDate.isAfter(startDate) && transactionDate.isBefore(endDate));
      });
    }

    // Filter by transaction type
    if (transactionType) {
      filtered = filtered.filter((t) => {
        // Adjust this logic based on how your transaction type is stored in the data
        const transactionTypeName = getTransactionTypeName(t); // Implement this function
        return transactionTypeName === transactionType;
      });
    }

    // Filter by transaction status
    if (transactionStatuses.length > 0) {
      filtered = filtered.filter((t) =>
        transactionStatuses.includes(t.status.charAt(0).toUpperCase() + t.status.slice(1))
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, selectedPeriod, dateRange, transactionType, transactionStatuses]);

  // Helper function to extract transaction type name from the transaction object
  const getTransactionTypeName = (transaction) => {
    if (transaction?.metadata?.product_name) {
      return "Store Transactions"; // Adjust based on your actual data
    }
    if (transaction?.type === "withdrawal") {
      return "Withdrawals";
    }
    // Add more conditions based on your data structure
    return null;
  };

  const clearFilters = () => {
    setSelectedPeriod('all');
    setDateRange([null, null]);
    setTransactionType(null);
    setTransactionStatuses([]);
  };

  return {
    selectedPeriod,
    setSelectedPeriod,
    dateRange,
    setDateRange,
    transactionType,
    setTransactionType,
    transactionStatuses,
    setTransactionStatuses,
    filteredTransactions,
    clearFilters,
  };
};

export default useTransactionFilter;