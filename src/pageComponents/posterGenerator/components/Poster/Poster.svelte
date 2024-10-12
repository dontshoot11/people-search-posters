<script lang="ts">
  import { get } from "svelte/store";
  import { formData } from "../../../../stores/formStore";
  import { onMount } from "svelte";
  import {
    adjustPosterSize,
    resetPosterSize,
  } from "../../../../utils/adjustPosterSize";

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

  onMount(() => {
    adjustPosterSize();
  });
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      resetPosterSize();
      adjustPosterSize();
    });
  }
</script>

<div class={styles.posterWrap} id="posterWrap">
  <div
    id="poster"
    class={`${styles.poster} ${styles[format]}`}
    data-container="text-container"
  >
    {#if format === "igpost"}
      <div class={`${styles.titleWrap} ${styles[format]}`}>
        <div
          class={`${styles.title} ${styles[format]}`}
          data-block="text-block"
        >
          {title}
        </div>
      </div>
    {/if}
    <div class={`${styles.infoBlock} ${styles[format]}`}>
      <div
        class={`${styles.photoWrap} ${styles[format]} ${showImageLabel && styles.imageLabel}`}
        style="background-image: url({file}); background-position: {photoPositionX}% {photoPositionY}%; background-size: {photoScale}%; "
      ></div>
      <div class={`${styles.infoBlockTextContent} ${styles[format]}`}>
        {#if format === "fbpost"}
          <div class={`${styles.titleWrap} ${styles[format]}`}>
            <div
              class={`${styles.title} ${styles[format]}`}
              data-block="text-block"
            >
              {title}
            </div>
          </div>
        {/if}
        <div
          class={`${styles.nameBlock} ${styles[format]}`}
          data-container="text-container"
        >
          <span
            class={`${styles.nameBlockEl} ${styles[format]}`}
            data-block="text-block">{name}</span
          >
          <span
            class={`${styles.nameBlockEl} ${styles[format]}`}
            data-block="text-block">{surname}</span
          >
        </div>
        <div
          class={`${styles.ageBlock} ${styles[format]}`}
          data-container="text-container"
        >
          <div class={styles.ageWrap}>
            {#if age}
              <span
                class={`${styles.age} ${styles[format]}`}
                data-block="text-block">{age}</span
              >
            {/if}
            <span
              class={`${styles.age} ${styles[format]}`}
              data-block="text-block">{agePostfix}</span
            >
          </div>
          <span
            class={`${styles.birthdate} ${styles[format]}`}
            data-block="text-block"
          >
            {#if birthdate}
              ({birthdate})
            {/if}
          </span>
        </div>
        <div
          class={`${styles.circumstancesBlock} ${styles[format]}`}
          data-container="text-container"
          data-block="text-block"
        >
          <div class={`${styles.circumstancesBlockEl} ${styles[format]}`}>
            {location}
          </div>
          <div class={`${styles.circumstancesBlockEl} ${styles[format]}`}>
            {circumstances}
          </div>
          <div class={`${styles.circumstancesBlockEl} ${styles[format]}`}>
            {identifyingFeatures}
          </div>
          {#if note.length > 0 && format === "fbpost"}
            <div
              class={`${styles.note} ${styles[format]}`}
              data-block="text-block"
            >
              {note}
            </div>
          {/if}
        </div>
        {#if note.length > 0 && format === "igpost"}
          <div
            class={`${styles.note} ${styles[format]}`}
            data-block="text-block"
          >
            {note}
          </div>
        {/if}
        {#if format === "fbpost"}
          <div
            class={`${styles.contacts} ${styles[format]}`}
            data-block="text-block"
          >
            <span class={styles.phone}></span>
            <span> {contacts}</span>
          </div>
        {/if}
      </div>
    </div>
    {#if format === "igstory" || format === "igpost" || format === "pdf"}
      <div class={styles.contactsBlock}>
        {#if format === "igstory" || format === "pdf"}
          <div class={`${styles.titleWrap} ${styles[format]}`}>
            <div
              class={`${styles.title} ${styles[format]}`}
              data-block="text-block"
            >
              {title}
            </div>
          </div>
        {/if}
        {#if note.length > 0 && (format === "igstory" || format === "pdf")}
          <div
            class={`${styles.note} ${styles[format]}`}
            data-block="text-block"
          >
            {note}
          </div>
        {/if}
        {#if format === "igstory" || format === "igpost" || format === "pdf"}
          <div
            class={`${styles.contacts} ${styles[format]}`}
            data-block="text-block"
          >
            <span class={styles.phone}></span>
            <span> {contacts}</span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
