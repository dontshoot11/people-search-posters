<!-- FormComponent.svelte -->
<script lang="ts">
  import { formData } from "../../../../stores/formStore";
  import { get } from "svelte/store";
  import { generateFile } from "../../../../utils/generateFile";

  import type { TFormData } from "../../../../types/types";

  import styles from "./style.module.css";

  let {
    title,
    age,
    birthdate,
    location,
    circumstances,
    note,
    contacts,
    identifyingFeatures,
    format,
    name,
    surname,
    photoPositionX,
    photoPositionY,
  } = get(formData);

  function updateField<K extends keyof TFormData>(
    field: K,
    value: TFormData[K]
  ) {
    formData.update((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleInput(event: Event, field: keyof TFormData) {
    const target = event.target as HTMLInputElement;
    updateField(field, target.value);
  }

  function handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    updateField("format", target.value as TFormData["format"]);
  }

  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateField("file", imageUrl);
      };

      reader.readAsDataURL(file);
    }
  }
</script>

<form
  class={styles.form}
  on:submit|preventDefault={() => {
    generateFile();
  }}
>
  <div class={styles.formGrid}>
    <label class={styles.label}>
      Name
      <input
        type="text"
        bind:value={name}
        on:input={(e) => handleInput(e, "name")}
        required
        placeholder="Name"
      />
    </label>
    <label class={styles.label}>
      Surname
      <input
        type="text"
        bind:value={surname}
        on:input={(e) => handleInput(e, "surname")}
        required
        placeholder="Surname"
      />
    </label>
  </div>
  <label class={styles.label}>
    Upload Photo
    <input type="file" accept="image/*" on:change={handleFileUpload} />
  </label>
  <div class={styles.formGrid}>
    <label class={styles.label}>
      Age
      <input
        type="text"
        bind:value={age}
        on:input={(e) => handleInput(e, "age")}
        required
        placeholder="Name"
      />
    </label>
    <label class={styles.label}>
      Birthdate
      <input
        type="text"
        bind:value={birthdate}
        on:input={(e) => handleInput(e, "birthdate")}
        required
        placeholder="Birthdate"
      />
    </label>
  </div>
  <label class={styles.label}>
    Last known location
    <input
      type="location"
      bind:value={location}
      on:input={(e) => handleInput(e, "location")}
      required
      placeholder="Last known location"
    />
  </label>
  <label class={styles.label}>
    Circumstances of the missing
    <input
      type="circumstances"
      bind:value={circumstances}
      on:input={(e) => handleInput(e, "circumstances")}
      required
      placeholder="Circumstances of the missing"
    />
  </label>
  <label class={styles.label}>
    Identifying characteristics
    <textarea
      bind:value={identifyingFeatures}
      on:input={(e) => handleInput(e, "identifyingFeatures")}
      placeholder="Identifying features"
      required
    ></textarea>
  </label>
  <label class={styles.label}>
    Poster title
    <textarea
      bind:value={title}
      on:input={(e) => handleInput(e, "title")}
      placeholder="title"
      required
    ></textarea>
  </label>
  <label class={styles.label}>
    Note
    <textarea
      bind:value={note}
      on:input={(e) => handleInput(e, "note")}
      placeholder="note"
    ></textarea>
  </label>
  <label class={styles.label}>
    Contacts
    <textarea
      bind:value={contacts}
      on:input={(e) => handleInput(e, "contacts")}
      placeholder="contacts"
      required
    ></textarea>
  </label>
  <div class={styles.formGroup}>
    <label class={styles.label} for="format-select">Choose format:</label>
    <select
      id="format-select"
      bind:value={format}
      on:change={handleSelect}
      class={styles.select}
    >
      <option value="pdf">A4 PDF</option>
      <option value="igstory">Instagram Story</option>
      <option value="igpost">Instagram Post</option>
      <option value="fbpost">Facebook Post</option>
    </select>
  </div>
  <label class={styles.label}>
    Photo horizontal position ({photoPositionX}%)
    <input
      class={styles.rangeInput}
      type="range"
      min="0"
      max="100"
      bind:value={photoPositionX}
      on:input={(e) => handleInput(e, "photoPositionX")}
    />
  </label>
  <label class={styles.label}>
    Photo vertical position ({photoPositionY}%)
    <input
      class={styles.rangeInput}
      type="range"
      min="0"
      max="100"
      bind:value={photoPositionY}
      on:input={(e) => handleInput(e, "photoPositionY")}
    />
  </label>
  <button class={styles.button} type="submit">Generate Poster</button>
</form>
