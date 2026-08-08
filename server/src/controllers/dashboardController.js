const Task = require("../models/Task");
const Event = require("../models/Event");
const Goal = require("../models/Goal");
const Finance = require("../models/Finance");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);
    weekAgo.setHours(0, 0, 0, 0);

    const [
      todayEvents,
      pendingTasks,
      completedTasks,
      activeGoals,
      recentTransactions,
      allTransactions,
      weeklyEvents,
    ] = await Promise.all([
      Event.find({
        user: userId,
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      }).sort({ startTime: 1 }),

      Task.find({
        user: userId,
        completed: false,
      })
        .sort({ createdAt: -1 })
        .limit(5),

      Task.find({
        user: userId,
        completed: true,
      }),

      Goal.find({
        user: userId,
      }).limit(5),

      Finance.find({
        user: userId,
      })
        .sort({ date: -1 })
        .limit(5),

      Finance.find({
        user: userId,
      }),

      Event.find({
        user: userId,
        date: {
          $gte: weekAgo,
        },
      }),
    ]);

    // Finance totals
    const totalIncome = allTransactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = allTransactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Weekly Activity
    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const weeklyActivity = days.map((day) => ({
      day,
      count: 0,
    }));

    weeklyEvents.forEach((event) => {
      const dayIndex = new Date(event.date).getDay();
      weeklyActivity[dayIndex].count++;
    });

    res.json({
      status: "success",

      stats: {
        todayEvents: todayEvents.length,
        pendingTasks: pendingTasks.length,
        activeGoals: activeGoals.length,
        balance,
        totalIncome,
        totalExpense,
      },

      todayEvents,

      pendingTasks,

      activeGoals,

      recentTransactions,

      chartData: {
        completedTasks: completedTasks.length,

        pendingTasks: pendingTasks.length,

        income: totalIncome,

        expense: totalExpense,

        weeklyActivity,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardData,
};