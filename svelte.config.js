import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

export default {
	kit: {
		adapter: adapter({
			fallback: "404.html",
		}),
		paths: {
			base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
		},
	},
	preprocess: preprocess(),
};
