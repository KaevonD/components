// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import { TabButton } from './tab-button';
import { InternalButton } from '../button/internal';
import { useContainerQuery } from '../internal/hooks/container-queries/use-container-query';
import { CodeEditorProps } from './interfaces';

interface StatusBarProps {
  languageLabel: string;
  cursorPosition: string;
  paneStatus: string;
  errorsTabRef: React.RefObject<HTMLButtonElement>;
  warningsTabRef: React.RefObject<HTMLButtonElement>;
  isTabFocused: boolean;
  paneId: string;
  i18nStrings: CodeEditorProps.I18nStrings;
  errorCount: number;
  warningCount: number;
  isRefresh: boolean;

  onErrorPaneToggle: () => void;
  onWarningPaneToggle: () => void;
  onTabFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onTabBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onPreferencesOpen: () => void;
  onHeightChange?: (height: number | null) => void;
}

type InternalStatusBarProps = StatusBarProps & {
  leftBarRef: React.Ref<HTMLDivElement>;
  isVirtual: boolean;
  minifyCounters: boolean;
};

function InternalStatusBar({
  languageLabel,
  cursorPosition,
  paneStatus,
  onErrorPaneToggle,
  onWarningPaneToggle,
  onTabFocus,
  onTabBlur,
  errorsTabRef,
  warningsTabRef,
  isTabFocused,
  paneId,
  onPreferencesOpen,
  i18nStrings,
  errorCount,
  warningCount,
  leftBarRef,
  isVirtual,
  minifyCounters,
  isRefresh,
}: InternalStatusBarProps) {
  const errorText = `${i18nStrings.errorsTab}: ${errorCount}`;
  const warningText = `${i18nStrings.warningsTab}: ${warningCount}`;

  // Virtual status bar is inaccessible for screen readers and keyboard interactions.

  return (
    <div
      className={clsx(styles['status-bar'], {
        [styles['status-bar-with-hidden-pane']]: paneStatus === 'hidden',
        [styles['status-bar-virtual']]: isVirtual,
      })}
      aria-hidden={isVirtual}
    >
      <div
        className={clsx(styles['status-bar__left'], {
          [styles['status-bar__left-virtual']]: isVirtual,
        })}
        ref={leftBarRef}
      >
        <span className={styles['status-bar__language-mode']}>{languageLabel}</span>
        <span className={styles['status-bar__cursor-position']}>{cursorPosition}</span>

        <div role="tablist">
          <TabButton
            text={minifyCounters ? ` ${errorCount}` : errorText}
            className={styles['tab-button--errors']}
            iconName="status-negative"
            disabled={errorCount === 0 || isVirtual}
            active={paneStatus === 'error'}
            onClick={onErrorPaneToggle}
            onFocus={onTabFocus}
            onBlur={onTabBlur}
            ref={errorsTabRef}
            ariaLabel={errorText}
            paneId={paneId}
            isRefresh={isRefresh}
          />
          <span className={styles['tab-button--divider']}></span>
          <TabButton
            text={minifyCounters ? ` ${warningCount}` : warningText}
            className={styles['tab-button--warnings']}
            iconName="status-warning"
            disabled={warningCount === 0 || isVirtual}
            active={paneStatus === 'warning'}
            onClick={onWarningPaneToggle}
            onFocus={onTabFocus}
            onBlur={onTabBlur}
            ref={warningsTabRef}
            tabIndex={paneStatus === 'error' && isTabFocused ? -1 : undefined}
            ariaHidden={paneStatus === 'error' && isTabFocused ? true : undefined}
            ariaLabel={warningText}
            paneId={paneId}
            isRefresh={isRefresh}
          />
        </div>
      </div>

      <div className={styles['status-bar__right']}>
        <div className={styles['status-bar__cog-button']}>
          <InternalButton
            disabled={isVirtual}
            formAction="none"
            variant="icon"
            iconName="settings"
            iconAlt="Settings"
            ariaLabel={i18nStrings.preferencesButtonAriaLabel}
            onClick={onPreferencesOpen}
            __nativeAttributes={{
              tabIndex: paneStatus !== 'hidden' && isTabFocused ? -1 : undefined,
              'aria-hidden': paneStatus !== 'hidden' && isTabFocused ? true : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const StatusBar = (props: StatusBarProps) => {
  // create a virtual status bar, in order to calculate the width with full tab button text
  // and decide if tab button text needs to be reduced
  const [realWidth, statusLeftBarRef] = useContainerQuery(rect => rect.width);
  const [virtualWidth, virtualStatusLeftBarRef] = useContainerQuery(rect => rect.width);

  const minifyCounters = virtualWidth !== null && realWidth !== null && virtualWidth > realWidth;

  return (
    <>
      <InternalStatusBar isVirtual={false} {...props} leftBarRef={statusLeftBarRef} minifyCounters={minifyCounters} />
      <InternalStatusBar isVirtual={true} {...props} leftBarRef={virtualStatusLeftBarRef} minifyCounters={false} />
    </>
  );
};
