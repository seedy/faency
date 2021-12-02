import React from 'react';
import { CSS, styled } from '../../stitches.config';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { overlayStyles } from '../Overlay';
import { IconButton } from '../IconButton';
import { Card } from '../Card';
import { elevationVariants } from '../Elevation/Elevation';

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  defaultVariants: {
    variant: 'fixed',
  },
});

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, Card, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxHeight: '85vh',
  padding: '$4',
  marginTop: '-5vh',
  backgroundColor: '$dialogBackground',
  boxShadow: 'inset 0 0 0 1px $colors$deepBlue4',
  borderRadius: '$3',
  // animation: `${fadeIn} 125ms linear, ${moveDown} 125ms cubic-bezier(0.22, 1, 0.36, 1)`,
  willChange: 'transform',
  overflow: 'auto',

  '&::before': {
    boxShadow: 'none',
  },

  '&:focus': {
    outline: 'none',
  },

  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 5,
  },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <StyledCloseButton asChild>
      <IconButton css={{ color: '$hiContrast' }}>
        <Cross1Icon />
      </IconButton>
    </StyledCloseButton>
  </StyledContent>
));

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
