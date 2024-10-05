<script lang="ts">
  import { get } from "svelte/store";

  import FormComponent from "./components/formComponent/FormComponent.svelte";
  import Poster from "./components/Poster/Poster.svelte";

  import { formData } from "../../stores/formStore";

  import styles from "./style.module.css";

  let { format } = get(formData);

  formData.subscribe((data) => {
    format = data.format;
  });
</script>

<div class={styles.wrapper}>
  <FormComponent />
  <Poster />
</div>
