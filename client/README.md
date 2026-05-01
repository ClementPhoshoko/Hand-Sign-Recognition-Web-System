# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Tour Component

This project uses **React Joyride** - a popular, feature-rich tour library to guide users through your application.

### Components
- **Tour**: Wrapper around React Joyride with custom styling
- **TourButton**: Wrapper component with a button to trigger the tour

### Usage
```jsx
import { TourButton } from './components/tour'

const tourSteps = [
  {
    target: '#element-id',
    content: (
      <div>
        <h3>Welcome!</h3>
        <p>This is a guided tour of our app.</p>
      </div>
    ),
    disableBeacon: true,
  }
]

<TourButton steps={tourSteps} buttonText="Start Tour" />
```

### React Joyride Step Properties
- `target`: CSS selector of the element to highlight
- `content`: Content to display (can be JSX)
- `title`: Step title (optional)
- `disableBeacon`: Set to `true` to hide the beacon before the step
- `placement`: Tooltip placement (top, bottom, left, right)

### Documentation
See [React Joyride documentation](https://react-joyride.com/) for more features and customization options.
