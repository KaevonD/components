// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useStableEventHandler } from '../../internal/hooks/use-stable-event-handler';
import { getOverflowParents } from '../../internal/utils/scrollable-containers';
import { findUpUntil } from '../../internal/utils/dom';
import tableStyles from '../styles.css.js';
import styles from './styles.css.js';

interface ResizerProps {
  onDragMove: (newWidth: number) => void;
  onFinish: () => void;
}

const AUTO_GROW_START_TIME = 10;
const AUTO_GROW_INTERVAL = 10;
const AUTO_GROW_INCREMENT = 5;

export function Resizer({ onDragMove, onFinish }: ResizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [headerCell, setHeaderCell] = useState<HTMLElement>();
  const autoGrowTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();
  const onFinishStable = useStableEventHandler(onFinish);
  const onDragStable = useStableEventHandler(onDragMove);
  useEffect(() => {
    if (!isDragging || !headerCell) {
      return;
    }
    const rootElement = findUpUntil(headerCell, element => element.className.indexOf(tableStyles.root) > -1)!;
    const tableElement = rootElement.querySelector<HTMLElement>(`table`)!;
    // tracker is rendered inside table wrapper to align with its size
    const tracker = rootElement.querySelector<HTMLElement>(`.${styles.tracker}`)!;
    const scrollParent = getOverflowParents(headerCell)[0];
    const { left: leftEdge, right: rightEdge } = scrollParent.getBoundingClientRect();

    const updateTrackerPosition = (newOffset: number) => {
      const { left: scrollParentLeft } = tableElement.getBoundingClientRect();
      tracker.style.top = headerCell.getBoundingClientRect().height + 'px';
      // minus one pixel to offset the cell border
      tracker.style.left = newOffset - scrollParentLeft - 1 + 'px';
    };

    const updateColumnWidth = (newWidth: number) => {
      // callbacks must be the last calls in the handler, because they may cause an extra update
      onDragStable(newWidth);
      // we read the element size again because the previous callback changes it
      updateTrackerPosition(headerCell.getBoundingClientRect().right);
    };

    const resizeColumn = (offset: number) => {
      if (offset > leftEdge) {
        const cellLeft = headerCell.getBoundingClientRect().left;
        const newWidth = offset - cellLeft;
        // callbacks must be the last calls in the handler, because they may cause an extra update
        updateColumnWidth(newWidth);
      }
    };

    const onAutoGrow = () => {
      const width = headerCell.getBoundingClientRect().width;
      autoGrowTimeout.current = setTimeout(onAutoGrow, AUTO_GROW_INTERVAL);
      // callbacks must be the last calls in the handler, because they may cause an extra update
      updateColumnWidth(width + AUTO_GROW_INCREMENT);
      scrollParent.scrollLeft += AUTO_GROW_INCREMENT;
    };
    const onMouseMove = (event: MouseEvent) => {
      clearTimeout(autoGrowTimeout.current);
      const offset = event.pageX;
      if (offset > rightEdge) {
        autoGrowTimeout.current = setTimeout(onAutoGrow, AUTO_GROW_START_TIME);
      } else {
        resizeColumn(offset);
      }
    };
    const onMouseUp = (event: MouseEvent) => {
      resizeColumn(event.pageX);
      setIsDragging(false);
      onFinishStable();
      clearTimeout(autoGrowTimeout.current);
    };
    updateTrackerPosition(headerCell.getBoundingClientRect().right);
    document.body.classList.add(styles['resize-active']);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      clearTimeout(autoGrowTimeout.current);
      document.body.classList.remove(styles['resize-active']);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [headerCell, isDragging, onDragStable, onFinishStable]);
  return (
    <span
      className={clsx(styles.resizer, isDragging && styles['resizer-active'])}
      onMouseDown={event => {
        if (event.button !== 0) {
          return;
        }
        event.preventDefault();
        const headerCell = findUpUntil(event.currentTarget, element => element.tagName.toLowerCase() === 'th')!;
        setIsDragging(true);
        setHeaderCell(headerCell);
      }}
    />
  );
}

export function ResizeTracker() {
  return <span className={styles.tracker} />;
}
