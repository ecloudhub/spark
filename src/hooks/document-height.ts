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

    docu.addEventListener('resize', resizeWatcher);
    docu.addEventListener('change', resizeWatcher);

    resizeWatcher();

    return () => {
      docu.addEventListener('resize', resizeWatcher);
      docu.addEventListener('change', resizeWatcher);
      resizeObserver.disconnect();
    };
  }, []);

  return documentHeight;
};
