import { useEffect, useMemo, useState } from "react";

import Layout from "../../components/layout/Layout";
import FinanceStats from "../../components/finance/FinanceStats";
import AddTransactionModal from "../../components/finance/AddTransactionModal";
import ExpensePieChart from "../../components/finance/ExpensePieChart";
import IncomeExpenseBarChart from "../../components/finance/IncomeExpenseBarChart";
import MonthlyTrendChart from "../../components/finance/MonthlyTrendChart";
import SmartFinanceInsights from "../../components/finance/SmartFinanceInsights";

import {
  getTransactions,
  deleteTransaction,
} from "../../services/financeService";

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();

      setTransactions(res.data.transactions || []);
      setStats(res.data.stats || {});
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (transaction) => {
    if (!window.confirm("Delete this transaction?")) {
      return;
    }

    try {
      await deleteTransaction(transaction._id);
      fetchTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return (
    <Layout>

      {/* Header */}

      <div className="flex justify-between items-start mb-8">

        <div>
          <h1 className="text-4xl font-bold app-title">
            Finance 💰
          </h1>

          <p className="app-text mt-2">
            Track your income and expenses.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTransaction(null);
            setOpen(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          + Add Transaction
        </button>

      </div>


      {/* Finance Statistics */}

      <FinanceStats stats={stats} />


      {/* Search & Filter */}

      <div className="app-card rounded-2xl shadow p-5 mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 bg-transparent border app-border rounded-lg p-3 app-title outline-none placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="bg-transparent border app-border rounded-lg p-3 app-title outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

        </div>

      </div>


      {/* Transactions */}

      <div className="app-card rounded-2xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="app-secondary">

              <tr>

                <th className="p-4 text-left app-title">
                  Title
                </th>

                <th className="p-4 app-title">
                  Category
                </th>

                <th className="p-4 app-title">
                  Date
                </th>

                <th className="p-4 app-title">
                  Amount
                </th>

                <th className="p-4 app-title">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 app-muted"
                  >
                    No Transactions Found
                  </td>

                </tr>

              ) : (

                filteredTransactions.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t app-border hover:bg-gray-50 dark:hover:bg-slate-700/50 transition"
                  >

                    {/* Title */}

                    <td className="p-4">

                      <div className="font-semibold app-title">
                        {item.title}
                      </div>

                      <small
                        className={`font-medium ${
                          item.type === "Income"
                            ? "app-success"
                            : "app-danger"
                        }`}
                      >
                        {item.type}
                      </small>

                    </td>


                    {/* Category */}

                    <td className="text-center">

                      <span className="app-secondary app-text px-3 py-1 rounded-full text-sm">
                        {item.category}
                      </span>

                    </td>


                    {/* Date */}

                    <td className="text-center app-text">

                      {new Date(
                        item.date
                      ).toLocaleDateString("en-IN")}

                    </td>


                    {/* Amount */}

                    <td
                      className={`text-center font-bold ${
                        item.type === "Income"
                          ? "app-success"
                          : "app-danger"
                      }`}
                    >

                      {item.type === "Income"
                        ? "+ "
                        : "- "}

                      ₹
                      {Number(
                        item.amount
                      ).toLocaleString("en-IN")}

                    </td>


                    {/* Actions */}

                    <td className="text-center">

                      <button
                        onClick={() => {
                          setSelectedTransaction(item);
                          setOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <ExpensePieChart
          transactions={transactions}
        />

        <IncomeExpenseBarChart
          stats={stats}
        />

      </div>


      {/* Monthly Trend */}

      <div className="mt-8">

        <MonthlyTrendChart
          transactions={transactions}
        />

      </div>


      {/* Smart Insights */}

      <SmartFinanceInsights
        transactions={transactions}
        stats={stats}
      />


      {/* Transaction Modal */}

      <AddTransactionModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedTransaction(null);
        }}
        refreshTransactions={
          fetchTransactions
        }
        transactionToEdit={
          selectedTransaction
        }
      />

    </Layout>
  );
};

export default Finance;