<script lang="ts">
  import { get } from "svelte/store";
  import { formData } from "../../../../stores/formStore";
  import { adjustFontSize } from "../../../../utils/adjustFontSize";

  import styles from "./style.module.css";

  let {
    title,
    name,
    surname,
    format,
    age,
    agePostfix,
    birthdate,
    location,
    circumstances,
    identifyingFeatures,
    note,
    contacts,
    file,
    photoScale,
    photoPositionY,
    photoPositionX,
    showImageLabel,
  } = get(formData);

  formData.subscribe((data) => {
    title = data.title;
    name = data.name;
    surname = data.surname;
    age = data.age;
    agePostfix = data.agePostfix;
    birthdate = data.birthdate;
    identifyingFeatures = data.identifyingFeatures;
    format = data.format;
    location = data.location;
    circumstances = data.circumstances;
    note = data.note;
    contacts = data.contacts;
    file = data.file;
    photoScale = data.photoScale;
    photoPositionY = data.photoPositionY;
    photoPositionX = data.photoPositionX;
    showImageLabel = data.showImageLabel;
  });

  $: formData.subscribe(() => {
    adjustFontSize();
  });
</script>

<div
  id="poster"
  class={`${styles.poster} ${styles[format]}`}
  data-container="text-container"
>
  <div class={styles.infoBlock}>
    <div
      class={`${styles.photoWrap} ${showImageLabel && styles.imageLabel}`}
      style="background-image: url({file}); background-position: {photoPositionX}% {photoPositionY}%; background-size: {photoScale}%; "
    ></div>
    <div class={styles.infoBlockTextContent}>
      <div class={styles.nameBlock} data-container="text-container">
        <span class={styles.nameBlockEl} data-block="text-block">{name}</span>
        <span class={styles.nameBlockEl} data-block="text-block">{surname}</span
        >
      </div>
      <div class={styles.ageBlock} data-container="text-container">
        <div class={styles.ageWrap}>
          {#if age}
            <span class={styles.age} data-block="text-block">{age}</span>
          {/if}
          <span class={styles.age} data-block="text-block">{agePostfix}</span>
        </div>
        <span class={styles.birthdate} data-block="text-block">
          {#if birthdate}
            ({birthdate})
          {/if}
        </span>
      </div>
      <div
        class={styles.circumstancesBlock}
        data-container="text-container"
        data-block="text-block"
      >
        <div class={styles.circumstancesBlockEl}>
          {location}
        </div>
        <div class={styles.circumstancesBlockEl}>
          {circumstances}
        </div>
        <div class={styles.circumstancesBlockEl}>
          {identifyingFeatures}
        </div>
      </div>
    </div>
  </div>
  <div class={styles.contactsBlock}>
    <div class={styles.titleWrap}>
      <div class={styles.title} data-block="text-block">{title}</div>
    </div>
    {#if note.length > 0}
      <div class={styles.note} data-block="text-block">{note}</div>
    {/if}
    <div class={styles.contacts} data-block="text-block">{contacts}</div>
  </div>
</div>
