<script>
	// @ts-nocheck

	import { onMount } from "svelte";
	let html2pdf;

	onMount(async () => {
		html2pdf = (await import("html2pdf.js")).default;
	});

	let title = "";
	let content = "";

	const generatePoster = () => {
		const element = document.getElementById("poster");
		const opt = {
			margin: 0.5,
			filename: "poster.pdf",
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
		};

		html2pdf().from(element).set(opt).save();
	};
</script>

<form on:submit|preventDefault={generatePoster} class="form">
	<label class="label">
		Name
		<input type="text" bind:value={title} required placeholder="Name" />
	</label>
	<label class="label">
		Contacts
		<textarea type="text" bind:value={content} placeholder="Contacts" required
		></textarea>
	</label>
	<button type="submit">Generate Poster</button>
</form>

<div id="poster">
	<h1>{title}</h1>
	<p>{content}</p>
</div>

<style>
	.form {
		display: grid;
	}
	.label {
		display: grid;
	}
</style>
