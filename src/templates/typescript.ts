import { TemplateOptions, TemplateResult } from '../types';

export function createComponentTemplate({ name }: TemplateOptions): TemplateResult {
  return {
    path: `${name}.tsx`,
    content: `import { FC } from 'react';
import styles from './${name}.module.scss';
import { ${name}Props } from './${name}.types';

export const ${name}: FC<${name}Props> = () => {
  return (
    <div className={styles.root}>
      ${name}
    </div>
  );
};`
  };
}

export function createTypesTemplate(options: TemplateOptions): TemplateResult {
  const { name } = options;

  return {
    path: `${name}.types.ts`,
    content: `export interface ${name}Props {
  className?: string;
  children?: React.ReactNode;
}`
  };
}

export function createTestTemplate(options: TemplateOptions): TemplateResult {
  const { name } = options;

  return {
    path: `${name}.test.tsx`,
    content: `import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders successfully', () => {
    render(<${name} />);
    expect(screen.getByText('${name}')).toBeInTheDocument();
  });
});`
  };
}

export function createStoryTemplate(options: TemplateOptions): TemplateResult {
  const { name, layer } = options;

  return {
    path: `${name}.stories.tsx`,
    content: `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta = {
  title: '${layer}/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};`
  };
}

export function createStyleTemplate(options: TemplateOptions): TemplateResult {
  return {
    path: `${options.name}.module.scss`,
    content: `.root {
  // styles
}`
  };
}

export function createIndexTemplate(options: TemplateOptions): TemplateResult {
  const { name } = options;

  return {
    path: 'index.ts',
    content: `export * from './${name}';
export * from './${name}.types';`
  };
}

export function createModelTemplate(options: TemplateOptions): TemplateResult {
  const { name } = options;

  return {
    path: `${name}.model.ts`,
    content: `import { createSlice } from '@reduxjs/toolkit';

interface ${name}State {
  // state interface
}

const initialState: ${name}State = {
  // initial state
};

export const ${name}Slice = createSlice({
  name: '${name.toLowerCase()}',
  initialState,
  reducers: {
    // reducers
  },
});

export const { actions: ${name}Actions, reducer: ${name}Reducer } = ${name}Slice;`
  };
}

export function createApiTemplate(options: TemplateOptions): TemplateResult {
  const { name } = options;

  return {
    path: `${name}.api.ts`,
    content: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ${name}Api = createApi({
  reducerPath: '${name.toLowerCase()}',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // endpoints
  }),
});

export const { } = ${name}Api;`
  };
}
