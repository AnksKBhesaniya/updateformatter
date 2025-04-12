import styles from './style..module.scss';

const styleMap = {
  'background-color': 'bg-',
  'color': 'text-',
  'font-weight': 'font-weight-',
  'font-size': 'text-',
  'display': 'd-',
  'position': 'position-',
  'top': 'top-',
  'right': 'right-',
  'bottom': 'bottom-',
  'left': 'left-',
  'z-index': 'z-index-',
  'width': 'w-',
  'height': 'h-',
  'min-width': 'minw-',
  'max-width': 'maxw-',
  'min-height': 'minh-',
  'max-height': 'maxh-',
  'margin-top': 'mt-',
  'margin-right': 'mr-',
  'margin-bottom': 'mb-',
  'margin-left': 'ml-',
  'padding-top': 'pt-',
  'padding-right': 'pr-',
  'padding-bottom': 'pb-',
  'padding-left': 'pl-',
  'flex': 'flex-',
  'justify-content': 'justify-content-',
  'align-items': 'align-items-',
  'align-content': 'content-',
  'align-self': 'self-',
  'float': 'float-',
  'opacity': 'opacity-',
  'overflow': 'overflow-',
  'overflow-x': 'overflowX-',
  'overflow-y': 'overflowY-',
  'text-align': 'text-',
  'text-transform': 'text-',
  'white-space': 'white-space-',
  'word-break': 'word-break-',
  'word-wrap': 'word-wrap-',
  'visibility': 'visibility-',
  'box-shadow': 'box-shadow-',
  'border': 'border-',
  'border-top': 'border-top-',
  'border-right': 'border-right-',
  'border-bottom': 'border-bottom-',
  'border-left': 'border-left-',
  'border-radius': 'border-radius-',
};

const inlineStyleToClassName = (inlineStyle) => {
  const classNames = [];

  Object.keys(inlineStyle).forEach((styleKey) => {
    const styleValue = inlineStyle[styleKey];
    const classNamePrefix = styleMap[styleKey];

    if (classNamePrefix) {
      const className = `${classNamePrefix}${styleValue}`;
      if (styles[className]) {
        classNames.push(styles[className]);
      }
    }
  });

  return classNames.join(' ');
};

export default inlineStyleToClassName;
