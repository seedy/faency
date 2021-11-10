import React from 'react';
import { VariantProps } from '@stitches/react';
import { styled, CSS } from '../../stitches.config';
import { elevationVariant } from '../Elevation';

// CONSTANTS
const FOCUS_SHADOW = elevationVariant[1].boxShadow; // apply elevation $1 when focus

const SMALL_HEIGHT = '$5';
const MEDIUM_HEIGHT = '$6';
const LARGE_HEIGHT = '$7';

const SIZE_PADDINGS = {
  small: '$2',
  medium: '$3',
  large: '$3',
};

const SIZES = ['small', 'medium', 'large'] as const;
const PADDING_VARIANTS = [1, 2, 3] as const;
const PADDING_ADORNMENTS_SIZE_COMPOUND_VARIANTS: { paddingVariant: typeof PADDING_VARIANTS[number], size: typeof SIZES[number] }[] = PADDING_VARIANTS.reduce(
  (aggr: { paddingVariant, size }[], paddingVariant) => {
    return [
      ...aggr,
      ...SIZES.map(size => ({ paddingVariant, size })),
    ];
  }, []);
// HELPERS
const computeStartPaddingWithSize = (startPadding: typeof PADDING_VARIANTS[number], size: typeof SIZES[number]) => ({
  startPadding,
  size,
  css: {
    paddingInlineStart: `calc(${SIZE_PADDINGS[size]} + ${startPadding - 1} * $1 + ${startPadding * 15}px)`
  }
})
const computeEndPaddingWithSize = (endPadding: typeof PADDING_VARIANTS[number], size: typeof SIZES[number]) => ({
  endPadding,
  size,
  css: {
    paddingInlineEnd: `calc(${SIZE_PADDINGS[size]} + ${endPadding - 1} * $1 + ${endPadding * 15}px)`
  }
})

// COMPONENTS
const StyledInput = styled('input', {
  // Reset
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$rubik',
  margin: '0',
  outline: 'none',
  padding: '0',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  zIndex: 1,
  position: 'relative',
  backgroundColor: 'transparent',
  borderRadius: 'inherit', // inherit border radius from InputWrapper
  color: '$inputText',
  fontVariantNumeric: 'tabular-nums',
  boxShadow: 'inset 0 0 0 1px $colors$inputBorder',
  transition: 'box-shadow .1s ease-in-out',

  '&[type="number"]': {
    '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
      appearance: 'none',
    }
  },

  '&:-webkit-autofill,&:autofill': {
    boxShadow: 'inset 0 0 0 1px $colors$inputBorder, inset 0 0 0 100px $colors$inputBg',
  },

  '&:-webkit-autofill::first-line,&:autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$inputFocusBorder, ${FOCUS_SHADOW}`,
  },

  '&::placeholder': {
    color: '$inputPlaceholder',
  },

  '&:read-only:not(:disabled)': {
    boxShadow: 'none',
  },

  '&:disabled': {
    pointerEvents: 'none',
    color: '$inputDisabledText',
  },

  variants: {
    size: {
      small: {
        height: SMALL_HEIGHT,
        fontSize: '$1',
        px: '$2',
        lineHeight: '$sizes$5',
        '&:-webkit-autofill::first-line,&:autofill::first-line': {
          fontSize: '$1',
        },
      },
      medium: {
        height: MEDIUM_HEIGHT,
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line,&:autofill::first-line': {
          fontSize: '$3',
        },
      },
      large: {
        height: LARGE_HEIGHT,
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line,&:autofill::first-line': {
          fontSize: '$3',
        },
      },
    },
    startPadding: {
      1: {},
      2: {},
      3: {},
    },
    endPadding: {
      1: {},
      2: {},
      3: {},
    },
    variant: {
      ghost: {
        boxShadow: 'none',
        '&:disabled': {
          boxShadow: 'none',
        },
        backgroundColor: 'transparent',
        '&:focus-visible': {
          backgroundColor: '$loContrast',
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder',
        '&:focus-visible': {
          boxShadow: `inset 0 0 0 2px $colors$inputInvalidBorder, ${FOCUS_SHADOW}`,
        },
      },
    },
    cursor: {
      default: {
        cursor: 'default',
        '@hover': {
          '&:hover:not(:read-only)': {
            cursor: 'text',
          },
        },
        '&:focus-visible:not(:read-only)': {
          cursor: 'text',
        },
      },
      text: {
        cursor: 'text',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    cursor: 'default',
  },
  compoundVariants: [
    {
      variant: 'ghost',
      state: 'invalid',
      css: {
        boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder',
      },
    },
    ...PADDING_ADORNMENTS_SIZE_COMPOUND_VARIANTS.map(({ paddingVariant, size }) => computeStartPaddingWithSize(paddingVariant, size)),
    ...PADDING_ADORNMENTS_SIZE_COMPOUND_VARIANTS.map(({ paddingVariant, size }) => computeEndPaddingWithSize(paddingVariant, size)),
  ],
});

const InputWrapper = styled('div', {
  // Reset
  outline: 'none',
  lineHeight: 0,

  position: 'relative',
  backgroundColor: '$inputBg',
  color: '$inputPlaceholder',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },

  '&:focus-within': {
    '&::before': {
      backgroundColor: '$inputFocusBg',
    }
  },

  '@hover': {
    '&:hover': {
      '&::before': {
        backgroundColor: '$inputHoverBg',
      },
      '&::after': {
        backgroundColor: '$primary',
        opacity: 0.05,
      },
    },
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.7,
        color: '$inputDisabledText',
        '@hover': {
          '&:hover': {
            '&::before': {
              backgroundColor: 'inherit',
            },
            '&::after': {
              backgroundColor: 'inherit',
            },
          },
        },
      },
    },
    state: {
      invalid: {
        '@hover': {
          '&:hover': {
            '&::after': {
              backgroundColor: '$inputInvalidBorder',
            },
          },
        },
      },
    },
    size: {
      small: {
        borderRadius: '$2',
        '&::before, &::after': {
          borderRadius: '$2',
        },
      },
      medium: {
        borderRadius: '$3',
        '&::before, &::after': {
          borderRadius: '$3',
        },
      },
      large: {
        borderRadius: '$3',
        '&::before, &::after': {
          borderRadius: '$3',
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    disabled: false,
  },
});

const AdornmentWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  zIndex: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    size: {
      small: {
        mx: 'calc($2 / 2)',
      },
      medium: {
        mx: 'calc($3 / 2)',
      },
      large: {
        mx: 'calc($3 / 2)',
      },
    },
    variant: {
      start: {
        left: 0,
      },
      end: {
        right: 0,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const AdornmentWrapperStart = styled(AdornmentWrapper, {
  left: 0,
});

const AdornmentWrapperEnd = styled(AdornmentWrapper, {
  right: 0,
});

export type InputVariants = VariantProps<typeof StyledInput>;
export interface HTMLInputProps extends React.InputHTMLAttributes<any> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  type?: string;
}

export type InputProps = Omit<HTMLInputProps, 'size'> & InputVariants & { css?: CSS };

export type InputHandle = {
  clear: () => void;
  focus: () => void;
  increment?: () => void;
  decrement?: () => void
};

export const Input = React.forwardRef<InputHandle, InputProps>(
  ({ size, startAdornment, endAdornment, type, css, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const isNumberType = React.useMemo(
      () => type === 'number',
      [type],
    );

    const onFocus = React.useCallback(
      () => {
        const { current } = inputRef;
        if (current) {
          current.focus();
        }
      },
      [inputRef],
    );

    const onIncrement = React.useCallback(
      () => {
        onFocus();
        const { current } = inputRef;
        if (current) {
          const { value } = current;
          const numValue = Number(value);
          if (Number.isNaN(numValue)) {
            return current.value = '1';
          }
          if (Number.isInteger(numValue)) {
            return current.value = (numValue + 1).toString();
          }
          return current.value = (Math.floor(numValue) + 1).toString();
        }
      },
      [inputRef, onFocus],
    );

    const onDecrement = React.useCallback(
      () => {
        onFocus();
        const { current } = inputRef;
        if (current) {
          const { value } = current;
          const numValue = Number(value);
          if (Number.isNaN(numValue)) {
            current.value = '-1';
          } else if (Number.isInteger(numValue)) {
            current.value = (numValue - 1).toString();
          } else {
            current.value = (Math.ceil(numValue) - 1).toString();
          }
        }
      },
      [inputRef, onFocus],
    );

    React.useImperativeHandle(
      forwardedRef,
      () => ({
        clear: () => {
          const { current } = inputRef;
          if (current) {
            current.value = '';
          }
        },
        focus: onFocus,
        ...(isNumberType ? {
          increment: onIncrement,
          decrement: onDecrement,
        } : {})
      }),
      [inputRef]
    );

    const hasStartAdornment = React.useMemo(() => Boolean(startAdornment), [startAdornment]);

    const hasEndAdornment = React.useMemo(() => Boolean(endAdornment), [endAdornment]);

    return (
      <InputWrapper css={css} disabled={props.disabled} state={props.state}>
        {hasStartAdornment && (
          <AdornmentWrapperStart size={size}>{startAdornment}</AdornmentWrapperStart>
        )}

        <StyledInput
          ref={inputRef}
          size={size}
          type={type}
          {...props}
        />
        {hasEndAdornment && (
          <AdornmentWrapperEnd size={size}>
            {endAdornment}
          </AdornmentWrapperEnd>
        )}
      </InputWrapper>
    );
  }
);
