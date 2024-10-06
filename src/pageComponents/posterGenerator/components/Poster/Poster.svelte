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
    birthdate,
    location,
    circumstances,
    identifyingFeatures,
    note,
    contacts,
    file,
    photoPositionY,
    photoPositionX,
  } = get(formData);

  formData.subscribe((data) => {
    title = data.title;
    name = data.name;
    surname = data.surname;
    age = data.age;
    birthdate = data.birthdate;
    identifyingFeatures = data.identifyingFeatures;
    format = data.format;
    location = data.location;
    circumstances = data.circumstances;
    note = data.note;
    contacts = data.contacts;
    file = data.file;
    photoPositionY = data.photoPositionY;
    photoPositionX = data.photoPositionX;
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
      class={styles.photoWrap}
      style="background-image: url({file}); background-position: {photoPositionX}% {photoPositionY}%; background-size: cover; "
    ></div>
    <div class={styles.infoBlockTextContent}>
      <div class={styles.nameBlock} data-container="text-container">
        <span class={styles.nameBlockEl} data-block="text-block">{name}</span>
        <span class={styles.nameBlockEl} data-block="text-block">{surname}</span
        >
      </div>
      <div class={styles.ageBlock} data-container="text-container">
        <span class={styles.age} data-block="text-block">{age}</span>
        <span class={styles.birthdate} data-block="text-block">
          ({birthdate})
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
