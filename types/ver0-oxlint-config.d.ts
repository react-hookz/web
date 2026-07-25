// @ver0/oxlint-config ships plain JS presets without declarations, so every
// preset import resolves to `any` and poisons the lint config in vite.config.ts.
declare module '@ver0/oxlint-config/*' {
	import type {OxlintConfig} from 'oxlint';

	const config: OxlintConfig;

	export default config;
}
