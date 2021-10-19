import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from '../Flex';
import { TextField, TextFieldProps, TextFieldVariants } from './TextField';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { styled } from '../../stitches.config';

const BaseTextField = (props: TextFieldProps): JSX.Element => <TextField {...props} />;
const TextFieldForStory = modifyVariantsForStory<
  TextFieldVariants,
  TextFieldProps & React.InputHTMLAttributes<any>
>(BaseTextField);

export default {
  title: 'Components/TextField',
  component: TextFieldForStory,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof TextFieldForStory>;

const Template: ComponentStory<typeof TextFieldForStory> = (args) => (
  <TextFieldForStory {...args} />
);
const StyledMagnifyingGlassIcon = styled(MagnifyingGlassIcon, {
  color: '$slate10', // follow iconbutton default color
});

export const Basic: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory
      id='basic'
      label="basic"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory
      size="large"
      id='large'
      label="large"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory
      state="invalid"
      id='invalid'
      label="invalid"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory
      startAdornment={<StyledMagnifyingGlassIcon />}
      id='search'
      label="search"
      placeholder="Search..."
      {...args}
    />
  </Flex>
);


export const PasswordType = Template.bind({});

PasswordType.args = { type: 'password', id: 'password-type', label: 'password' };

export const Clearable = Basic.bind({});
Clearable.args = { clearable: true };

export const Disabled = Basic.bind({});
Disabled.args = { disabled: true };

export const ReadOnly = Basic.bind({});
ReadOnly.args = { readOnly: true };

export const Display: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory
      id='disabled'
      label="disabled"
      placeholder="placeholder"
      value="disabled"
      disabled
      {...args}
    />
    <TextFieldForStory
      id='readOnly'
      label="readOnly"
      placeholder="placeholder"
      value="readOnly"
      readOnly
      {...args}
    />
  </Flex>
);

export const DisplayClearable = Display.bind({});
DisplayClearable.args = {
  clearable: true
}