# Contributing to React Native DevMonitor 🛠️

First off, thank you for considering contributing to DevMonitor! It's people like you who make the open-source community such an amazing place.

## 🏗️ Project Architecture

DevMonitor is a monorepo-style project consisting of three main parts:

1.  **Library (`/src`):** The core React Native logic and network interceptors.
2.  **Dashboard (`/web`):** The Next.js based web interface.
3.  **CLI (`/bin`):** The Node.js server that bridges the App and the Dashboard.

---

## 🚀 Setting Up the Development Environment

Follow these steps to get the project running locally for development:

### 1. Clone and Install

```bash
git clone https://github.com/GurayCoskun/react-native-dev-monitor.git
cd react-native-dev-monitor
yarn install
```

### 2. Development Workflow

Since the components depend on each other, you should run them in the following order:

#### Step A: Build the Dashboard

The CLI serves the dashboard from the `dashboard-dist` folder. You need to build the Next.js app first:

```bash
cd dashboard
next build # This will export the static files to /dashboard-dist
cd ..
```

#### Step B: Build the Library

The CLI and the example app depend on the compiled library code:

```bash
yarn prepare # Runs bob build to generate the /lib folder
```

#### Step C: Run the CLI

Now you can start the local server to test the dashboard:

```bash
node ./bin/cli.js
```

## 📱 Testing with the Example App

We have a built-in example app in the `/example` folder to test your changes instantly:

1.  Navigate to the example folder: `cd example`
2.  Install dependencies: `yarn install`
3.  Run the app: `npx expo start`

## 🧪 Development Guidelines

- **TypeScript:** All core logic must be written in TypeScript.
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- **Builds:** Always run `yarn prepare` before submitting a PR to ensure the `lib` and `dashboard-dist` are updated.

## 📮 Submission Process

1.  Fork the repo and create your branch from `main`.
2.  If you've added code that should be tested, add some tests!
3.  Ensure the test suite passes.
4.  Open a Pull Request with a clear description of the changes.

Questions? Feel free to open an issue or reach out to **Güray Coşkun**.
