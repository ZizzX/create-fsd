import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import {
  componentTemplate,
  indexTemplate,
  storyTemplate,
  styleTemplate,
  testTemplate,
} from '../templates/component.js';

const VALID_SEGMENTS = ['ui', 'lib', 'api', 'config', 'types', 'constants', 'helpers'];

const apiTemplate = (name) => `export const ${name}Api = {
  // API methods
};
`;

const libTemplate = (name) => `export const ${name} = {
  // Library methods
};
`;

const typesTemplate = (name) => `export interface I${name} {
  // Type definitions
}
`;

const constantsTemplate = (name) => `export const ${name}Constants = {
  // Constants
} as const;
`;

const helpersTemplate = (name) => `export const ${name} = {
  // Helper functions
};
`;

export async function createShared(segment, name, options = {}) {
  // Проверяем валидность сегмента
  if (!VALID_SEGMENTS.includes(segment)) {
    throw new Error(`Invalid segment "${segment}". Must be one of: ${VALID_SEGMENTS.join(', ')}`);
  }

  const sharedDir = path.join(process.cwd(), 'src', 'shared', segment, name);

  // Проверяем существование директории
  if (fs.existsSync(sharedDir)) {
    throw new Error(`Shared ${segment} "${name}" already exists`);
  }

  // Создаем директорию
  await fs.ensureDir(sharedDir);

  // Создаем файлы в зависимости от сегмента
  switch (segment) {
    case 'ui':
      // UI компонент
      await fs.writeFile(
        path.join(sharedDir, `${name}.tsx`),
        componentTemplate(name)
      );
      await fs.writeFile(
        path.join(sharedDir, `${name}.module.css`),
        styleTemplate()
      );
      if (options.tests) {
        await fs.writeFile(
          path.join(sharedDir, `${name}.test.tsx`),
          testTemplate(name)
        );
      }
      if (options.stories) {
        await fs.writeFile(
          path.join(sharedDir, `${name}.stories.tsx`),
          storyTemplate(name)
        );
      }
      break;

    case 'api':
      // API модуль
      await fs.writeFile(
        path.join(sharedDir, `${name}.ts`),
        apiTemplate(name)
      );
      if (options.tests) {
        await fs.writeFile(
          path.join(sharedDir, `${name}.test.ts`),
          `import { ${name}Api } from './${name}';

describe('${name}Api', () => {
  // Tests
});`
        );
      }
      break;

    case 'lib':
      // Библиотечный модуль
      await fs.writeFile(
        path.join(sharedDir, `${name}.ts`),
        libTemplate(name)
      );
      if (options.tests) {
        await fs.writeFile(
          path.join(sharedDir, `${name}.test.ts`),
          `import { ${name} } from './${name}';

describe('${name}', () => {
  // Tests
});`
        );
      }
      break;

    case 'types':
      // Типы
      await fs.writeFile(
        path.join(sharedDir, `${name}.ts`),
        typesTemplate(name)
      );
      break;

    case 'constants':
      // Константы
      await fs.writeFile(
        path.join(sharedDir, `${name}.ts`),
        constantsTemplate(name)
      );
      break;

    case 'helpers':
      // Вспомогательные функции
      await fs.writeFile(
        path.join(sharedDir, `${name}.ts`),
        helpersTemplate(name)
      );
      if (options.tests) {
        await fs.writeFile(
          path.join(sharedDir, `${name}.test.ts`),
          `import { ${name} } from './${name}';

describe('${name}', () => {
  // Tests
});`
        );
      }
      break;
  }

  // Создаем index.ts для всех сегментов
  await fs.writeFile(
    path.join(sharedDir, 'index.ts'),
    indexTemplate(name)
  );

  // Выводим информацию о созданных файлах
  console.log(chalk.blue(`Created shared/${segment}/${name} files:`));
  const files = await fs.readdir(sharedDir);
  files.forEach(file => {
    console.log(chalk.cyan(`  ├── ${file}`));
  });
}
