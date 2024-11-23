# create-fsd-structure

[![NPM Version](https://img.shields.io/npm/v/create-fsd-structure)](https://www.npmjs.com/package/create-fsd-structure)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CLI tool for generating Feature-Sliced Design (FSD) project structures in React applications.

## Features

- 🚀 Quick setup of FSD architecture
- 📦 TypeScript support out of the box
- 🎨 Component generation with optional features
- 🧪 Test files generation
- 📚 Storybook stories generation
- 💅 SCSS modules support

## Installation

```bash
npm install -g create-fsd-structure
```

Or use directly with npx:

```bash
npx create-fsd-structure
```

## Usage

### Create FSD Structure

```bash
create-fsd init
```

This will create the following structure:

```
src/
├── app/
├── processes/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
    ├── api/
    ├── config/
    ├── lib/
    ├── types/
    ├── ui/
    └── constants/
```

### Create Component

```bash
create-fsd component <layer> <name> [options]
```

Options:
- `--tests` - Generate test file
- `--stories` - Generate Storybook story
- `--scss` - Use SCSS modules (default: true)

Example:

```bash
create-fsd component features AuthForm --tests --stories
```

This will create:

```
src/features/AuthForm/
├── ui/
│   ├── AuthForm.tsx
│   ├── AuthForm.module.scss
│   ├── AuthForm.test.tsx
│   └── AuthForm.stories.tsx
└── index.ts
```

## Configuration

You can customize the templates and configuration by creating a `.fsdrc.json` file in your project root:

```json
{
  "templates": {
    "component": "custom/path/to/component.template",
    "story": "custom/path/to/story.template"
  },
  "typescript": true,
  "cssModules": "scss"
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
