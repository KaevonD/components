// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import clsx from 'clsx';
import styles from './styles.css.js';
import Option from '../../internal/components/option';
import SelectableItem from '../../internal/components/selectable-item';
import { getBaseProps } from '../../internal/base-component';
import { DropdownOption, OptionDefinition } from '../../internal/components/option/interfaces';
import CheckboxIcon from '../../internal/components/checkbox-icon';
export interface ItemProps {
  option: DropdownOption;
  highlighted?: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  filteringValue?: string;
  hasCheckbox?: boolean;
  isKeyboard?: boolean;
  virtualPosition?: number;
  padBottom?: boolean;
  isNextSelected?: boolean;
  screenReaderContent?: string;
  ariaPosinset?: number;
  ariaSetsize?: number;
}

const MultiSelectItem = (
  {
    option,
    highlighted,
    selected,
    filteringValue,
    hasCheckbox,
    isKeyboard,
    virtualPosition,
    padBottom,
    isNextSelected,
    indeterminate,
    screenReaderContent,
    ariaPosinset,
    ariaSetsize,
    ...restProps
  }: ItemProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const baseProps = getBaseProps(restProps);

  const isParent = option.type === 'parent';
  const isChild = option.type === 'child';
  const wrappedOption: OptionDefinition = option.option;
  const disabled = option.disabled || wrappedOption.disabled;
  const className = clsx(styles.item, {
    [styles.disabled]: disabled,
  });

  return (
    <SelectableItem
      ariaChecked={selected}
      selected={selected}
      isNextSelected={isNextSelected}
      highlighted={highlighted}
      disabled={disabled}
      isParent={isParent}
      isChild={isChild}
      isKeyboard={isKeyboard}
      ref={ref}
      virtualPosition={virtualPosition}
      padBottom={padBottom}
      useInteractiveGroups={true}
      screenReaderContent={screenReaderContent}
      ariaPosinset={ariaPosinset}
      ariaSetsize={ariaSetsize}
      {...baseProps}
    >
      <div className={className}>
        {hasCheckbox && (
          <div className={styles.checkbox}>
            <CheckboxIcon checked={selected} indeterminate={isParent && indeterminate} disabled={option.disabled} />
          </div>
        )}
        <Option option={{ ...wrappedOption, disabled }} highlightText={filteringValue} isGroupOption={isParent} />
      </div>
    </SelectableItem>
  );
};

export default React.memo(React.forwardRef(MultiSelectItem));
