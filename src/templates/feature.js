import { componentTemplate, indexTemplate, storyTemplate, styleTemplate, testTemplate } from './component.js';

export const modelTemplate = (name) => `import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // начальное состояние
};

export const ${name}Slice = createSlice({
  name: '${name}',
  initialState,
  reducers: {
    // редьюсеры
  },
});

export const { actions: ${name}Actions } = ${name}Slice;
export const { reducer: ${name}Reducer } = ${name}Slice;
`;

export const apiTemplate = (name) => `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ${name}Api = createApi({
  reducerPath: '${name}Api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // эндпоинты
  }),
});

export const { } = ${name}Api;
`;

export const selectorsTemplate = (name) => `export const select${name}State = (state) => state.${name};
`;

export const typesTemplate = (name) => `export interface I${name} {
  // типы
}
`;

export const publicApiTemplate = (name) => `export { ${name}Actions, ${name}Reducer } from './model/${name}Slice';
export { ${name}Api } from './api/${name}Api';
export { select${name}State } from './model/selectors';
export type { I${name} } from './model/types';
`;

export { componentTemplate, indexTemplate, storyTemplate, styleTemplate, testTemplate };

