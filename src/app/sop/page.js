'use client'

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ children }) => (
  <div className="rounded-xl bg-white shadow-md divide-y divide-gray-100">{children}</div>
);

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="px-6 py-4 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800 text-lg hover:text-blue-600 focus:outline-none"
      >
        {title}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && (
        <div className="mt-4 text-sm text-gray-700 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

const Card = ({ children }) => (
  <div className="rounded-lg border border-gray-200 bg-white shadow-sm">{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const ScrollArea = ({ children, className = '' }) => (
  <div className={`overflow-y-auto ${className}`}>{children}</div>
);

const SectionHeading = ({ children }) => (
  <h3 className="text-blue-700 font-semibold text-base border-b pb-1">{children}</h3>
);

const ReactSOP = () => {
  return (
    <ScrollArea className="h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          🚀 React.js Standard Operating Procedure
        </h1>

        <Accordion>
          <AccordionItem title="📁 Maintaining Code Structure" defaultOpen>
            <Card>
              <CardContent className="space-y-6">
                <div>
                  <SectionHeading>Why / When / Who</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li><strong>Why:</strong> Clean code, fast collaboration, easier debugging.</li>
                    <li><strong>When:</strong> During development.</li>
                    <li><strong>Who:</strong> Developers.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>✅ How / Procedure</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Use clear folder structures and modular components.</li>
                    <li>Only call necessary Redux state; avoid pulling full store.</li>
                    <li>Prefer data attributes over conditional class names.</li>
                    <li>Use spinners, shimmers, and tooltips.</li>
                    <li>Show ellipses for large text and “N/A” for missing values.</li>
                    <li>Encrypt sensitive data and avoid localStorage for sessions.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>📐 Follow Framework</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Keep static config in <code>Config.js</code>.</li>
                    <li>Don&apos;t rename or modify shared files without guidelines.</li>
                    <li>Only install approved packages.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>📷 Image / File Upload</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Restrict file size/type.</li>
                    <li>Disable form until upload finishes.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>🧠 Code Quality & Documentation</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Use readable variable/function names.</li>
                    <li>Comment on complex logic and document reusable functions.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>🧩 Modal & Tab API Calls</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Show UI immediately; load data in background.</li>
                    <li>Use shimmer loaders during fetch.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>📊 Grid UI Handling</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Only update changed data, avoid full reload.</li>
                    <li>Avoid calling APIs after unmount.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>🧾 Master Data in Forms</SectionHeading>
                  <ul className="list-disc ml-6">
                    <li>Load per tab, only when opened.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>⬇️ Dropdown Handling</SectionHeading>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Pre-fill from login data (e.g. country, branch).</li>
                    <li>Check hierarchy & status for employee master data.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>👨‍💼 Show Employee in Grid/View</SectionHeading>
                  <ul className="list-disc ml-6">
                    <li>Sync with latest local changes from Neel.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>♻️ Code DRYness</SectionHeading>
                  <ul className="list-disc ml-6">
                    <li>Create reusable functions and UI blocks.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>❗ Error Handling</SectionHeading>
                  <ul className="list-disc ml-6">
                    <li>Use <code>try...catch</code> for UI/DOM logic.</li>
                    <li>Show helpful error logs.</li>
                  </ul>
                </div>

                <div>
                  <SectionHeading>📦 Third-Party Libraries</SectionHeading>
                  <ul className="list-disc ml-6">
                    <li>Prefer popular and maintained libraries.</li>
                    <li>Check for customizability and documentation.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default ReactSOP;
