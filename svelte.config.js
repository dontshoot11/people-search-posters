import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import postcssModules from "postcss-modules";

export default {
	kit: {
		adapter: adapter({
			fallback: "404.html",
		}),
		paths: {
			base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
		},
	},
	preprocess: preprocess({
		postcss: {
			plugins: [
				postcssModules({
					generateScopedName: "[name]__[local]___[hash:base64:5]",
				}),
			],
		},
	}),
};
