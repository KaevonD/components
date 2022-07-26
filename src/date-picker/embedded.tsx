// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { DatePickerProps } from './interfaces';
import Calendar from './calendar';
import { memoizedDate } from './calendar/utils/date';
import { useDatePicker } from './use-date-picker';

export const DatePickerEmbedded = ({
  value,
  locale = '',
  startOfWeek,
  calendarRef,
  isDateEnabled,
  nextMonthAriaLabel,
  previousMonthAriaLabel,
  todayAriaLabel,
}: DatePickerEmbeddedProps) => {
  const {
    normalizedLocale,
    normalizedStartOfWeek,
    displayedDate,
    selectedDate,
    focusedDate,
    calendarHasFocus,
    onChangeMonthHandler,
    onSelectDateHandler,
    onDateFocusHandler,
  } = useDatePicker({
    locale,
    startOfWeek,
    value,
  });

  return (
    <Calendar
      ref={calendarRef}
      selectedDate={memoizedDate('value', selectedDate)}
      focusedDate={memoizedDate('focused', focusedDate)}
      displayedDate={memoizedDate('displayed', displayedDate)}
      locale={normalizedLocale}
      startOfWeek={normalizedStartOfWeek}
      isDateEnabled={isDateEnabled ? isDateEnabled : () => true}
      calendarHasFocus={calendarHasFocus}
      nextMonthLabel={nextMonthAriaLabel}
      previousMonthLabel={previousMonthAriaLabel}
      todayAriaLabel={todayAriaLabel}
      onChangeMonth={onChangeMonthHandler}
      onSelectDate={onSelectDateHandler}
      onFocusDate={onDateFocusHandler}
    />
  );
};

export type DatePickerEmbeddedProps = Omit<
  DatePickerProps,
  | 'placeholder'
  | 'openCalendarAriaLabel'
  | 'name'
  | 'disabled'
  | 'readOnly'
  | 'autoFocus'
  | 'ariaLabel'
  | 'ariaRequired'
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
> & {
  calendarRef: React.RefObject<HTMLDivElement>;
};
