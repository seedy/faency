import { VariantProps } from "@stitches/react";
import React, { useContext, createContext, useMemo, ComponentProps, useState, useCallback } from "react";
import { StyledAccordionRoot, StyledAccordionTrigger, AccordionContent, AccordionItem } from "../Accordion";
import { RadioGroup, Radio } from "../Radio";

// CONTEXT
const RadioAccordionContext = createContext<{ value?: string }>({
  value: undefined,
});

const RadioAccordionItemContext = createContext<{ value?: string }>({
  value: undefined,
});

// HOOKS
const useRadioAccordionContext = () => useContext(RadioAccordionContext);

const useRadioAccordionItemContext = () => useContext(RadioAccordionItemContext);

type RadioAccordionRootProps = ComponentProps<typeof StyledAccordionRoot> & {
  type: 'single'
  css?: any
}
export const RadioAccordionRoot: (props: RadioAccordionRootProps) => JSX.Element = ({ type = 'single', defaultValue, onValueChange, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue)
      if (onValueChange) {
        onValueChange(nextValue);
      }
    },
    [setValue],
  );

  const contextValue = useMemo(
    () => ({
      value,
    }),
    [value],
  );

  return (
    <RadioAccordionContext.Provider value={contextValue}>
      <RadioGroup value={value} css={{ flexDirection: 'column' }} asChild>
        <StyledAccordionRoot type={type} onValueChange={handleValueChange} {...props} />
      </RadioGroup>
    </RadioAccordionContext.Provider>
  )
}

export const RadioAccordionItem = React.forwardRef<React.ElementRef<typeof AccordionItem>, ComponentProps<typeof AccordionItem>>(({ value, children, ...props }, forwardedRef) => {
  const contextValue = useMemo(
    () => ({
      value,
    }),
    [value],
  );

  return (
    <RadioAccordionItemContext.Provider value={contextValue}>
      <AccordionItem value={value} ref={forwardedRef} css={{ display: 'inherit', flexDirection: 'column' } as any} {...props}>
        {children}
      </AccordionItem>
    </RadioAccordionItemContext.Provider>
  );
});

interface RadioAccordionTriggerProps extends Omit<ComponentProps<typeof Radio>, 'value'> {
  children?: React.ReactNode
}
export const RadioAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledAccordionTrigger>, RadioAccordionTriggerProps>(({ children, ...props }, ref) => {
    const { value: groupValue } = useRadioAccordionContext();
    const { value: itemValue } = useRadioAccordionItemContext();

    return (
      <StyledAccordionTrigger ref={ref}>
        <Radio css={{ mr: '$2' }} tabIndex={-1} value={itemValue as string} checked={itemValue === groupValue} {...props} />
        {children}
      </StyledAccordionTrigger>

    )
  })

export const RadioAccordionContent = AccordionContent