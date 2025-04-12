
'use client'
import React, { useState } from 'react'

const ObjectMatch = () => {
  const [object1, setObject1] = useState({});
  const [object2, setObject2] = useState({});
  const [differences, setDifferences] = useState(null);

  // Function to compare two objects and find differences
  const findDifferences = (obj1, obj2) => {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    const diff = {
      onlyInObj1: {},
      onlyInObj2: {},
      inBothButDifferent: {},
      sameInBoth: {}
    };

    allKeys.forEach(key => {
      // Key exists only in object 1
      if (key in obj1 && !(key in obj2)) {
        diff.onlyInObj1[key] = obj1[key];
      }
      // Key exists only in object 2
      else if (!(key in obj1) && key in obj2) {
        diff.onlyInObj2[key] = obj2[key];
      }
      // Key exists in both objects
      else {
        const val1 = obj1[key];
        const val2 = obj2[key];
        
        // Check if both values are objects (but not null)
        if (
          val1 && val2 && 
          typeof val1 === 'object' && typeof val2 === 'object' &&
          !Array.isArray(val1) && !Array.isArray(val2)
        ) {
          const nestedDiff = findDifferences(val1, val2);
          if (
            Object.keys(nestedDiff.onlyInObj1).length > 0 ||
            Object.keys(nestedDiff.onlyInObj2).length > 0 ||
            Object.keys(nestedDiff.inBothButDifferent).length > 0
          ) {
            diff.inBothButDifferent[key] = nestedDiff;
          } else {
            diff.sameInBoth[key] = val1;
          }
        }
        // For arrays, check if they're equal
        else if (Array.isArray(val1) && Array.isArray(val2)) {
          if (JSON.stringify(val1) !== JSON.stringify(val2)) {
            diff.inBothButDifferent[key] = {
              obj1Value: val1,
              obj2Value: val2
            };
          } else {
            diff.sameInBoth[key] = val1;
          }
        }
        // For primitive values
        else if (val1 !== val2) {
          diff.inBothButDifferent[key] = {
            obj1Value: val1,
            obj2Value: val2
          };
        } else {
          diff.sameInBoth[key] = val1;
        }
      }
    });

    return diff;
  };

  const handleCompare = () => {
    try {
      const parsedObj1 = typeof object1 === 'string' ? JSON.parse(object1) : object1;
      const parsedObj2 = typeof object2 === 'string' ? JSON.parse(object2) : object2;
      const result = findDifferences(parsedObj1, parsedObj2);
      setDifferences(result);
    } catch (error) {
      alert("Error comparing objects: " + error.message);
    }
  };

  const DisplayValue = ({ value }) => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (value === undefined) return <span className="text-gray-500">undefined</span>;
    if (typeof value === 'object') return <pre className="whitespace-pre-wrap break-words">{JSON.stringify(value, null, 2)}</pre>;
    return <span>{String(value)}</span>;
  };

  const DifferenceDisplay = ({ diff }) => {
    if (!diff) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comparison Results:</h3>
        
        {/* Keys only in first object */}
        {Object.keys(diff.onlyInObj1).length > 0 && (
          <div className="mb-4">
            <h4 className="text-md font-medium text-blue-600 mb-2">Keys only in first object:</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              {Object.entries(diff.onlyInObj1).map(([key, value]) => (
                <div key={`obj1-${key}`} className="mb-2">
                  <span className="font-medium">{key}: </span>
                  <DisplayValue value={value} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Keys only in second object */}
        {Object.keys(diff.onlyInObj2).length > 0 && (
          <div className="mb-4">
            <h4 className="text-md font-medium text-green-600 mb-2">Keys only in second object:</h4>
            <div className="bg-green-50 p-4 rounded-lg">
              {Object.entries(diff.onlyInObj2).map(([key, value]) => (
                <div key={`obj2-${key}`} className="mb-2">
                  <span className="font-medium">{key}: </span>
                  <DisplayValue value={value} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Keys in both but with different values */}
        {Object.keys(diff.inBothButDifferent).length > 0 && (
          <div className="mb-4">
            <h4 className="text-md font-medium text-amber-600 mb-2">Keys in both objects but with different values:</h4>
            <div className="bg-amber-50 p-4 rounded-lg">
              {Object.entries(diff.inBothButDifferent).map(([key, value]) => (
                <div key={`diff-${key}`} className="mb-3 pb-3 border-b border-amber-200 last:border-0">
                  <div className="font-medium mb-1">{key}:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-blue-100 p-2 rounded">
                      <div className="text-sm text-blue-700 mb-1">Object 1:</div>
                      {value.obj1Value !== undefined ? (
                        <DisplayValue value={value.obj1Value} />
                      ) : (
                        <DisplayValue value={value} />
                      )}
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <div className="text-sm text-green-700 mb-1">Object 2:</div>
                      {value.obj2Value !== undefined ? (
                        <DisplayValue value={value.obj2Value} />
                      ) : (
                        <DisplayValue value={value} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Keys that match in both objects */}
        {Object.keys(diff.sameInBoth).length > 0 && (
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-600 mb-2">Keys that match in both objects:</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {Object.entries(diff.sameInBoth).map(([key, value]) => (
                <div key={`same-${key}`} className="mb-2">
                  <span className="font-medium">{key}: </span>
                  <DisplayValue value={value} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Object Comparison Tool</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Object 1 (JSON format)
          </label>
          <textarea
            className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={typeof object1 === 'object' ? JSON.stringify(object1, null, 2) : object1}
            onChange={(e) => setObject1(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Object 2 (JSON format)
          </label>
          <textarea
            className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={typeof object2 === 'object' ? JSON.stringify(object2, null, 2) : object2}
            onChange={(e) => setObject2(e.target.value)}
            placeholder='{"name": "John", "age": 25}'
          />
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={handleCompare}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Compare Objects
        </button>
      </div>
      
      <DifferenceDisplay diff={differences} />
    </div>
  );
};

export default ObjectMatch;