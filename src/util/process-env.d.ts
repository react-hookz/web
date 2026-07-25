// Development-only warnings are guarded by `process.env.NODE_ENV`, which every
// bundler replaces at build time. Declaring the single field the sources touch
// keeps @types/node out of the browser build and off consumers' type surface.
declare const process: {readonly env: {readonly NODE_ENV?: string}};
