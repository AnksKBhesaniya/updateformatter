'use client';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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

const tabs = ['Formatted Output', 'Editable Tasks', 'Charts'];

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [developerName, setDeveloperName] = useState<string>('');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [parsedTasks, setParsedTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Formatted Output');

  useEffect(() => {
    const savedText = localStorage.getItem('task_input');
    const savedDeveloperName = localStorage.getItem('developer_name');
    if (savedText) setInputText(savedText);
    if (savedDeveloperName) setDeveloperName(savedDeveloperName);
  }, []);

  useEffect(() => {
    localStorage.setItem('task_input', inputText);
  }, [inputText]);

  useEffect(() => {
    localStorage.setItem('developer_name', developerName);
  }, [developerName]);

  useEffect(() => {
    const checkOnlineStatus = async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        return;
      }
      try {
        const img = new Image();
        img.src = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png?' + new Date().getTime();
        img.onload = () => setIsOnline(true);
        img.onerror = () => setIsOnline(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsOnline(false);
      }
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
    checkOnlineStatus();

    const interval = setInterval(checkOnlineStatus, 5000);
    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  const getTodayDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 60 + minutes + (seconds >= 30 ? 1 : 0);
  };

  const convertTimeToReadable = (time: string): string => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0);
    const formattedHours = Math.floor(totalMinutes / 60);
    const formattedMinutes = totalMinutes % 60;
    return `${formattedHours > 0 ? formattedHours + ' hour ' : ''}${formattedMinutes > 0 ? formattedMinutes + ' min' : ''}`.trim();
  };

  const parseInput = (): void => {
    const lines = inputText.split('\n');
    const tasks: Task[] = [];

    lines.forEach((line) => {
      const match = line.match(/\(\s*(IIS\/TSK-\d+)\s*\) (.+?) - Worked Time: (\d{1,2}:\d{2}:\d{2}) \/ Est\. Time: (\d{1,2}:\d{2}) hrs?/);
      if (match) {
        const [, taskId, title, workedTime, plannedTime] = match;
        const workedMinutes = convertTimeToMinutes(workedTime);
        const plannedMinutes = convertTimeToMinutes(`${plannedTime}:00`);
        const status = workedMinutes >= plannedMinutes ? 'Done' : 'Pending';

        tasks.push({
          taskId,
          title,
          workedTime,
          plannedTime: `${plannedTime}:00`,
          status,
          reason: '',
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
      output += `${task.taskId} : ${task.title} [${worked}] [Planned: ${planned}] [${task.status}]${task.reason ? ` Reason: ${task.reason}` : ''}\n`;
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
    toast.success('Copied to clipboard!');
  };

  const getStatusDistribution = () => {
    const done = parsedTasks.filter((t) => t.status === 'Done').length;
    const pending = parsedTasks.length - done;
    return [
      { name: 'Done', value: done },
      { name: 'Pending', value: pending },
    ];
  };

  const getTimeDistribution = () => {
    let totalWorked = 0,
      totalPlanned = 0;
    parsedTasks.forEach((task) => {
      totalWorked += convertTimeToMinutes(task.workedTime);
      totalPlanned += convertTimeToMinutes(task.plannedTime);
    });
    return [
      { name: 'Worked Time', value: totalWorked },
      { name: 'Planned Time', value: totalPlanned },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <Toaster />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold">Task Formatter</h1>
        <p className="text-lg mt-2 text-gray-600">Track, format, and manage your task logs</p>
      </div>

      {!isOnline && (
        <div className="p-4 bg-red-500 text-white rounded-lg mb-6">
          You are offline. Please check your internet connection.
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <label className="block text-sm font-semibold mb-2">Developer Name</label>
        <input
          type="text"
          className="w-full p-3 rounded-md border border-gray-300 mb-4"
          value={developerName}
          onChange={(e) => setDeveloperName(e.target.value)}
          placeholder="Enter Developer Name"
        />

        <textarea
          className="w-full p-3 rounded-md border border-gray-300 mb-4"
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter task details here..."
        ></textarea>

        <button
          className="w-fit p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 mb-4"
          onClick={parseInput}
          disabled={!isOnline || !inputText || !developerName}
        >
          Generate Output
        </button>
      </div>

      {parsedTasks.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-center space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 text-sm rounded-md font-medium ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-blue-500 transition duration-200`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Editable Tasks' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Editable Task Summary</h2>
              {parsedTasks.map((task, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="font-semibold text-lg">{task.taskId} : {task.title}</div>
                  <div className="text-sm mb-2">
                    Worked: {convertTimeToReadable(task.workedTime)} | Planned: {convertTimeToReadable(task.plannedTime)} | Status:
                    <span
                      className={`font-bold ${
                        task.status === 'Done' ? 'text-green-500' : 'text-orange-500'
                      }`}
                    >
                      {' '}{task.status}
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-1 rounded-md border border-gray-300"
                    placeholder="Optional Reason"
                    value={task.reason}
                    onChange={(e) => updateReason(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Charts' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Task Status</h3>
                <ResponsiveContainer width="100%" height={300}>
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Worked vs Planned</h3>
                <ResponsiveContainer width="100%" height={300}>
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

          {activeTab === 'Formatted Output' && (
            <div>
              <pre className="bg-white p-6 rounded-lg shadow-lg whitespace-pre-wrap">{outputText}</pre>
              {outputText && (
                <div className='flex justify-center align-center'>
                  <button
                  className="w-fit p-3 bg-green-600 text-white rounded-md hover:bg-green-700 mt-6"
                  onClick={copyToClipboard}
                  disabled={!isOnline}
                >
                  Copy Output
                </button>
                  </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
