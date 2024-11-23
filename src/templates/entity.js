import { componentTemplate, styleTemplate, testTemplate, storyTemplate, indexTemplate } from './component.js';

export const modelTemplate = (name) => `import { createSlice } from '@reduxjs/toolkit';
import type { I${name} } from './types';

const initialState: I${name}Schema = {
  data: undefined,
  isLoading: false,
  error: undefined,
};

export const ${name}Slice = createSlice({
  name: '${name}',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Обработка асинхронных действий
  },
});

export const { actions: ${name}Actions } = ${name}Slice;
export const { reducer: ${name}Reducer } = ${name}Slice;
`;

export const schemaTemplate = (name) => `import type { I${name} } from './types';

export interface I${name}Schema {
  data?: I${name};
  isLoading: boolean;
  error?: string;
}
`;

export const selectorsTemplate = (name) => `import type { StateSchema } from 'app/providers/StoreProvider';

export const select${name}Data = (state: StateSchema) => state.${name}.data;
export const select${name}IsLoading = (state: StateSchema) => state.${name}.isLoading;
export const select${name}Error = (state: StateSchema) => state.${name}.error;
`;

export const typesTemplate = (name) => `export interface I${name} {
  id: string;
  // Добавьте другие поля сущности
}
`;

export const publicApiTemplate = (name) => `export { ${name}Actions, ${name}Reducer } from './model/${name}Slice';
export type { I${name} } from './model/types';
export type { I${name}Schema } from './model/schema';
export { select${name}Data, select${name}IsLoading, select${name}Error } from './model/selectors';
`;

export { componentTemplate, styleTemplate, testTemplate, storyTemplate, indexTemplate };
