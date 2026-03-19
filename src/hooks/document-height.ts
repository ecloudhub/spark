import { useIsomorphicLayoutEffect } from './useIsomorphicEffect';
import { throttle } from 'lodash';
import { useState } from 'react';

export const useDocumentHeight = () => {
  const [documentHeight, setDocumentHeight] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    const docu = document.documentElement;
    const updateSize = () => {
      setDocumentHeight(docu.offsetHeight);
    };
    const resizeWatcher = throttle(updateSize, 50);

    const resizeObserver = new ResizeObserver(entries => updateSize());

    resizeObserver.observe(docu);

    resizeWatcher();

    return () => {
      docu.removeEventListener('resize', resizeWatcher);
      docu.removeEventListener('change', resizeWatcher);
      resizeObserver.disconnect();
    };
  }, []);

  return documentHeight;
};
