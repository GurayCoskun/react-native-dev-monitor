# React Native DevMonitor 🚀

**React Native DevMonitor** is a lightweight, real-time network traffic inspector for React Native applications. It allows you to monitor all outgoing network requests (REST, GraphQL, etc.) directly in your browser, eliminating the need for heavy tools like Flipper or [react-native-network-logger](https://github.com/alexbrazier/react-native-network-logger).

## 📸 Screenshots

| Dashboard |

<img src="https://raw.githubusercontent.com/GurayCoskun/react-native-dev-monitor/refs/heads/main/.github/images/dashboard-table.png" width="400" alt="Dashboard Table" />

| In-App Overlay |

<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/GurayCoskun/react-native-dev-monitor/refs/heads/main/.github/images/mobile-bumble.png" width="175" alt="Mobile Bumble" />
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/GurayCoskun/react-native-dev-monitor/refs/heads/main/.github/images/mobile-overlay.png" width="175" alt="Mobile Overlay" />
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/GurayCoskun/react-native-dev-monitor/refs/heads/main/.github/images/log-detail.png" width="175" alt="Log Detail" />
    </td>
  </tr>
</table>

## ✨ Features

- **Zero Config:** Just import and start monitoring.
- **Modern Web Dashboard:** A clean, fast, and searchable interface for all your network logs.
- **Real-time Updates:** Powered by [Socket.io](https://socket.io) for instantaneous data streaming.
- **Integrated CLI:** Launch the dashboard and proxy server with a single command.

## 📦 Installation

Add the package to your project:

```bash
Example
npm install react-native-dev-monitor
```

## 🚀 Quick Start

**1. App Integration**
Simply import the package at the very top of your application's entry point (e.g., `index.js` or `App.tsx`). The interceptor will start automatically in development mode.

```bash
import  'react-native-dev-monitor';
```

**2. Launching the Dashboard**
Run the following command in your terminal to start the monitor server and open the dashboard:

```bash
npx react-native-dev-monitor
```

This will automatically open your default browser at `http://localhost:3001`.

**3. In-App UI**
If you want to inspect logs directly within your mobile app, you can use the built-in Overlay component. It provides both a minimized "bubble" view and a full-screen log inspector.

```bash
import { DevMonitorOverlay } from 'react-native-dev-monitor';

const App = () => {
	return (
		<>
			<YourAppContents />
			{/**
			 * Display modes:
			 * - 'mini': A floating bubble
			 * - 'fullscreen': A full-page log inspector (Default)
			 */}
			<DevMonitorOverlay mode={'mini'}/>
		</>
	);
};
```

## 🛠 How It Works

DevMonitor consists of three core components:

1.  **Interceptor:** A mobile module that hooks into `XMLHttpRequest` and `fetch` to capture traffic.
2.  **CLI & Server:** A Node.js server that receives logs from the app and broadcasts them via WebSockets.
3.  **Dashboard:** A pre-built Next.js application that displays logs with full request/response details.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please check out our [Contributing Guide](CONTRIBUTING.md) to learn how to set up the project locally and submit your changes.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
