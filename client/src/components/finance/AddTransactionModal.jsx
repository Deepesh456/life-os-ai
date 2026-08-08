import { useEffect, useState } from "react";

import {
  createTransaction,
  updateTransaction,
} from "../../services/financeService";

const defaultTransaction = {
  type: "Expense",
  title: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().slice(0, 10),
  notes: "",
};

const incomeCategories = [
  "Salary",
  "Business",
  "Investment",
  "Others",
];

const expenseCategories = [
  "Food",
  "Shopping",
  "Bills",
  "Travel",
  "Health",
  "Education",
  "Entertainment",
  "Others",
];

const AddTransactionModal = ({
  isOpen,
  onClose,
  refreshTransactions,
  transactionToEdit,
}) => {
  const [transaction, setTransaction] =
    useState(defaultTransaction);

  const isEditing =
    !!transactionToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setTransaction({
        type:
          transactionToEdit.type ||
          "Expense",

        title:
          transactionToEdit.title ||
          "",

        amount:
          transactionToEdit.amount ||
          "",

        category:
          transactionToEdit.category ||
          "Food",

        date:
          transactionToEdit.date?.slice(
            0,
            10
          ) ||
          new Date()
            .toISOString()
            .slice(0, 10),

        notes:
          transactionToEdit.notes ||
          "",
      });
    } else {
      setTransaction({
        ...defaultTransaction,
        date: new Date()
          .toISOString()
          .slice(0, 10),
      });
    }
  }, [
    isOpen,
    transactionToEdit,
    isEditing,
  ]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setTransaction((prev) => ({
        ...prev,
        type: value,
        category:
          value === "Income"
            ? "Salary"
            : "Food",
      }));

      return;
    }

    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!transaction.title.trim()) {
      alert("Enter transaction title.");
      return;
    }

    if (
      !transaction.amount ||
      Number(transaction.amount) <= 0
    ) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      const transactionData = {
        ...transaction,
        amount: Number(
          transaction.amount
        ),
      };

      if (isEditing) {
        await updateTransaction(
          transactionToEdit._id,
          transactionData
        );
      } else {
        await createTransaction(
          transactionData
        );
      }

      await refreshTransactions();

      onClose();

      setTransaction(
        defaultTransaction
      );
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to save transaction."
      );
    }
  };

  const categories =
    transaction.type === "Income"
      ? incomeCategories
      : expenseCategories;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >

      <div
        className="
          app-card
          rounded-2xl
          shadow-2xl
          w-full
          max-w-[650px]
          max-h-[90vh]
          overflow-y-auto
          p-8
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold app-title">
            {isEditing
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <button
            onClick={onClose}
            className="
              text-2xl
              app-muted
              hover:text-red-500
              transition
            "
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Type */}

          <select
            name="type"
            value={transaction.type}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          >
            <option value="Expense">
              Expense
            </option>

            <option value="Income">
              Income
            </option>
          </select>


          {/* Date */}

          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          />


          {/* Title */}

          <input
            type="text"
            name="title"
            placeholder="Transaction Title"
            value={transaction.title}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
              md:col-span-2
            "
          />


          {/* Amount */}

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            min="0"
            value={transaction.amount}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          />


          {/* Category */}

          <select
            name="category"
            value={transaction.category}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

        </div>


        {/* Notes */}

        <textarea
          rows="4"
          name="notes"
          placeholder="Notes..."
          value={transaction.notes}
          onChange={handleChange}
          className="
            app-input
            border
            rounded-lg
            p-3
            mt-4
            w-full
            resize-none
            outline-none
          "
        />


        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              px-6
              py-2
              rounded-lg
              bg-gray-200
              hover:bg-gray-300
              dark:bg-gray-700
              dark:hover:bg-gray-600
              app-title
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-6
              py-2
              rounded-lg
              bg-green-600
              hover:bg-green-700
              text-white
              transition
            "
          >
            {isEditing
              ? "Update"
              : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddTransactionModal;