<!-- FormComponent.svelte -->
<script lang="ts">
  import { formData } from "../../../../stores/formStore";
  import { get } from "svelte/store";
  import { generateFile } from "../../../../utils/generateFile";
  import {
    adjustFontSize,
    resetFontSize,
  } from "../../../../utils/adjustFontSize";

  import { adjustPosterSize } from "../../../../utils/adjustPosterSize";

  import type { TFormData } from "../../../../types/types";

  import styles from "./style.module.css";

  let {
    title,
    agePostfix,
    location,
    circumstances,
    note,
    contacts,
    identifyingFeatures,
    format,
    name,
    surname,
    showImageLabel,
    photoScale,
    photoPositionX,
    photoPositionY,
  } = get(formData);

  let showImageSettings = false;

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  function updateField<K extends keyof TFormData>(
    field: K,
    value: TFormData[K]
  ) {
    formData.update((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value) {
      const selectedDate = new Date(target.value);
      updateField("birthdate", selectedDate.getFullYear());
      let calculatedAge = currentYear - selectedDate.getFullYear();
      if (
        selectedDate.getMonth() > currentMonth ||
        (selectedDate.getMonth() === currentMonth &&
          selectedDate.getDate() > currentDay)
      ) {
        calculatedAge--;
      }
      updateField("age", calculatedAge);
    }
  }

  function handleInput(event: Event, field: keyof TFormData) {
    const target = event.target as HTMLInputElement;
    updateField(field, target.value);
    adjustFontSize();
  }

  function handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    updateField("format", target.value as TFormData["format"]);
    resetFontSize();
    adjustPosterSize();
  }

  function handleCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    updateField("showImageLabel", target.checked);
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
  <div class={styles.formGrid}>
    <label class={styles.label}>
      Upload Photo
      <input type="file" accept="image/*" on:change={handleFileUpload} />
    </label>
    <label class={styles.label}>
      Show image settings
      <input
        class={styles.checkbox}
        type="checkbox"
        bind:checked={showImageSettings}
      />
    </label>
    {#if showImageSettings}
      <div class={styles.imageSettings}>
        <label class={styles.label}>
          Photo scale ({photoScale}%)
          <input
            class={styles.rangeInput}
            type="range"
            min="0"
            max="500"
            bind:value={photoScale}
            on:input={(e) => handleInput(e, "photoScale")}
          />
        </label>
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
        <label class={styles.label}>
          Show image label
          <input
            class={styles.checkbox}
            type="checkbox"
            on:change={(e) => handleCheckboxChange(e)}
            bind:checked={showImageLabel}
          />
        </label>
      </div>
    {/if}
  </div>
  <div class={styles.formGrid}>
    <label class={styles.label}>
      Age postfix
      <input
        type="text"
        bind:value={agePostfix}
        on:input={(e) => handleInput(e, "agePostfix")}
        placeholder="Enter age postfix"
      />
    </label>
    <label class={styles.label}>
      Birth Year
      <input
        class={styles.datePicker}
        type="date"
        max={`${currentYear}-12-31`}
        on:change={handleDateChange}
        placeholder="Select birth date"
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
    <textarea
      class={styles.textareaBig}
      bind:value={circumstances}
      on:input={(e) => handleInput(e, "circumstances")}
      required
      placeholder="Circumstances of the missing"
    ></textarea>
  </label>
  <label class={styles.label}>
    Identifying characteristics
    <textarea
      class={styles.textareaBig}
      bind:value={identifyingFeatures}
      on:input={(e) => handleInput(e, "identifyingFeatures")}
      placeholder="Identifying features"
      required
    ></textarea>
  </label>
  <label class={styles.label}>
    Poster title
    <textarea
      class={styles.textareaSmall}
      bind:value={title}
      on:input={(e) => handleInput(e, "title")}
      placeholder="title"
      required
    ></textarea>
  </label>
  <label class={styles.label}>
    Note
    <textarea
      class={styles.textareaSmall}
      bind:value={note}
      on:input={(e) => handleInput(e, "note")}
      placeholder="Additional information"
    ></textarea>
  </label>
  <label class={styles.label}>
    Contacts
    <input
      bind:value={contacts}
      on:input={(e) => handleInput(e, "contacts")}
      placeholder="contacts"
      required
    />
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

  <button class={styles.button} type="submit">Generate Poster</button>
</form>
