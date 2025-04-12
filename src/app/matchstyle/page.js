// 'use client'

// import React, { useState } from 'react';
// import inlineStyleToClassName from '../../utils/inlineStyleToClassName';

// const StyleConverter = () => {
//   const [inlineStyle, setInlineStyle] = useState('');
//   const [outputClass, setOutputClass] = useState('');

//   const handleConvert = () => {
//     try {
//       const parsedStyle = JSON.parse(inlineStyle.replace(/'/g, '"'));
//       const className = inlineStyleToClassName(parsedStyle);
//       console.log(className,'className')
//       setOutputClass(className);
//     } catch (error) {
//       setOutputClass('Invalid JSON format');
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <textarea
//         className="w-full h-40 p-2 border border-gray-300 rounded"
//         placeholder='{"top": 0, "left": 0, "width": "50%", "zIndex": 2, "transition": "all 0.3s"}'
//         value={inlineStyle}
//         onChange={(e) => setInlineStyle(e.target.value)}
//       />
//       <button
//         className="mt-2 p-2 bg-blue-500 text-white rounded"
//         onClick={handleConvert}
//       >
//         Convert to Classnames
//       </button>
//       {outputClass && (
//         <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded">
//           <strong>Output Class Names:</strong> <span className="text-blue-600">{outputClass}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StyleConverter;

'use client'
import React, { useState } from 'react';
import inlineStyleToClassName from '../../utils/inlineStyleToClassName';

function InlineToClassConverter() {
    const [scssContent, setScssContent] = useState('');
    const [htmlInput, setHtmlInput] = useState('');
    const [convertedHtml, setConvertedHtml] = useState('');

    const handleScssChange = (e) => {
        setScssContent(e.target.value);
    };

    const handleHtmlChange = (e) => {
        setHtmlInput(e.target.value);
    };

    const convertInlineStyles = () => {
        try {
            const parsedScss = parseScss(scssContent);
            const htmlElement = document.createElement('div');
            htmlElement.innerHTML = htmlInput;

            const processElement = (element) => {
                if (element.hasAttribute && element.hasAttribute('style')) {
                    const inlineStyles = element.getAttribute('style');
                    const styleObject = parseInlineStyles(inlineStyles);
                    const classNames = findPartialMatchingClasses(parsedScss, styleObject);
                    if (classNames.length > 0) {
                        element.removeAttribute('style');
                        classNames.forEach(className => element.classList.add(className));
                    }
                }

                if (element.children) {
                    Array.from(element.children).forEach(processElement);
                }
            };

            processElement(htmlElement);
            setConvertedHtml(htmlElement.innerHTML);

        } catch (error) {
            console.error('Error during conversion:', error);
            setConvertedHtml('Error processing input. Check console for details.');
        }
    };

    const parseScss = (scss) => {
        const rules = {};
        const regex = /([^{]+){([^}]+)}/g;
        let match;

        while ((match = regex.exec(scss)) !== null) {
            const selector = match[1].trim();
            const declarations = match[2].trim().split(';').filter(Boolean);
            const styleObject = {};

            declarations.forEach((declaration) => {
                const [property, value] = declaration.split(':').map((s) => s.trim());
                styleObject[property] = value;
            });

            rules[selector] = styleObject;
        }

        return rules;
    };

    const parseInlineStyles = (inlineStyles) => {
        const styleObject = {};
        inlineStyles.split(';').forEach((style) => {
            const [property, value] = style.split(':').map((s) => s.trim());
            if (property && value) {
                styleObject[property] = value;
            }
        });
        return styleObject;
    };

    const findPartialMatchingClasses = (parsedScss, inlineStyleObject) => {
        const matchingClasses = [];
        for (const prop in inlineStyleObject) {
            const value = inlineStyleObject[prop];
            for (const selector in parsedScss) {
                const scssStyleObject = parsedScss[selector];
                if (scssStyleObject[prop] === value) {
                    const className = selector.replace('.', '').replace('#', '').split(' ')[0];
                    matchingClasses.push(className);
                }
            }
        }
        return Array.from(new Set(matchingClasses)); // Remove duplicates
    };

    return (
        <div className="converter-container">
            <h2>Inline Style to Class Converter</h2>
            <div>
                <label>SCSS Content:</label><br />
                <textarea rows="10" cols="50" value={scssContent} onChange={handleScssChange} />
            </div>
            <div>
                <label>HTML Input:</label><br />
                <textarea rows="10" cols="50" value={htmlInput} onChange={handleHtmlChange} />
            </div>
            <button onClick={convertInlineStyles}>Convert</button>
            <div>
                <h3>Converted HTML:</h3>
                <pre>{convertedHtml}</pre>
            </div>
        </div>
    );
}

export default InlineToClassConverter;
