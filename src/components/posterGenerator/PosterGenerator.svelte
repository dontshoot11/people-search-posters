<script lang="ts">
	import html2canvas from "html2canvas";
	import jsPDF from "jspdf";

	import type { TFormat } from "./types";

	import styles from "./style.module.css";

	let title = "";
	let content = "";
	let format: TFormat = "pdf";

	$: posterClass = getPosterClass(format);

	function getPosterClass(format: TFormat) {
		switch (format) {
			case "pdf":
				return styles.pdf;
			case "insta":
				return styles.instagram;
			case "telegram":
				return styles.telegram;
			default:
				return styles.posterPdf;
		}
	}

	const generateFile = async () => {
		const element = document.getElementById("poster");
		if (element) {
			const rect = element.getBoundingClientRect();
			const canvasWidth = rect.width;
			const canvasHeight = rect.height;

			if (format === "pdf") {
				const canvas = await html2canvas(element, {
					scale: 3,
					logging: false,
					width: canvasWidth,
					height: canvasHeight,
				});

				const imgData = canvas.toDataURL("image/jpeg", 1.0);

				const pdf = new jsPDF({
					orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
					unit: "px",
					format: [canvasWidth, canvasHeight],
				});

				pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);
				pdf.save("poster.pdf");
			} else if (format === "instastory" || format === "telegram") {
				const canvas = await html2canvas(element, {
					scale: 2,
					logging: false,
					width: canvasWidth,
					height: canvasHeight,
				});

				const imgData = canvas.toDataURL("image/jpeg", 0.98);
				const link = document.createElement("a");
				link.href = imgData;
				link.download = "poster.jpg";
				link.click();
			}
		}
	};
</script>

<form on:submit|preventDefault={generateFile} class={styles.form}>
	<label class={styles.label}>
		Name
		<input type="text" bind:value={title} required placeholder="Name" />
	</label>
	<label class={styles.label}>
		Contacts
		<textarea bind:value={content} placeholder="Contacts" required></textarea>
	</label>
	<div class={styles.formatOptions}>
		<label>
			<input type="radio" bind:group={format} value="pdf" checked />
			PDF
		</label>
		<label>
			<input type="radio" bind:group={format} value="insta" />
			Instagram Story
		</label>
		<label>
			<input type="radio" bind:group={format} value="telegram" />
			Telegram Post
		</label>
	</div>
	<button type="submit">Generate Poster</button>
</form>

<div id="poster" class={`${posterClass} ${styles.poster}`}>
	<h1>{title}</h1>
	<p>{content}</p>
</div>
