import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { signOut, currentUser, isLoading } = useAuth();
  const router = useNavigate();
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router("/login");
    }
  }, [currentUser, isLoading]);
  // State for the timer
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  // State for break timer
  const [breakTime, setBreakTime] = useState(300); // 5 minutes in seconds
  const [isBreakActive, setIsBreakActive] = useState(false);

  // Start or pause the timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Start or pause the break timer
  const toggleBreakTimer = () => {
    setIsBreakActive(!isBreakActive);
  };

  // Reset the timer and break timer
  const resetTimers = () => {
    setIsActive(false);
    setTime(1500);
    setIsBreakActive(false);
    setBreakTime(300);
  };

  // Effect for the main timer
  React.useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
      setIsBreakActive(true);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // Effect for the break timer
  React.useEffect(() => {
    let breakInterval;

    if (isBreakActive) {
      breakInterval = setInterval(() => {
        setBreakTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(breakInterval);
    }

    if (breakTime === 0) {
      clearInterval(breakInterval);
      setIsBreakActive(false);
      setTime(1500); // Reset the main timer
    }

    return () => clearInterval(breakInterval);
  }, [isBreakActive, breakTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
  

      <div className="flex flex-col items-start p-4">
        <div className="mt-0 p-0">
          <button
            className="text-red-500 font-semibold text-4xl"
            onClick={signOut}
          >
            Signout
          </button>
        </div>
      </div>
      <div className="w-full h-screen md:flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300">
        <div className="md:w-96 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Pomodoro Timer</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-center mb-2">
              Main Timer: {formatTime(time)}
            </h2>
            <div className="flex justify-center">
              <button
                className={`w-20 bg-blue-500 text-white rounded py-2 ${
                  isActive ? "bg-red-500" : "hover:bg-red-500"
                }`}
                onClick={toggleTimer}
              >
                {isActive ? "Pause" : "Start"}
              </button>
            </div>
          </div>

          {time === 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-center mb-2">
                Break Timer: {formatTime(breakTime)}
              </h2>
              <div className="flex justify-center">
                <button
                  className={`w-24 bg-green-500 text-white rounded py-2 ${
                    isBreakActive ? "bg-red-500" : "hover:bg-red-500"
                  }`}
                  onClick={toggleBreakTimer}
                >
                  {isBreakActive ? "Pause Break" : "Start Break"}
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              className="bg-gray-300 hover:bg-gray-400 py-2 px-6 rounded"
              onClick={resetTimers}
            >
              Reset Timers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
