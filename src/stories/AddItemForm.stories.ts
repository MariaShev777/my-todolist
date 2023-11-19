import type { Meta, StoryObj } from '@storybook/react';

import { AddItemForm } from 'components/AddItemForm';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      action: 'clicked',
      description: 'Button was clicked inside the form',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  args: {
    addItem: action('Button was clicked'),
  },
};
