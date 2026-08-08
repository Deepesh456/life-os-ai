import { useEffect, useMemo, useState } from "react";

import Layout from "../../components/layout/Layout";

import AddHealthModal from "../../components/health/AddHealthModal";
import HealthStats from "../../components/health/HealthStats";
import BMICard from "../../components/health/BMICard";
import WellnessScore from "../../components/health/WellnessScore";
import WeightHistoryChart from "../../components/health/WeightHistoryChart";
import SleepWaterChart from "../../components/health/SleepWaterChart";

import {
  getHealthRecords,
  deleteHealthRecord,
} from "../../services/healthService";

const Health = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState(null);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      setLoading(true);

      const res = await getHealthRecords();

      setRecords(
        res.data.records || []
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to load health records."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    const confirmDelete =
      window.confirm(
        "Delete this health record?"
      );

    if (!confirmDelete) return;

    try {
      await deleteHealthRecord(
        record._id
      );

      await fetchHealth();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Error deleting health record."
      );
    }
  };

  const latestRecord = records[0];

  const totalExercise = useMemo(() => {
    return records.reduce(
      (sum, item) =>
        sum +
        Number(
          item.exerciseMinutes || 0
        ),
      0
    );
  }, [records]);

  const averageSleep = useMemo(() => {
    if (!records.length) return 0;

    const total = records.reduce(
      (sum, item) =>
        sum +
        Number(
          item.sleepHours || 0
        ),
      0
    );

    return (
      total / records.length
    ).toFixed(1);
  }, [records]);

  const averageWater = useMemo(() => {
    if (!records.length) return 0;

    const total = records.reduce(
      (sum, item) =>
        sum +
        Number(
          item.waterIntake || 0
        ),
      0
    );

    return (
      total / records.length
    ).toFixed(1);
  }, [records]);

  return (
    <Layout>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold app-title">
            Health ❤️
          </h1>

          <p className="app-muted mt-2">
            Track your health and daily wellness.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedRecord(null);
            setOpen(true);
          }}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            shadow-md
            transition
          "
        >
          + Add Health Record
        </button>

      </div>


      {/* Loading */}

      {loading ? (

        <div className="app-card rounded-2xl shadow p-12 text-center">

          <div className="text-4xl mb-4">
            ❤️
          </div>

          <p className="app-title text-lg font-semibold">
            Loading Health Data...
          </p>

          <p className="app-muted mt-2">
            Please wait while your health records are loaded.
          </p>

        </div>

      ) : (

        <>

          {/* Stats */}

          <HealthStats
            latestRecord={latestRecord}
            records={records}
          />


          {/* BMI + Wellness */}

          <div className="grid lg:grid-cols-2 gap-6 mb-8">

            <BMICard
              latestWeight={
                latestRecord?.weight
              }
            />

            <WellnessScore
              records={records}
            />

          </div>


          {/* Weight History */}

          <div className="mb-8">

            <WeightHistoryChart
              records={records}
            />

          </div>


          {/* Sleep & Water */}

          <div className="mb-8">

            <SleepWaterChart
              records={records}
            />

          </div>


          {/* Health Records */}

          <div className="app-card rounded-2xl shadow overflow-hidden">

            <div className="p-6 border-b app-border">

              <h2 className="text-2xl font-bold app-title">
                Health History
              </h2>

              <p className="app-muted mt-1">
                Your recorded health activity.
              </p>

            </div>


            {/* Empty State */}

            {records.length === 0 ? (

              <div className="text-center py-16 px-6">

                <p className="text-5xl mb-4">
                  ❤️
                </p>

                <h3 className="text-xl font-bold app-title">
                  No health records yet
                </h3>

                <p className="app-muted mt-2">
                  Add your first health record
                  to start tracking your progress.
                </p>

                <button
                  onClick={() => {
                    setSelectedRecord(null);
                    setOpen(true);
                  }}
                  className="
                    mt-6
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  + Add Health Record
                </button>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead
                    className="
                      bg-gray-100
                      dark:bg-gray-800
                    "
                  >

                    <tr>

                      <th className="p-4 text-left app-title">
                        Date
                      </th>

                      <th className="p-4 app-title">
                        Weight
                      </th>

                      <th className="p-4 app-title">
                        Water
                      </th>

                      <th className="p-4 app-title">
                        Sleep
                      </th>

                      <th className="p-4 app-title">
                        Exercise
                      </th>

                      <th className="p-4 app-title">
                        Calories
                      </th>

                      <th className="p-4 app-title">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {records.map((item) => (

                      <tr
                        key={item._id}
                        className="
                          border-t
                          app-border
                          hover:bg-gray-50
                          dark:hover:bg-gray-800
                          transition
                        "
                      >

                        <td className="p-4 app-title">

                          {new Date(
                            item.date
                          ).toLocaleDateString(
                            "en-IN"
                          )}

                        </td>


                        <td className="p-4 text-center app-title">

                          {item.weight
                            ? `${item.weight} kg`
                            : "--"}

                        </td>


                        <td className="p-4 text-center app-title">

                          {item.waterIntake ||
                            0}{" "}
                          L

                        </td>


                        <td className="p-4 text-center app-title">

                          {item.sleepHours ||
                            0}{" "}
                          hrs

                        </td>


                        <td className="p-4 text-center app-title">

                          {item.exerciseMinutes ||
                            0}{" "}
                          min

                          {item.exerciseType && (
                            <div className="text-xs app-muted mt-1">
                              {item.exerciseType}
                            </div>
                          )}

                        </td>


                        <td className="p-4 text-center app-title">

                          {item.calories ||
                            0}

                        </td>


                        <td className="p-4 text-center">

                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() => {
                                setSelectedRecord(
                                  item
                                );

                                setOpen(true);
                              }}
                              className="
                                bg-blue-500
                                hover:bg-blue-600
                                text-white
                                px-3
                                py-1
                                rounded-lg
                                transition
                              "
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item
                                )
                              }
                              className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-3
                                py-1
                                rounded-lg
                                transition
                              "
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </>

      )}


      {/* Modal */}

      <AddHealthModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedRecord(null);
        }}
        refreshHealth={fetchHealth}
        healthToEdit={selectedRecord}
      />

    </Layout>
  );
};

export default Health;