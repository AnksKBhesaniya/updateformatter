'use client'

const Accordion = ({ children }) => (
  <div className="border rounded-md divide-y divide-gray-200 bg-white shadow-sm">{children}</div>
);

const AccordionItem = ({ value, children }) => (
  <div className="p-4">{children}</div>
);

const Card = ({ children }) => (
  <div className="border rounded-lg shadow-md bg-white">{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const ScrollArea = ({ children, className = '' }) => (
  <div className={`overflow-y-auto ${className}`}>{children}</div>
);

const ReactSOPPage = () => {
  return (
    <ScrollArea className="h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">React.js Standard Operating Procedure</h1>

      <Accordion>
        <AccordionItem value="env-setup">
          <h2 className="text-xl font-semibold">A. Environment Setup</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <p><strong>Purpose:</strong> Set up React.js development environment</p>
              <p><strong>When:</strong> Initial project setup</p>
              <p><strong>Who:</strong> React.js Developers</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Install Node.js (Windows/Mac via <a href="https://nodejs.org" className="text-blue-600 underline">nodejs.org</a>)</li>
                <li>Create React App:
                  <code className="block bg-gray-100 p-2 rounded">npx create-react-app project-name</code>
                </li>
                <li>Install React Router:
                  <code className="block bg-gray-100 p-2 rounded">npm i -s react-router-dom</code>
                </li>
                <li>Change Port in <code>package.json</code>:
                  <code className="block bg-gray-100 p-2 rounded">&quot;start&quot;: &quot;set PORT=3001 && react-scripts start&quot;</code>
                </li>
              </ul>
            </CardContent>
          </Card>
        </AccordionItem>

        <AccordionItem value="project-setup">
          <h2 className="text-xl font-semibold">B. New Project Setup</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold">a. Requirements Gathering</h3>
              <p>Document features, gather requirements from stakeholders.</p>
              <h3 className="font-semibold">b. Architecture</h3>
              <ul className="list-disc ml-6">
                <li>Initialize with <code>npm init</code>, install required packages</li>
                <li>Maintain dependency list</li>
              </ul>
              <h3 className="font-semibold">c. Dev Environment</h3>
              <p>Update keys, IPs, and clean assets</p>
              <h3 className="font-semibold">d. Backup</h3>
              <p>Use Git and connect via personal token</p>
            </CardContent>
          </Card>
        </AccordionItem>

        <AccordionItem value="lifecycle">
          <h2 className="text-xl font-semibold">C. Development Lifecycle</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold">1. Before Development</h3>
                <ul className="list-disc ml-6">
                  <li>Define objectives, edge cases, personas</li>
                  <li>Estimate & plan with Bizcompass</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">2. During Development</h3>
                <ul className="list-disc ml-6">
                  <li>Follow component structure and naming</li>
                  <li>Use shimmer, tooltips, external configs</li>
                  <li>Implement clean conditionals and reusable logic</li>
                  <li>Use error boundaries and <code>try...catch</code></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">3. After Development</h3>
                <ul className="list-disc ml-6">
                  <li>Run dev testing and cover edge cases</li>
                  <li>Clean up logs and unused code</li>
                  <li>Handover and prepare for deployment</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  );
};

export default ReactSOPPage;
