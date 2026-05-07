import { test, describe } from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';

// Setup JSDOM BEFORE importing React and Testing Library
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});
global.window = dom.window as any;
global.document = dom.window.document as any;
global.getComputedStyle = dom.window.getComputedStyle;
global.HTMLElement = dom.window.HTMLElement as any;
global.MutationObserver = dom.window.MutationObserver;
// Need to add CustomEvent to global for Radix to work around JSDOM bug
global.CustomEvent = dom.window.CustomEvent as any;
global.Event = dom.window.Event as any;

// Radix ui needs PointerEvent to be defined
global.PointerEvent = dom.window.PointerEvent as any || global.Event;

// A polyfill for matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
global.SVGElement = dom.window.SVGElement as any;
global.Element = dom.window.Element as any;

// A mock to bypass AbortSignal issues in jsdom with framer-motion
const originalAddEventListener = dom.window.EventTarget.prototype.addEventListener;
dom.window.EventTarget.prototype.addEventListener = function (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
  if (options && typeof options === 'object' && 'signal' in options) {
    const { signal, ...restOptions } = options as any;
    return originalAddEventListener.call(this, type, listener, restOptions);
  }
  return originalAddEventListener.call(this, type, listener, options);
};

// Ignore react and fetchpriority warnings
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: React does not recognize the `fetchPriority` prop') ||
      args[0].includes('Consider adding an error boundary') ||
      args[0].includes('The above error occurred in the') ||
      args[0].includes('Warning: Received `true` for a non-boolean attribute `fill`'))
  ) {
    return;
  }
  originalError(...args);
};

// Mock next/image
const requireModule = require('module');
const originalLoad = requireModule._load;
requireModule._load = function (request: string, parent: any, isMain: boolean) {
  if (request === 'next/image') {
    return {
      __esModule: true,
      default: function MockImage(props: any) {
        const React = require('react');
        return React.createElement('img', {
          src: props.src,
          alt: props.alt,
          'data-testid': 'mock-image'
        });
      }
    };
  }

  // Actually we can mock LoreModal too, to completely bypass Radix UI's complex logic which crashes JSDOM
  if (request.endsWith('LoreModal') || request === './LoreModal') {
    return {
      __esModule: true,
      default: function MockLoreModal(props: any) {
        const React = require('react');
        return React.createElement('div', {
          'data-testid': 'mock-modal',
          'data-isopen': props.isOpen ? 'true' : 'false',
        }, props.isOpen ? 'Modal is open' : 'Modal is closed');
      }
    };
  }

  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  return originalLoad.apply(this, arguments);
};

async function runTests() {
  const React = (await import('react')).default;
  const { render, screen, fireEvent, cleanup } = await import('@testing-library/react');

  const LoreCard = (await import('./LoreCard')).default;

  describe('LoreCard', () => {
    const defaultProps = {
      title: 'Test Title',
      content: 'Test content here',
      categoryName: 'Test Category',
    };

    test('renders correctly with required props', () => {
      cleanup();
      render(React.createElement(LoreCard, defaultProps));

      const titleEl = screen.getByText('Test Title');
      assert.ok(titleEl !== null);

      const contentEl = screen.getByText('Test content here');
      assert.ok(contentEl !== null);

      const categoryEl = screen.getByText('Test Category');
      assert.ok(categoryEl !== null);

      const noImageEl = screen.getByText('No Image');
      assert.ok(noImageEl !== null);

      const modalEl = screen.getByTestId('mock-modal');
      assert.strictEqual(modalEl.getAttribute('data-isopen'), 'false');
    });

    test('renders correctly with image prop', () => {
      cleanup();
      render(React.createElement(LoreCard, { ...defaultProps, imageUrl: 'http://example.com/image.jpg' }));

      const noImageEl = screen.queryByText('No Image');
      assert.strictEqual(noImageEl, null);

      const imgEl = screen.getByTestId('mock-image');
      assert.ok(imgEl !== null);
    });

    test('opens modal when clicked', async () => {
      cleanup();
      render(React.createElement(LoreCard, defaultProps));

      let modalEl = screen.getByTestId('mock-modal');
      assert.strictEqual(modalEl.getAttribute('data-isopen'), 'false');

      const clickableCard = screen.getByText('Test Title').closest('div')?.parentElement;
      assert.ok(clickableCard !== null);

      if (clickableCard) {
        fireEvent.click(clickableCard);
      }

      modalEl = screen.getByTestId('mock-modal');
      assert.strictEqual(modalEl.getAttribute('data-isopen'), 'true');
    });
  });
}

runTests().catch(console.error);
