// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "html2pdf.js" {
	interface Html2PdfOptions {
		margin?: number | [number, number, number, number];
		filename?: string;
		image?: { type: string; quality: number };
		html2canvas?: { scale: number };
		jsPDF?: {
			unit: string;
			format: string | [number, number];
			orientation: string;
		};
	}

	interface Html2Pdf {
		from(element: HTMLElement): this;
		set(options: Html2PdfOptions): this;
		save(): void;
	}

	function html2pdf(): Html2Pdf;

	export = html2pdf;
}

export {};
