import React from 'react';
import { styled } from '../../stitches.config';

import { Box } from '../Box';
import { Input, InputHandle, InputProps, InputVariants } from '../Input';
import { Label } from '../Label';
import { Tooltip } from '../Tooltip';
import { Flex } from '../Flex';
import {
  ExclamationTriangleIcon,
  CrossCircledIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  CaretDownIcon,
  CaretUpIcon
} from '@radix-ui/react-icons';

// TYPES
export type TextFieldProps = InputProps & {
  type?: string;
  clearable?: boolean;
  label?: string;
};

export type TextFieldVariants = InputVariants;

// COMPONENTS
const AdornmentGroup = styled(Flex);
AdornmentGroup.defaultProps = {
  direction: 'row',
  align: 'center',
  gap: 1,
}

const StyledEyeOpenIcon = styled(EyeOpenIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    }
  }
});

const StyledEyeClosedIcon = styled(EyeClosedIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const StyledCrossCircledIcon = styled(CrossCircledIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const StyledCaretUpIcon = styled(CaretUpIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

const StyledCaretDownIcon = styled(CaretDownIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export const TextField = React.forwardRef<React.ElementRef<typeof Input>, TextFieldProps>(
  (
    { state, clearable, label, id, type, disabled, readOnly, onBlur, onFocus, css, ...props },
    forwardedRef
  ) => {
    const inputRef = React.useRef<InputHandle | null>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as InputHandle);

    const [inputHasFocus, setInputHasFocus] = React.useState(false);
    const [innerType, setInnerType] = React.useState(type);
    const isPasswordVisible = React.useMemo(() => innerType !== 'password', [innerType]);

    const invalid = React.useMemo(() => state === 'invalid', [state]);

    const labelVariant = React.useMemo(() => {
      if (invalid) {
        return 'red';
      }
      if (disabled) {
        return 'subtle';
      }
      if (inputHasFocus) {
        return 'contrast';
      }
      return 'default';
    }, [invalid, disabled, inputHasFocus]);

    const isPasswordType = React.useMemo(() => type === 'password', [type]);

    const isNumberType = React.useMemo(() => type === 'number', [type]);

    const typeOrInnerType = React.useMemo(() => (isPasswordType ? innerType : type), [
      isPasswordType,
      type,
      innerType,
    ]);

    const innerAdornmentProps = React.useMemo(
      () => [clearable, isPasswordType, isNumberType, invalid],
      [clearable, isPasswordType, isNumberType, invalid],
    );
    const activeInnerAdornments = React.useMemo(
      () => innerAdornmentProps.filter(prop => prop === true),
      [innerAdornmentProps]
    );
    const endPadding = React.useMemo(
      () => activeInnerAdornments.length > 0 ? activeInnerAdornments.length as (1 | 2 | 3) : undefined,
      [activeInnerAdornments],
    );

    const hasInnerAdornment = React.useMemo(() => activeInnerAdornments.length > 0, [activeInnerAdornments]);
    const hasAdornmentGroup = React.useMemo(
      () => activeInnerAdornments.length > 1,
      [innerAdornmentProps],
    );

    const clearDisabled = React.useMemo(() => readOnly || disabled, [readOnly, disabled]);

    const handleClear = React.useCallback(() => {
      const { current } = inputRef;
      if (current) {
        current.clear();
      }
    }, [inputRef]);

    const handleIncrement = React.useCallback(
      () => {
        const { current } = inputRef;
        if (current) {
          current.increment?.();
        }
      },
      [inputRef],
    );

    const handleDecrement = React.useCallback(
      () => {
        const { current } = inputRef;
        if (current) {
          current.decrement?.();
        }
      },
      [inputRef],
    );

    const handleFocus = React.useCallback(
      (e) => {
        if (onFocus) {
          onFocus(e);
        }
        setInputHasFocus(true);
      },
      [onFocus, setInputHasFocus]
    );

    const handleBlur = React.useCallback(
      (e) => {
        if (onBlur) {
          onBlur(e);
        }
        setInputHasFocus(false);
      },
      [onBlur, setInputHasFocus]
    );

    const togglePasswordVisibility = React.useCallback(() => {
      setInnerType((prevInnerType) => (prevInnerType === 'password' ? undefined : 'password'));
    }, [setInnerType]);

    const EndAdornmentWrapper = React.useMemo(
      () => (hasAdornmentGroup ? AdornmentGroup : React.Fragment),
      [hasAdornmentGroup]
    );

    const PasswordVisibilityToggleIcon = React.useMemo(
      () => isPasswordVisible ? StyledEyeClosedIcon : StyledEyeOpenIcon,
      [isPasswordVisible],
    );

    const passwordAction = React.useMemo(
      () => isPasswordVisible ? "Hide password" : "Show password",
      [isPasswordVisible],
    );

    return (
      <Box css={css}>
        {label && (
          <Label variant={labelVariant} disabled={disabled} invalid={invalid} htmlFor={id}>
            {label}
          </Label>
        )}
        <Input
          id={id}
          ref={inputRef}
          endAdornment={
            hasInnerAdornment && (
              <EndAdornmentWrapper>
                {invalid && <ExclamationTriangleIcon role="alert" aria-label="Invalid" />}
                {isPasswordType && (
                  <Tooltip content={passwordAction}>
                    <PasswordVisibilityToggleIcon aria-label={passwordAction} onClick={togglePasswordVisibility} />
                  </Tooltip>
                )}
                {isNumberType && (
                  <Flex direction="column" align="center">
                    <Tooltip content="Increment">
                      <StyledCaretUpIcon aria-label="Increment" onClick={handleIncrement} />
                    </Tooltip>
                    <Tooltip content="Decrement">
                      <StyledCaretDownIcon aria-label="Decrement" onClick={handleDecrement} />
                    </Tooltip>
                  </Flex>
                )}
                {clearable && !clearDisabled && (
                  <Tooltip content="Clear">
                    <StyledCrossCircledIcon aria-label="Clear" onClick={handleClear} />
                  </Tooltip>
                )}
              </EndAdornmentWrapper>
            )
          }
          endPadding={endPadding}
          state={state}
          type={typeOrInnerType}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Box>
    );
  }
);
