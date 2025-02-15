// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ThemeBuilder } from '@cloudscape-design/theming-build';
import { createColorMode, createDensityMode, createMotionMode } from '../utils/modes';
import { createTopNavigationContext } from '../utils/contexts';

const modes = [
  createColorMode('.awsui-dark-mode'),
  createDensityMode('.awsui-compact-mode'),
  createMotionMode('.awsui-motion-disabled'),
];

const tokenCategories = [
  require('./color-palette'),
  require('./color-charts'),
  require('./colors'),
  require('./typography'),
  require('./borders'),
  require('./motion'),
  require('./sizes'),
  require('./spacing'),
  require('./shadows'),
];

export function buildClassicOpenSource(builder: ThemeBuilder) {
  tokenCategories.forEach(({ tokens, mode: modeId }) => {
    const mode = modes.find(mode => mode.id === modeId);
    builder.addTokens(tokens, mode);
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  builder.addContext(createTopNavigationContext(require('./contexts/top-navigation').tokens));

  return builder.build();
}

const builder = new ThemeBuilder('classic', ':root', modes);
const theme = buildClassicOpenSource(builder);

export default theme;
