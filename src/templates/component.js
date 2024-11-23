export const componentTemplate = (name) => `import React from 'react';
import styles from './${name}.module.css';

export const ${name} = () => {
  return (
    <div className={styles.root}>
      ${name} Component
    </div>
  );
};
`;

export const styleTemplate = () => `
.root {
  /* styles */
}
`;

export const testTemplate = (name) => `import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />);
    expect(screen.getByText('${name} Component')).toBeInTheDocument();
  });
});
`;

export const storyTemplate = (name) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${name}',
  component: ${name},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {},
};
`;

export const indexTemplate = (name) => `export { ${name} } from './${name}';
`;
