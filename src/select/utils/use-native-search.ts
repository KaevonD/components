// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { KeyCode } from '../../internal/keycode';
import {
  filterOptions,
  isInteractive,
  isGroupInteractive,
  isGroup,
} from '../../internal/components/option/utils/filter-options';
import { DropdownOption, OptionDefinition, OptionGroup } from '../../internal/components/option/interfaces';
import { useDebounceCallback } from '../../internal/hooks/use-debounce-callback';

export const isChar = (keyCode: number): boolean => {
  return [0, KeyCode.enter, KeyCode.space, KeyCode.tab].indexOf(keyCode) === -1;
};

export const isRepeatedChar = (str: string) => str.split('').every(c => c === str[0]);

interface UseNativeSearchProps {
  isEnabled: boolean;
  isKeyboard: React.MutableRefObject<boolean>;
  options: ReadonlyArray<DropdownOption>;
  highlightOption: (option: DropdownOption) => void;
  highlightedOption: OptionDefinition | undefined | null;
  useInteractiveGroups?: boolean;
}

function findMatchingOption(
  options: ReadonlyArray<DropdownOption>,
  searchText: string,
  currentHighlight: OptionDefinition | OptionGroup | undefined | null,
  useInteractiveGroups?: boolean
) {
  const interactivityCheck = useInteractiveGroups ? isGroupInteractive : isInteractive;
  const filter = (searchText: string) =>
    filterOptions(options, searchText, true).filter(option => interactivityCheck(option));
  const matchingOptions = filter(searchText);

  if (matchingOptions.length === 1) {
    return matchingOptions[0];
  }

  // Hit the same char over and over, we assume they want to cycle through
  if (currentHighlight && searchText.length > 1 && isRepeatedChar(searchText)) {
    const matchingOptions = filter(searchText[0]);

    if (matchingOptions.length > 0) {
      //handling OptionGroups when useInteractiveGroups is set
      let active: number = isGroup(currentHighlight)
        ? matchingOptions.map(({ option }) => option).indexOf(currentHighlight)
        : matchingOptions
            .map(({ option }) => (option as OptionDefinition).value)
            .indexOf((currentHighlight as OptionDefinition).value);

      // Pick the next thing (if something with this prefix wasn't selected
      // we'll end up with the first option)
      active += 1;
      active = active % matchingOptions.length;
      return matchingOptions[active];
    }
  }

  // We have multiple things that start with this prefix.  Based on the
  // behavior of native select, this is considered after the repeated case
  if (matchingOptions.length > 0) {
    return matchingOptions[0];
  }
  return null;
}

export function useNativeSearch({
  isEnabled,
  options,
  isKeyboard,
  highlightOption,
  highlightedOption,
  useInteractiveGroups,
}: UseNativeSearchProps) {
  const value = useRef('');

  const delayedResetValue = useDebounceCallback(() => (value.current = ''), 500);

  return (event: React.KeyboardEvent) => {
    isKeyboard.current = true;
    if (!isEnabled) {
      return;
    }

    const { charCode } = event;
    if (!isChar(charCode)) {
      return;
    }
    delayedResetValue();
    const newValue = value.current + String.fromCharCode(charCode);
    value.current = newValue;

    const nextHighlight = findMatchingOption(options, newValue, highlightedOption, useInteractiveGroups);
    if (nextHighlight) {
      highlightOption(nextHighlight);
    }
  };
}
