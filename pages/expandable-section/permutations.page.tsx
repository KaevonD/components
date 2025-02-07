// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Container from '~components/container';
import ExpandableSection, { ExpandableSectionProps } from '~components/expandable-section';
import Header from '~components/header';
import Table from '~components/table';

import createPermutations from '../utils/permutations';
import PermutationsView from '../utils/permutations-view';
import ScreenshotArea from '../utils/screenshot-area';

/* eslint-disable react/jsx-key */
const permutations = createPermutations<ExpandableSectionProps>([
  {
    expanded: [true, false],
    variant: ['default'],
    header: [
      'Default Example Header',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      <div>
        Default example header <i>- optional</i>
      </div>,
    ],
    children: [
      'Sample content',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
  {
    expanded: [true],
    variant: ['footer'],
    header: [
      'Footer Example Header',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    children: [
      'Sample content',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
  {
    expanded: [true, false],
    variant: ['container'],
    header: [
      <Header variant="h2">Container example header</Header>,
      <Header variant="h2">
        Container example header <i>- optional</i>
      </Header>,
    ],
    children: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
  },
  {
    expanded: [true],
    variant: ['container'],
    header: [<Header variant="h2">Container example header</Header>],
    children: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    disableContentPaddings: [true],
  },
  {
    expanded: [true],
    variant: ['container'],
    header: [<Header variant="h2">Container example header</Header>],
    children: [
      <Container header="Container Header">Content</Container>,
      <Container header="Container Header" footer="Container Footer">
        Content
      </Container>,
      <>
        <span>some text</span>
        <Table items={[]} columnDefinitions={[{ header: 'Test', cell: () => '' }]} empty="There will be content" />
      </>,
    ],
    disableContentPaddings: [false],
  },
  {
    expanded: [true],
    variant: ['container'],
    header: [<Header variant="h2">Container example header</Header>],
    children: [
      <div style={{ overflow: 'hidden' }}>
        <Table
          variant="embedded"
          items={[]}
          columnDefinitions={[{ header: 'Test', cell: () => '' }]}
          empty="There will be content"
        />
      </div>,
    ],
    disableContentPaddings: [true],
  },
  {
    expanded: [true, false],
    variant: ['navigation'],
    header: [
      'Navigation Example Header',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      <div>
        Navigation header <i>- optional</i>
      </div>,
    ],
    children: ['Navigation content'],
  },
]);
/* eslint-enable react/jsx-key */

export default function ExpandableSectionPermutations() {
  return (
    <>
      <h1>Expandable Section permutations</h1>
      <ScreenshotArea disableAnimations={true}>
        <PermutationsView permutations={permutations} render={permutation => <ExpandableSection {...permutation} />} />
      </ScreenshotArea>
    </>
  );
}
