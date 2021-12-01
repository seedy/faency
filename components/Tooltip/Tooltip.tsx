import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { styled, CSS, VariantProps } from '../../stitches.config';
import { Text } from '../Text';
import { Box } from '../Box';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement;
    content: React.ReactNode;
    multiline?: boolean;
    trigger?: 'disabled';
    triggerCss?: CSS;
  };

const Content = styled(TooltipPrimitive.Content, {
  color: '$tooltipText',
  backgroundColor: '$tooltipContentBg',
  borderRadius: '$3',
  padding: '$2',

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
});

const ArrowBox = styled(Box, {
  color: '$tooltipContentBg',
});

const TriggerDisabledBox = styled(Box, {
  display: 'inherit',
  flexDirection: 'inherit',
  flex: 'inherit',
});

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline,
  trigger,
  triggerCss,
  css,
  ...props
}: TooltipProps) {
  const isContentString = React.useMemo(() => typeof content === 'string', [content]);
  return (
    <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipPrimitive.Trigger asChild>
        {trigger === 'disabled' ? (
          <TriggerDisabledBox css={triggerCss as any}>{children}</TriggerDisabledBox>
        ) : (
          children
        )}
      </TooltipPrimitive.Trigger>

      <Content side="top" align="center" sideOffset={5} {...props} multiline={multiline}>
        {isContentString ? (
          <Text
            size="1"
            as="p"
            css={{
              color: 'currentColor',
              lineHeight: multiline ? '20px' : (undefined as any),
            }}
          >
            {content}
          </Text>
        ) : (
          content
        )}
        <ArrowBox>
          <TooltipPrimitive.Arrow
            offset={5}
            width={11}
            height={5}
            style={{
              fill: 'currentColor',
            }}
          />
        </ArrowBox>
      </Content>
    </TooltipPrimitive.Root>
  );
}

export type TooltipVariants = VariantProps<typeof Tooltip>;
