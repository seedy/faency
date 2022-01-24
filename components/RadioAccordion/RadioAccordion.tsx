import React, { ComponentProps } from "react";
import { styled } from "../../stitches.config";
import { StyledAccordionRoot, StyledAccordionTrigger, StyledAccordionHeader, AccordionContent, AccordionItem, AccordionTriggerProps } from "../Accordion";
import { INDICATOR_BASE_STYLES, RADIO_BASE_STYLES } from "../Radio";

type RadioAccordionRootProps = ComponentProps<typeof StyledAccordionRoot> & {
  type: 'single'
  css?: any
}
export const RadioAccordionRoot: (props: RadioAccordionRootProps) => JSX.Element = ({ type = 'single', ...props }) => {

  return (
    <StyledAccordionRoot type={type} {...props} />
  )
}

export const RadioAccordionItem = React.forwardRef<React.ElementRef<typeof AccordionItem>, ComponentProps<typeof AccordionItem>>(({ value, children, ...props }, forwardedRef) => {

  return (
    <AccordionItem value={value} ref={forwardedRef} css={{ display: 'inherit', flexDirection: 'column' } as any} {...props}>
      {children}
    </AccordionItem>
  );
});

const StyledRadio = styled('div', RADIO_BASE_STYLES, {
  width: 18,
  height: 18,
  mr: '$2',
})

const StyledIndicator = styled('div', INDICATOR_BASE_STYLES, {
  '&::after': {
    '[data-state=open] &': {
      backgroundColor: '$radioIndicator'
    },
    '[data-state=closed] &': {
      backgroundColor: 'transparent',
    }
  },
});

export const RadioAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledAccordionTrigger>, AccordionTriggerProps>(({ children, ...props }, ref) => {

    return (
      <StyledAccordionHeader>
        <StyledAccordionTrigger ref={ref} {...props}>
          <StyledRadio >
            <StyledIndicator />
          </StyledRadio>
          {children}
        </StyledAccordionTrigger>
      </StyledAccordionHeader>
    )
  })

export const RadioAccordionContent = AccordionContent