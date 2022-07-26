// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Box, Link } from '~components';
import { DatePickerEmbedded } from '~components/date-picker/embedded';

export default function DatePickerEditorScenario() {
  const dateValue = '';
  const calendarRef = useRef<HTMLDivElement>(null);

  return (
    <Box padding="s">
      <h1>Date picker embedded version</h1>
      <Link id="focus-dismiss-helper">Focusable element before the date picker</Link>
      <br />
      <DatePickerEmbedded
        calendarRef={calendarRef}
        value={dateValue}
        locale={'en-EN'}
        previousMonthAriaLabel={'Previous month'}
        nextMonthAriaLabel={'Next month'}
        todayAriaLabel={'TEST TODAY'}
      />
      <br />
      <br />
      <Link id="focusable-element-after-date-picker">Focusable element after the date picker</Link>
    </Box>
  );
}
