// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { BaseComponentProps } from '../internal/base-component';
import { BaseKeyDetail } from '../internal/events';
import { FormFieldValidationControlProps } from '../internal/context/form-field-context';
import { BaseInputProps, InputAutoComplete, InputKeyEvents } from '../input/interfaces';

export interface TextareaProps
  extends BaseInputProps,
    InputKeyEvents,
    InputAutoComplete,
    BaseComponentProps,
    FormFieldValidationControlProps {
  /**
   * Specifies the number of lines of text to set the height to.
   */
  rows?: number;

  /**
   * Specifies whether to disable browser spellcheck feature.
   * If you set this to `true`, it disables native browser capability
   * that checks for spelling/grammar errors.
   * If you don't set it, the behavior follows the default behavior
   * of the user's browser.
   */
  disableBrowserSpellcheck?: boolean;
}

export namespace TextareaProps {
  export type KeyDetail = BaseKeyDetail;

  export interface ChangeDetail {
    /**
     * The new value of this textarea.
     */
    value: string;
  }
  export interface Ref {
    /**
     * Sets input focus on the textarea control.
     */
    focus(): void;
  }
}
