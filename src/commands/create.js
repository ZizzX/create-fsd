import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const FSD_LAYERS = [
  'app',
  'processes',
  'pages',
  'widgets',
  'features',
  'entities',
  'shared'
];

export async function createFSDStructure({ force = false } = {}) {
  const currentDir = process.cwd();
  const srcDir = path.join(currentDir, 'src');

  // Проверяем существование директории src
  if (fs.existsSync(srcDir) && !force) {
    const files = await fs.readdir(srcDir);
    if (files.length > 0) {
      throw new Error('Directory src is not empty. Use --force to override.');
    }
  }

  // Создаем src директорию
  await fs.ensureDir(srcDir);

  // Создаем слои FSD
  for (const layer of FSD_LAYERS) {
    const layerPath = path.join(srcDir, layer);
    await fs.ensureDir(layerPath);

    // Создаем index.ts для public API
    const indexPath = path.join(layerPath, 'index.ts');
    await fs.writeFile(indexPath, `// Public API for ${layer} layer\n`);

    // Создаем README.md для каждого слоя
    const readmePath = path.join(layerPath, 'README.md');
    await fs.writeFile(readmePath, createLayerReadme(layer));
  }

  console.log(chalk.blue('Created FSD structure:'));
  FSD_LAYERS.forEach(layer => {
    console.log(chalk.cyan(`  ├── ${layer}`));
  });
}

function createLayerReadme(layer) {
  const descriptions = {
    app: 'Инициализация приложения, глобальные стили, провайдеры',
    processes: 'Сложные бизнес-процессы, затрагивающие всё приложение',
    pages: 'Страницы приложения',
    widgets: 'Самостоятельные и независимые блоки',
    features: 'Действия пользователя, которые несут бизнес-ценность',
    entities: 'Бизнес-сущности',
    shared: 'Переиспользуемый код, библиотеки, UI компоненты'
  };

  return `# ${layer}

${descriptions[layer]}

## Структура

\`\`\`
${layer}/
├── ui/          # React компоненты
├── model/       # Бизнес-логика
├── lib/         # Вспомогательные функции
└── api/         # API запросы
\`\`\`
`;
}
