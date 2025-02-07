// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ProgressBar from '~components/progress-bar';
import Flashbar from '~components/flashbar';
import ScreenshotArea from '../utils/screenshot-area';
import permutations from './permutations-utils';

export default function ProgressBarPermutations() {
  return (
    <article>
      <h1>ProgressBar permutations - flash</h1>
      <ScreenshotArea>
        <Flashbar
          items={permutations.map(permutation => ({
            content: <ProgressBar {...permutation} variant="flash" />,
            buttonText: permutation.resultButtonText,
          }))}
        />
      </ScreenshotArea>
    </article>
  );
}
