export function viteMockPlugin() {
    return {
      name: 'mock-style-plugin',
      transform(code, id) {
        if (id.endsWith('.css') || id.endsWith('.scss')) {
          return '';
        }
      },
    };
  }
  