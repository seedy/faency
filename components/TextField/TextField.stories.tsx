import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from '../Flex';
import { TextField, TextFieldProps, TextFieldVariants } from './TextField';
import { EyeOpenIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

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

export const Basic: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory size="small" id="small" label="small" placeholder="placeholder" {...args} />
    <TextFieldForStory id="basic" label="basic" placeholder="placeholder" {...args} />
    <TextFieldForStory size="large" id="large" label="large" placeholder="placeholder" {...args} />
    <TextFieldForStory
      state="invalid"
      id="invalid"
      label="invalid"
      placeholder="placeholder"
      {...args}
    />
    <TextFieldForStory
      startAdornment={<MagnifyingGlassIcon />}
      id="search"
      label="search"
      placeholder="Search..."
      {...args}
    />
  </Flex>
);

export const PasswordType: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory id="password-type" label="password" {...args} />
    <TextFieldForStory id="password-clearable-type" label="password clearable" clearable {...args} />
    <TextFieldForStory id="password-invalid-type" label="password invalid" state="invalid" {...args} />
    <TextFieldForStory id="password-clearable-invalid-type" label="password clearable invalid" clearable state="invalid" {...args} />
  </Flex>
);

PasswordType.args = { type: 'password' };

export const NumberType: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory id="number-type" label="number" {...args} />
    <TextFieldForStory id="number-clearable-type" label="number clearable" clearable {...args} />
    <TextFieldForStory id="number-clearable-invalid-type" label="number clearable invalid" clearable state="invalid" {...args} />
    <TextFieldForStory
      id="number-clearable-invalid-s-a-type"
      startAdornment={<MagnifyingGlassIcon />}
      startPadding={1}
      label="number clearable start adornment invalid"
      clearable
      state="invalid"
      {...args} />
  </Flex>
);

NumberType.args = { type: 'number' }

export const Clearable = Basic.bind({});
Clearable.args = { clearable: true };

export const Disabled = Basic.bind({});
Disabled.args = { disabled: true };

export const ReadOnly = Basic.bind({});
ReadOnly.args = { readOnly: true };

export const Display: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory
      id="disabled"
      label="disabled"
      placeholder="placeholder"
      value="disabled"
      disabled
      {...args}
    />
    <TextFieldForStory
      id="readOnly"
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
  clearable: true,
};

export const Adornments: ComponentStory<typeof TextFieldForStory> = (args) => (
  <Flex direction="column" gap={2}>
    <TextFieldForStory id="password-type" label="password" type="password" {...args} />
    <TextFieldForStory id="number-type" label="number" type="number" {...args} />
    <TextFieldForStory id="clearable-type" label="clearable" clearable {...args} />
    <TextFieldForStory id="invalid-type" label="invalid" state="invalid" {...args} />
    <TextFieldForStory
      id="adornments-type"
      startAdornment={<MagnifyingGlassIcon />}
      startPadding={1}
      endAdornment={<EyeOpenIcon />}
      endPadding={1}
      label="custom adornments"
      {...args} />
  </Flex>
)