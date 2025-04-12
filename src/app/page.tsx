/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

type Task = {
  taskId: string;
  title: string;
  workedTime: string;
  plannedTime: string;
  status: string;
  reason: string;
};

const COLORS = ['#4ade80', '#f97316'];

const tabs = ["Formatted Output", "Editable Tasks", "Charts"];

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [developerName, setDeveloperName] = useState<string>("Aniket");
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [parsedTasks, setParsedTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Formatted Output");

  useEffect(() => {
    const savedText = localStorage.getItem('task_input');
    if (savedText) setInputText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('task_input', inputText);
  }, [inputText]);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        return;
      }
      try {
        const img = new Image();
        img.src = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png?" + new Date().getTime();
        img.onload = () => setIsOnline(true);
        img.onerror = () => setIsOnline(false);
      } catch (error) {
        setIsOnline(false);
      }
    };

    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);
    checkOnlineStatus();

    const interval = setInterval(checkOnlineStatus, 5000);
    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + (seconds >= 30 ? 1 : 0);
  };

  const convertTimeToReadable = (time: string): string => {
    const [hours, minutes, seconds] = time.split(":" ).map(Number);
    const totalMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0);
    const formattedHours = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;
    return `${formattedHours > 0 ? formattedHours + " hour " : ""}${formattedMinutes > 0 ? formattedMinutes + " min" : ""}`.trim();
  };

  const parseInput = (): void => {
    const lines = inputText.split("\n");
    const tasks: Task[] = [];

    lines.forEach((line) => {
      const match = line.match(/\(\s*(IIS\/TSK-\d+)\s*\) (.+?) - Worked Time: (\d{1,2}:\d{2}:\d{2}) \/ Est\. Time: (\d{1,2}:\d{2}) hrs?/);
      if (match) {
        const [, taskId, title, workedTime, plannedTime] = match;
        const workedMinutes = convertTimeToMinutes(workedTime);
        const plannedMinutes = convertTimeToMinutes(`${plannedTime}:00`);
        const status = workedMinutes >= plannedMinutes ? "Done" : "Pending";

        tasks.push({
          taskId,
          title,
          workedTime,
          plannedTime: `${plannedTime}:00`,
          status,
          reason: "",
        });
      }
    });

    setParsedTasks(tasks);
    generateFinalOutput(tasks);
  };

  const generateFinalOutput = (tasks: Task[]): void => {
    let output = `Update List (${getTodayDate()})\nDeveloper Name:- ${developerName}\n\n`;
    tasks.forEach((task) => {
      const worked = convertTimeToReadable(task.workedTime);
      const planned = convertTimeToReadable(task.plannedTime);
      output += `${task.taskId} : ${task.title} [${worked}] [Planned: ${planned}] [${task.status}]${task.reason ? ` Reason: ${task.reason}` : ""}\n`;
    });
    setOutputText(output);
  };

  const updateReason = (index: number, reason: string): void => {
    const updatedTasks = [...parsedTasks];
    updatedTasks[index].reason = reason;
    setParsedTasks(updatedTasks);
    generateFinalOutput(updatedTasks);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(outputText);
    toast.success("Copied to clipboard!");
  };

  const getStatusDistribution = () => {
    const done = parsedTasks.filter(t => t.status === 'Done').length;
    const pending = parsedTasks.length - done;
    return [
      { name: 'Done', value: done },
      { name: 'Pending', value: pending },
    ];
  };

  const getTimeDistribution = () => {
    let totalWorked = 0, totalPlanned = 0;
    parsedTasks.forEach(task => {
      totalWorked += convertTimeToMinutes(task.workedTime);
      totalPlanned += convertTimeToMinutes(task.plannedTime);
    });
    return [
      { name: 'Worked Time', value: totalWorked },
      { name: 'Planned Time', value: totalPlanned },
    ];
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Task Formatter</h1>
      {!isOnline && (
        <div className="p-2 mb-4 bg-red-500 text-white rounded">
          No Internet Connection
        </div>
      )}
      <button
        className="px-4 py-2 mb-4 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={() => window.location.reload()}
      >
        Refresh Connection
      </button>

      <input
        className="w-full p-2 mb-4 border rounded-md"
        type="text"
        placeholder="Enter Developer Name"
        value={developerName}
        onChange={(e) => setDeveloperName(e.target.value)}
      />

      <textarea
        className="w-full p-2 mb-2 border rounded-md"
        rows={10}
        placeholder="Enter task details..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <div className="text-sm text-gray-500 mb-2">{inputText.length} characters, {inputText.split("\n").length} lines</div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        onClick={parseInput}
        disabled={!isOnline}
      >
        Generate Output
      </button>

      {parsedTasks.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full border ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Editable Tasks" && (
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Editable Task Summary</h2>
              {parsedTasks.map((task, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <div className="font-semibold">
                    {task.taskId} : {task.title}
                  </div>
                  <div className="text-sm mb-1">
                    Worked: {convertTimeToReadable(task.workedTime)} | Planned: {convertTimeToReadable(task.plannedTime)} | Status:
                    <span className={`font-bold ${task.status === "Done" ? "text-green-600" : "text-orange-500"}`}>
                      {" "}{task.status}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    placeholder="Optional Reason"
                    value={task.reason}
                    onChange={(e) => updateReason(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "Charts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-md font-bold mb-2">Task Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={getStatusDistribution()} dataKey="value" nameKey="name" outerRadius={70} label>
                      {getStatusDistribution().map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-md font-bold mb-2">Worked vs Planned</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={getTimeDistribution()} dataKey="value" nameKey="name" outerRadius={70} label>
                      {getTimeDistribution().map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "Formatted Output" && (
            <div>
              <pre className="mt-4 p-4 bg-white rounded-md whitespace-pre-wrap">
                {outputText}
              </pre>
              {outputText && (
                <button
                  className="px-4 py-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={copyToClipboard}
                  disabled={!isOnline}
                >
                  Copy Output
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
