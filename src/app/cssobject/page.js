import React from 'react';
import cssToObject from 'css-to-object';

function Page() {
    // Static CSS content (paste your full CSS file content here)
    const cssContent = `
    :root {
  --common-dark: #111727;
  --dark: #111727;
  --dark-text: #111727;
  --dark-transparent: rgba(17, 23, 39, 0.15);

  --dark-100: #e5e5ea;
  --dark-100-transparent: rgba(229, 229, 234, 0.15);
  --dark-200: #cdccd7;
  --dark-200-transparent: rgba(205, 204, 215, 0.15);
  --dark-300: #b3b2c2;
  --dark-300-transparent: rgba(179, 178, 194, 0.15);
  --dark-400: #9b99ae;
  --dark-400-transparent: rgba(155, 153, 174, 0.15);
  --dark-500: #81809a;
  --dark-500-transparent: rgba(129, 128, 154, 0.15);
  --dark-600: #686786;
  --dark-600-transparent: rgba(104, 103, 134, 0.15);
  --dark-700: #4e4c72;
  --dark-700-transparent: rgba(78, 76, 114, 0.15);
  --dark-800: #36345d;
  --dark-800-transparent: rgba(54, 52, 93, 0.15);
  --dark-900: #1d1a49;
  --dark-900-transparent: rgba(29, 26, 73, 0.15);
    --common-gray: #222222;
  --gray: #222222;
  --gray-text: #222222;
  --gray-transparent: rgba(34, 34, 34, 0.15);

  --gray-100: #f7f7f7;
  --gray-100-transparent: rgba(247, 247, 247, 0.15);
  --gray-200: #e1e1e1;
  --gray-200-transparent: rgba(225, 225, 225, 0.15);
  --gray-300: #cfcfcf;
  --gray-300-transparent: rgba(207, 207, 207, 0.15);
  --gray-400: #b1b1b1;
  --gray-400-transparent: rgba(177, 177, 177, 0.15);
  --gray-500: #9e9e9e;
  --gray-500-transparent: rgba(158, 158, 158, 0.15);
  --gray-600: #7e7e7e;
  --gray-600-transparent: rgba(126, 126, 126, 0.15);
  --gray-700: #626262;
  --gray-700-transparent: rgba(98, 98, 98, 0.15);
  --gray-800: #515151;
  --gray-800-transparent: rgba(81, 81, 81, 0.15);
  --gray-900: #3b3b3b;
  --gray-900-transparent: rgba(59, 59, 59, 0.15);
    --common-primary: #5956e3;
  --primary: #5956E3;
  --primary-text: #5956E3;
  --primary-transparent: rgba(89, 86, 227, 0.15);

  --primary-100: #e2dffd;
  --primary-100-transparent: rgba(226, 223, 253, 0.15);
  --primary-200: #c3c2f9;
  --primary-200-transparent: rgba(195, 194, 249, 0.15);
  --primary-300: #a5a1f4;
  --primary-300-transparent: rgba(165, 161, 244, 0.15);
  --primary-400: #8A8EF0;
  --primary-400-transparent: rgba(63, 81, 181, 0.09);
  --primary-500: #5956E3;
  --primary-500-transparent: rgba(89, 86, 227, 0.15);
  --primary-600: #4A49D1;
  --primary-600-transparent: rgba(74, 73, 209, 0.15);
  --primary-700: #3B39BF;
  --primary-700-transparent: rgba(59, 57, 191, 0.15);
  --primary-800: #2C28AD;
  --primary-800-transparent: rgba(44, 40, 173, 0.15);
  --primary-900: #1D1B99;
  --primary-900-transparent: rgba(29, 27, 153, 0.15);
    --common-info: #0092C2;
  --info: #0092C2;
  --info-text: #0092C2;
  --info-transparent: rgba(0, 146, 194, 0.15);

  --info-100: #E6F7FB;
  --info-100-transparent: rgba(230, 247, 251, 0.15);
  --info-200: #C3EAF3;
  --info-200-transparent: rgba(195, 234, 243, 0.15);
  --info-300: #A0DCEC;
  --info-300-transparent: rgba(160, 220, 236, 0.15);
  --info-400: #7DCEE5;
  --info-400-transparent: rgba(125, 206, 229, 0.15);
  --info-500: #0092C2;
  --info-500-transparent: rgba(0, 146, 194, 0.15);
  --info-600: #3998B3;
  --info-600-transparent: rgba(57, 152, 179, 0.15);
  --info-700: #287A90;
  --info-700-transparent: rgba(40, 122, 144, 0.15);
  --info-800: #185C6E;
  --info-800-transparent: rgba(24, 92, 110, 0.15);
  --info-900: #0D3C4B;
  --info-900-transparent: rgba(13, 60, 75, 0.15);
    --common-success: #1DAB45;
  --success: #1DAB45;
  --success-text: #1DAB45;
  --success-transparent: rgba(29, 171, 69, 0.15);

  --success-100: #A4E0A3;
  --success-100-transparent: rgba(164, 224, 163, 0.15);
  --success-200: #7AD47B;
  --success-200-transparent: rgba(122, 212, 123, 0.15);
  --success-300: #56C75C;
  --success-300-transparent: rgba(86, 199, 92, 0.15);
  --success-400: #32BA3D;
  --success-400-transparent: rgba(50, 186, 61, 0.15);
  --success-500: #1DAB45;
  --success-500-transparent: rgba(29, 171, 69, 0.15);
  --success-600: #17903C;
  --success-600-transparent: rgba(23, 144, 60, 0.15);
  --success-700: #147537;
  --success-700-transparent: rgba(20, 117, 55, 0.15);
  --success-800: #115B32;
  --success-800-transparent: rgba(17, 91, 50, 0.15);
  --success-900: #0E482C;
  --success-900-transparent: rgba(14, 72, 44, 0.15);

  --success-light-100: #e8f6f2;
    --common-danger: #D30808;
  --danger: #D30808;
  --danger-text: #D30808;
  --danger-transparent: rgba(211, 8, 8, 0.15);

  --danger-100: #F7D0D0;
  --danger-100-transparent: rgba(247, 208, 208, 0.15);
  --danger-200: #F1A7A7;
  --danger-200-transparent: rgba(241, 167, 167, 0.15);
  --danger-300: #EC7F7F;
  --danger-300-transparent: rgba(236, 127, 127, 0.15);
  --danger-400: #E75757;
  --danger-400-transparent: rgba(231, 87, 87, 0.15);
  --danger-500: #D30808;
  --danger-500-transparent: rgba(211, 8, 8, 0.15);
  --danger-600: #B10606;
  --danger-600-transparent: rgba(177, 6, 6, 0.15);
  --danger-700: #8F0505;
  --danger-700-transparent: rgba(143, 5, 5, 0.15);
  --danger-800: #6D0404;
  --danger-800-transparent: rgba(109, 4, 4, 0.15);
  --danger-900: #4B0303;
  --danger-900-transparent: rgba(75, 3, 3, 0.15);
    --common-warning: #ffa600;
  --warning: #ffa600;
  --warning-text: #ffa600;
  --warning-transparent: rgba(255, 166, 0, 0.15);

  --warning-100: #fff3e0;
  --warning-100-transparent: rgba(255, 243, 224, 0.15);
  --warning-200: #ffe0b2;
  --warning-200-transparent: rgba(255, 224, 178, 0.15);
  --warning-300: #ffcc80;
  --warning-300-transparent: rgba(255, 204, 128, 0.15);
  --warning-400: #ffb74d;
  --warning-400-transparent: rgba(255, 183, 77, 0.15);
  --warning-500: #ffa600;
  --warning-500-transparent: rgba(255, 166, 0, 0.15);
  --warning-600: #fb8c00;
  --warning-600-transparent: rgba(251, 140, 0, 0.15);
  --warning-700: #f57c00;
  --warning-700-transparent: rgba(245, 124, 0, 0.15);
  --warning-800: #ef6c00;
  --warning-800-transparent: rgba(239, 108, 0, 0.15);
  --warning-900: #e65100;
  --warning-900-transparent: rgba(230, 81, 0, 0.15);
    --common-purple: #976AF8;
  --purple: #976AF8;
  --purple-text: #976AF8;
  --purple-transparent: rgba(151, 106, 248, 0.15);

  --purple-100: #F2E9FE;
  --purple-100-transparent: rgba(242, 233, 254, 0.15);
  --purple-200: #DFC8FD;
  --purple-200-transparent: rgba(223, 200, 253, 0.15);
  --purple-300: #CBA6FB;
  --purple-300-transparent: rgba(203, 166, 251, 0.15);
  --purple-400: #B787F9;
  --purple-400-transparent: rgba(183, 135, 249, 0.15);
  --purple-500: #976AF8;
  --purple-500-transparent: rgba(151, 106, 248, 0.15);
  --purple-600: #7D55D6;
  --purple-600-transparent: rgba(125, 85, 214, 0.15);
  --purple-700: #6543B3;
  --purple-700-transparent: rgba(101, 67, 179, 0.15);
  --purple-800: #4D3190;
  --purple-800-transparent: rgba(77, 49, 144, 0.15);
  --purple-900: #351F6E;
  --purple-900-transparent: rgba(53, 31, 110, 0.15);

  --purple-light-100: #fbfaff;
  --purple-light-200: #f4f1fd;
  --purple-light-300: #ece6ff;
  --purple-light-400: #e6dcf8;
  --purple-light-500: #d7ccfa;
    --common-white: #FFFFFF;
  --white: #FFFFFF;
  --white-text: #ffffff;
  --white-transparent: rgba(255, 255, 255, 0.15);

  --white-100: #F9F9F9;
  --white-100-transparent: rgba(249, 249, 249, 0.15);
  --white-200: #F0F0F0;
  --white-200-transparent: rgba(240, 240, 240, 0.15);
  --white-300: #E8E8E8;
  --white-300-transparent: rgba(232, 232, 232, 0.15);
  --white-400: #D8D8D8;
  --white-400-transparent: rgba(216, 216, 216, 0.15);
  --white-500: #B8B8B8;
  --white-500-transparent: rgba(184, 184, 184, 0.15);
  --white-600: #A0A0A0;
  --white-600-transparent: rgba(160, 160, 160, 0.15);
  --white-700: #888888;
  --white-700-transparent: rgba(136, 136, 136, 0.15);
  --white-800: #707070;
  --white-800-transparent: rgba(112, 112, 112, 0.15);
    --common-black: #000000;
  --black: #000000;
  --black-text: #000000;
  --black-transparent: rgba(0, 0, 0, 0.15);
    --common-pink: #ff0a7d;
  --pink: #ff0a7d;
  --pink-text: #ff0a7d;
  --pink-transparent: rgba(255, 10, 125, 0.15);

  --pink-100: #f6e4ec;
  --pink-100-transparent: rgba(246, 228, 236, 0.15);
    --common-cyan: #2f9191;
  --cyan: #2f9191;
  --cyan-text: #2f9191;
  --cyan-transparent: rgba(47, 145, 145, 0.15);
    --cyan-100: #d7f2f3;
  --cyan-100-transpartent: rgba(215, 242, 243, 0.15);
    --secondary: #6C757D;
  --secondary-light: #ADB5BD;
  --secondary-transparent: rgba(108, 117, 125, 0.15);
    --transparent: rgba(0, 0, 0, 0);
      --success-light-common: #1DAB45;
  --orange-light-common: #e6ba95;
  --purple-light-common: #8d6ec5;
  --pink-light-common: #986d8e;
    --semi-dark: #111727;
  --semi-white: #ffffff;
  --semi-primary: #5956E3;
  --semi-gray-100: #f7f7f7;
  --semi-gray-200: #e1e1e1;
  --semi-gray-300: #cfcfcf;
  --semi-gray-400: #b1b1b1;
  --semi-gray-500: #9e9e9e;
  --semi-gray-600: #b1b1b1;
  --semi-gray-700: #626262;
  --semi-gray-800: #515151;
  --semi-gray-900: #3b3b3b;
    --common-dark: #111727;
  --dark: #e1e1e1;
  --dark-text: #e1e1e1;
  --dark-transparent: rgba(17, 23, 39, 0.25);

  --dark-100: #1d1a49;
  --dark-100-transparent: rgba(229, 229, 234, 0.25);
  --dark-200: #36345d;
  --dark-200-transparent: rgba(205, 204, 215, 0.25);
  --dark-300: #4e4c72;
  --dark-300-transparent: rgba(78, 76, 114, 0.25);
  --dark-400: #686786;
  --dark-400-transparent: rgba(155, 153, 174, 0.25);
  --dark-500: #81809a;
  --dark-500-transparent: rgba(129, 128, 154, 0.25);
  --dark-600: #9b99ae;
  --dark-600-transparent: rgba(104, 103, 134, 0.25);
  --dark-700: #b3b2c2;
  --dark-700-transparent: rgba(78, 76, 114, 0.25);
  --dark-800: #cdccd7;
  --dark-800-transparent: rgba(205, 204, 215, 0.25);
  --dark-900: #e5e5ea;
  --dark-900-transparent: rgba(29, 26, 73, 0.25);
    --semi-dark: #e1e1e1;
  --semi-white: #222222;
  --semi-primary: #e1e1e1;
  --semi-gray-100: #111111;
  --semi-gray-200: #333333;
  --semi-gray-300: #626262;
  --semi-gray-400: #b1b1b1;
  --semi-gray-500: #9e9e9e;
  --semi-gray-600: #b1b1b1;
  --semi-gray-700: #cfcfcf;
  --semi-gray-800: #e1e1e1;
  --semi-gray-900: #e1e1e1;
    }
    `;
    function cssToObject(cssString) {
      const cssObject = {};
      const regex = /([\w\-\.\#\s,:]+)\s*\{\s*([^}]*)\s*\}/g;
      let match;
  
      while ((match = regex.exec(cssString)) !== null) {
          const selector = match[1].trim();
          const propertiesString = match[2].trim();
          const properties = {};
  
          propertiesString.split(";").forEach((prop) => {
              if (prop) {
                  const [key, value] = prop.split(":").map((s) => s.trim());
                  if (key && value) properties[key] = value;
              }
          });
  
          cssObject[selector] = properties;
      }
      return cssObject;
  }
  function extractCssVariables(cssString) {
    const cssObject = cssToObject(cssString);
    const cssVariables = cssObject[":root"] || {};
    
    return Object.entries(cssVariables).map(([name, value]) => ({
        name,
        value
    }));
}

    const cssVariablesArray = extractCssVariables(cssContent);
    console.log(cssVariablesArray);

    return (
        <div>
            <h2>Extracted CSS Variables</h2>
            <pre>{JSON.stringify(cssVariablesArray, null, 2)}</pre>
        </div>
    );
}

export default Page;
