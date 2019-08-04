import React from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
// import { useObservable } from 'rxjs-hooks';
import root from 'window-or-global';
import PropTypes from 'prop-types';


const HideOnScroll = ({ children }) => {
  const defaultStyles = {
    transition: '.4s top ease',
  };
  const [lastScroll, setLastScroll] = React.useState(0);
  const [styles, setStyles] = React.useState(defaultStyles);
  React.useEffect(() => {
    const scroll$ = fromEvent(root, 'scroll').pipe(
      throttleTime(1000),
      map(() => root.pageYOffset || document.documentElement.scrollTop),
    ).subscribe((scrollTop) => {
      if (scrollTop > lastScroll) {
        setStyles({
          ...defaultStyles,
          top: '-4em',
        });
      } else {
        setStyles({
          ...defaultStyles,
          top: '0',
        });
      }
      setLastScroll(scrollTop);
    });
    return () => scroll$.unsubscribe();
  }, [lastScroll, styles, defaultStyles]);

  return children(styles);
};

HideOnScroll.propTypes = {
  children: PropTypes.func.isRequired,
};

export default HideOnScroll;
