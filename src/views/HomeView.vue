<template>
  <div style="display: flex; position: sticky; top: 0; background: white; z-index: 64; gap: 16px; padding: 16px">
    <md2-chip :selected="iconTurn" choice height="sm" label="Turn" @click="iconTurn=!iconTurn"/>
    <md2-chip :selected="iconHide" choice height="sm" label="Hide" @click="iconHide=!iconHide"/>
    <md2-chip :selected="selected" choice height="sm" label="Selected" @click="selected=!selected"/>
    <md2-chip :selected="dragged" choice height="sm" label="Dragged" @click="dragged=!dragged"/>
    <md2-chip :selected="progress" choice height="sm" label="Progress" @click="progress=!progress"/>
    <md2-chip :selected="readonly" choice height="sm" label="Readonly" @click="readonly=!readonly"/>
    <md2-chip :selected="disabled" choice height="sm" label="Disabled" @click="disabled=!disabled"/>
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      text
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      icon-trailing="home"
      text
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      label="label"
      text
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      label="label"
      text
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      icon-trailing="home"
      label="label"
      text
    />
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      outlined
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      icon-trailing="home"
      outlined
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      label="label"
      outlined
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      label="label"
      outlined
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      icon-trailing="home"
      label="label"
      outlined
    />
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      icon-trailing="home"
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      label="label"
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      label="label"
    />
    <md2-button
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      icon="face"
      icon-trailing="home"
      label="label"
    />
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      icon-trailing="home"
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      label="label"
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      label="label"
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      icon-trailing="home"
      label="label"
    />
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      icon-trailing="home"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      label="label"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      label="label"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      icon="face"
      icon-trailing="home"
      label="label"
      outlined
    />
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      choice
      icon="face"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      choice
      icon="face"
      icon-trailing="home"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      choice
      label="label"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      choice
      icon="face"
      label="label"
      outlined
    />
    <md2-chip
      :disabled="disabled"
      :dragged="dragged"
      :icon-hide="iconHide"
      :icon-turn="iconTurn"
      :progress="progress"
      :readonly="readonly"
      :selected="selected"
      choice
      icon="face"
      icon-trailing="home"
      label="label"
      outlined
    />
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">height</div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-button height="sm" icon="face" label="sm"/>
    <md2-button height="md" icon="face" label="md"/>
    <md2-button height="lg" icon="face" label="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-chip height="sm" icon="face" label="sm"/>
    <md2-chip height="md" icon="face" label="md"/>
    <md2-chip height="lg" icon="face" label="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">adaptive</div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-button adaptive="sm" icon="face" label="sm"/>
    <md2-button adaptive="md" icon="face" label="md"/>
    <md2-button adaptive="lg" icon="face" label="lg"/>
  </div>
  <div style="display: flex; gap: 16px; padding: 16px">palette</div>
  <div style="display: flex; gap: 16px; padding: 16px">
    <md2-button icon="face" label="indigo" text palette="indigo"/>
    <md2-button icon="face" label="purple" text palette="purple"/>
    <md2-button icon="face" label="amber" outlined palette="amber"/>
    <md2-button icon="face" label="blue" outlined palette="blue"/>
    <md2-button icon="face" label="deep-purple" palette="deep-purple"/>
    <md2-button icon="face" label="green" palette="green"/>
  </div>
  <div v-if="false">
    <md3-progress visible/>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip icon="face"/>
      <md3-chip label="Label"/>
      <md3-chip icon="face" label="Label"/>
      <md3-chip :icon="image" label="Avatar" avatar/>
      <md3-chip :icon="image" icon-trailing="close" label="Avatar" avatar/>
      <md3-chip icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-chip icon="face" label="Selected + Progress" :selected="selected" :progress="progress"/>
      <md3-chip icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-chip icon="face" label="Dragged" :dragged="dragged" @click="dragged = !dragged"/>
      <md3-chip icon="face" label="Readonly" readonly/>
      <md3-chip icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" elevated icon="face"/>
      <md3-chip tag="button" elevated label="Label"/>
      <md3-chip tag="button" elevated icon="face" label="Label"/>
      <md3-chip tag="button" elevated icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-chip tag="button" elevated icon="face" label="Selected + Progress" :selected="selected"
                :progress="progress"/>
      <md3-chip tag="button" elevated icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-chip tag="button" elevated icon="face" label="Dragged" :dragged="dragged" @click="dragged = !dragged"/>
      <md3-chip tag="button" elevated icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" elevated icon="face" label="Disabled" disabled/>
    </div>
    assist
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" assist icon="face"/>
      <md3-chip tag="button" assist label="Label"/>
      <md3-chip tag="button" assist icon="face" label="Label"/>
      <md3-chip tag="button" assist icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-chip tag="button" assist icon="face" label="Selected + Progress" :selected="selected" :progress="progress"/>
      <md3-chip tag="button" assist icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-chip tag="button" assist icon="face" label="Dragged" :dragged="dragged" @click="dragged = !dragged"/>
      <md3-chip tag="button" assist icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" assist icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" assist elevated icon="face"/>
      <md3-chip tag="button" assist elevated label="Label"/>
      <md3-chip tag="button" assist elevated icon="face" label="Label"/>
      <md3-chip tag="button" assist elevated icon="face" label="Selected" :selected="selected"
                @click="selected = !selected"/>
      <md3-chip tag="button" assist elevated icon="face" label="Selected + Progress" :selected="selected"
                :progress="progress"/>
      <md3-chip tag="button" assist elevated icon="face" label="Progress" :progress="progress"
                @click="progress = !progress"/>
      <md3-chip tag="button" assist elevated icon="face" label="Dragged" :dragged="dragged"
                @click="dragged = !dragged"/>
      <md3-chip tag="button" assist elevated icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" assist elevated icon="face" label="Disabled" disabled/>
    </div>
    filter
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" filter icon="face"/>
      <md3-chip tag="button" filter label="Label"/>
      <md3-chip tag="button" filter icon="face" label="Label"/>
      <md3-chip tag="button" filter icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-chip tag="button" filter icon="face" label="Selected + Progress" :selected="selected" :progress="progress"/>
      <md3-chip tag="button" filter icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-chip tag="button" filter icon="face" label="Dragged" :dragged="dragged" @click="dragged = !dragged"/>
      <md3-chip tag="button" filter icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" filter icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" filter elevated icon="face"/>
      <md3-chip tag="button" filter elevated label="Label"/>
      <md3-chip tag="button" filter elevated icon="face" label="Label"/>
      <md3-chip tag="button" filter elevated icon="face" label="Selected" :selected="selected"
                @click="selected = !selected"/>
      <md3-chip tag="button" filter elevated icon="face" label="Selected + Progress" :selected="selected"
                :progress="progress"/>
      <md3-chip tag="button" filter elevated icon="face" label="Progress" :progress="progress"
                @click="progress = !progress"/>
      <md3-chip tag="button" filter elevated icon="face" label="Dragged" :dragged="dragged"
                @click="dragged = !dragged"/>
      <md3-chip tag="button" filter elevated icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" filter elevated icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" filter palette="error" icon="face"/>
      <md3-chip tag="button" filter palette="error" label="Label"/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Label"/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Selected" :selected="selected"
                @click="selected = !selected"/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Selected + Progress" :selected="selected"
                :progress="progress"/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Progress" :progress="progress"
                @click="progress = !progress"/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Dragged" :dragged="dragged"
                @click="dragged = !dragged"/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" filter palette="error" icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-chip tag="button" filter palette="error" elevated icon="face"/>
      <md3-chip tag="button" filter palette="error" elevated label="Label"/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Label"/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Selected" :selected="selected"
                @click="selected = !selected"/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Selected + Progress"
                :selected="selected" :progress="progress"/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Progress" :progress="progress"
                @click="progress = !progress"/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Dragged" :dragged="dragged"
                @click="dragged = !dragged"/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Readonly" readonly/>
      <md3-chip tag="button" filter palette="error" elevated icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button icon="face"/>
      <md3-button label="Label"/>
      <md3-button icon="face" label="Label"/>
      <md3-button icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button palette="secondary" icon="face"/>
      <md3-button palette="secondary" label="Label"/>
      <md3-button palette="secondary" icon="face" label="Label"/>
      <md3-button palette="secondary" icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button palette="secondary" icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button palette="secondary" icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button palette="tertiary" icon="face"/>
      <md3-button palette="tertiary" label="Label"/>
      <md3-button palette="tertiary" icon="face" label="Label"/>
      <md3-button palette="tertiary" icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button palette="tertiary" icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button palette="tertiary" icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
      <md3-button palette="tertiary" icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button outlined icon="face"/>
      <md3-button outlined label="Label"/>
      <md3-button outlined icon="face" label="Label"/>
      <md3-button outlined icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button outlined icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button outlined icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
      <md3-button outlined icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button outlined palette="tertiary" icon="face"/>
      <md3-button outlined palette="tertiary" label="Label"/>
      <md3-button outlined palette="tertiary" icon="face" label="Label"/>
      <md3-button outlined palette="tertiary" icon="face" label="Selected" :selected="selected"
                  @click="selected = !selected"/>
      <md3-button outlined palette="tertiary" icon="face" label="Progress" :progress="progress"
                  @click="progress = !progress"/>
      <md3-button outlined palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                  :selected="selected"/>
      <md3-button outlined palette="tertiary" icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button text icon="face"/>
      <md3-button text label="Label"/>
      <md3-button text icon="face" label="Label"/>
      <md3-button text icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button text icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button text icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
      <md3-button text icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button text palette="tertiary" icon="face"/>
      <md3-button text palette="tertiary" label="Label"/>
      <md3-button text palette="tertiary" icon="face" label="Label"/>
      <md3-button text palette="tertiary" icon="face" label="Selected" :selected="selected"
                  @click="selected = !selected"/>
      <md3-button text palette="tertiary" icon="face" label="Progress" :progress="progress"
                  @click="progress = !progress"/>
      <md3-button text palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                  :selected="selected"/>
      <md3-button text palette="tertiary" icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button elevated icon="face"/>
      <md3-button elevated label="Label"/>
      <md3-button elevated icon="face" label="Label"/>
      <md3-button elevated icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button elevated icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button elevated icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
      <md3-button elevated icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button elevated palette="tertiary" icon="face"/>
      <md3-button elevated palette="tertiary" label="Label"/>
      <md3-button elevated palette="tertiary" icon="face" label="Label"/>
      <md3-button elevated palette="tertiary" icon="face" label="Selected" :selected="selected"
                  @click="selected = !selected"/>
      <md3-button elevated palette="tertiary" icon="face" label="Progress" :progress="progress"
                  @click="progress = !progress"/>
      <md3-button elevated palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                  :selected="selected"/>
      <md3-button elevated palette="tertiary" icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button tonal icon="face"/>
      <md3-button tonal label="Label"/>
      <md3-button tonal icon="face" label="Label"/>
      <md3-button tonal icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
      <md3-button tonal icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
      <md3-button tonal icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
      <md3-button tonal icon="face" label="Disabled" disabled/>
    </div>
    <div style="display: flex; gap: 16px; padding: 16px">
      <md3-button tonal palette="tertiary" icon="face"/>
      <md3-button tonal palette="tertiary" label="Label"/>
      <md3-button tonal palette="tertiary" icon="face" label="Label"/>
      <md3-button tonal palette="tertiary" icon="face" label="Selected" :selected="selected"
                  @click="selected = !selected"/>
      <md3-button tonal palette="tertiary" icon="face" label="Progress" :progress="progress"
                  @click="progress = !progress"/>
      <md3-button tonal palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                  :selected="selected"/>
      <md3-button tonal palette="tertiary" icon="face" label="Disabled" disabled/>
    </div>
    <div class="md3-dark">
      <div class="md3-elevation--1">
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button icon="face"/>
          <md3-button label="Label"/>
          <md3-button icon="face" label="Label"/>
          <md3-button icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
          <md3-button icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
          <md3-button icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button palette="secondary" icon="face"/>
          <md3-button palette="secondary" label="Label"/>
          <md3-button palette="secondary" icon="face" label="Label"/>
          <md3-button palette="secondary" icon="face" label="Selected" :selected="selected"
                      @click="selected = !selected"/>
          <md3-button palette="secondary" icon="face" label="Progress" :progress="progress"
                      @click="progress = !progress"/>
          <md3-button palette="secondary" icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button palette="tertiary" icon="face"/>
          <md3-button palette="tertiary" label="Label"/>
          <md3-button palette="tertiary" icon="face" label="Label"/>
          <md3-button palette="tertiary" icon="face" label="Selected" :selected="selected"
                      @click="selected = !selected"/>
          <md3-button palette="tertiary" icon="face" label="Progress" :progress="progress"
                      @click="progress = !progress"/>
          <md3-button palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                      :selected="selected"/>
          <md3-button palette="tertiary" icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button outlined icon="face"/>
          <md3-button outlined label="Label"/>
          <md3-button outlined icon="face" label="Label"/>
          <md3-button outlined icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
          <md3-button outlined icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
          <md3-button outlined icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
          <md3-button outlined icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button outlined palette="tertiary" icon="face"/>
          <md3-button outlined palette="tertiary" label="Label"/>
          <md3-button outlined palette="tertiary" icon="face" label="Label"/>
          <md3-button outlined palette="tertiary" icon="face" label="Selected" :selected="selected"
                      @click="selected = !selected"/>
          <md3-button outlined palette="tertiary" icon="face" label="Progress" :progress="progress"
                      @click="progress = !progress"/>
          <md3-button outlined palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                      :selected="selected"/>
          <md3-button outlined palette="tertiary" icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button text icon="face"/>
          <md3-button text label="Label"/>
          <md3-button text icon="face" label="Label"/>
          <md3-button text icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
          <md3-button text icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
          <md3-button text icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
          <md3-button text icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button text palette="tertiary" icon="face"/>
          <md3-button text palette="tertiary" label="Label"/>
          <md3-button text palette="tertiary" icon="face" label="Label"/>
          <md3-button text palette="tertiary" icon="face" label="Selected" :selected="selected"
                      @click="selected = !selected"/>
          <md3-button text palette="tertiary" icon="face" label="Progress" :progress="progress"
                      @click="progress = !progress"/>
          <md3-button text palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                      :selected="selected"/>
          <md3-button text palette="tertiary" icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button elevated icon="face"/>
          <md3-button elevated label="Label"/>
          <md3-button elevated icon="face" label="Label"/>
          <md3-button elevated icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
          <md3-button elevated icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
          <md3-button elevated icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
          <md3-button elevated icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button elevated palette="tertiary" icon="face"/>
          <md3-button elevated palette="tertiary" label="Label"/>
          <md3-button elevated palette="tertiary" icon="face" label="Label"/>
          <md3-button elevated palette="tertiary" icon="face" label="Selected" :selected="selected"
                      @click="selected = !selected"/>
          <md3-button elevated palette="tertiary" icon="face" label="Progress" :progress="progress"
                      @click="progress = !progress"/>
          <md3-button elevated palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                      :selected="selected"/>
          <md3-button elevated palette="tertiary" icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button tonal icon="face"/>
          <md3-button tonal label="Label"/>
          <md3-button tonal icon="face" label="Label"/>
          <md3-button tonal icon="face" label="Selected" :selected="selected" @click="selected = !selected"/>
          <md3-button tonal icon="face" label="Progress" :progress="progress" @click="progress = !progress"/>
          <md3-button tonal icon="face" label="Selected + Progress" :progress="progress" :selected="selected"/>
          <md3-button tonal icon="face" label="Disabled" disabled/>
        </div>
        <div style="display: flex; gap: 16px; padding: 16px">
          <md3-button tonal palette="tertiary" icon="face"/>
          <md3-button tonal palette="tertiary" label="Label"/>
          <md3-button tonal palette="tertiary" icon="face" label="Label"/>
          <md3-button tonal palette="tertiary" icon="face" label="Selected" :selected="selected"
                      @click="selected = !selected"/>
          <md3-button tonal palette="tertiary" icon="face" label="Progress" :progress="progress"
                      @click="progress = !progress"/>
          <md3-button tonal palette="tertiary" icon="face" label="Selected + Progress" :progress="progress"
                      :selected="selected"/>
          <md3-button tonal palette="tertiary" icon="face" label="Disabled" disabled/>
        </div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px">
      <md3-icon icon="face" style="border: solid 1px;"/>
      <md3-icon icon="face" size="xs" style="border: solid 1px;"/>
      <md3-icon icon="face" size="sm" style="border: solid 1px;"/>
      <md3-icon icon="face" size="md" style="border: solid 1px;"/>
      <md3-icon icon="face" size="lg" style="border: solid 1px;"/>
      <md3-icon icon="face" size="xl" style="border: solid 1px;"/>
    </div>
    <div style="display: flex; align-items: center; gap: 16px; padding: 16px">
      <md3-icon v-bind="image"/>
      <md3-icon v-bind="image" size="xs"/>
      <md3-icon v-bind="image" size="sm"/>
      <md3-icon v-bind="image" size="md"/>
      <md3-icon v-bind="image" size="lg"/>
      <md3-icon v-bind="image" size="xl"/>
    </div>
    <div style="display: flex; gap: 16px;">
      <md2-fab icon="face"/>
      <md2-fab label="label"/>
      <md2-fab icon="face" label="label"/>
      <md2-fab>slot</md2-fab>
      <md2-fab :label="text" @click="text = text ? undefined : 'text'"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip icon="face"/>
      <md2-chip label="label"/>
      <md2-chip icon="face" label="label"/>
      <md2-chip>slot</md2-chip>
      <md2-chip :label="text" @click="text = text ? undefined : 'text'"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip outlined icon="face"/>
      <md2-chip outlined label="label"/>
      <md2-chip outlined icon="face" label="label"/>
      <md2-chip outlined>slot</md2-chip>
      <md2-chip outlined :label="text" @click="text = text ? undefined : 'text'"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip icon="face" label="dragged" dragged/>
      <md2-chip icon="face" label="readonly" readonly/>
      <md2-chip icon="face" label="disabled" disabled/>
      <md2-chip icon="face" label="disabled click" :disabled="disabled" @click="disabled=!disabled"/>
      <md2-chip icon="face" label="selected" selected/>
      <md2-chip :icon="{icon:'face',iconActive:'home'}" label="selected click" :selected="selected"
                @click="selected=!selected"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip outlined icon="face" label="dragged" dragged/>
      <md2-chip outlined icon="face" label="readonly" readonly/>
      <md2-chip outlined icon="face" label="disabled" disabled/>
      <md2-chip outlined icon="face" label="disabled click" :disabled="disabled" @click="disabled=!disabled"/>
      <md2-chip outlined icon="face" label="selected" selected/>
      <md2-chip outlined :icon="{icon:'face',iconActive:'home'}" label="selected click" :selected="selected"
                @click="selected=!selected"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip icon="face" label="sm" height="sm"/>
      <md2-chip icon="face" label="md" height="md"/>
      <md2-chip icon="face" label="lg" height="lg"/>
      <md2-chip icon="face" label="52px" height="52px"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip icon="face" label="label" palette="cyan"/>
      <md2-chip icon="face" label="label" palette="green"/>
      <md2-chip icon="face" label="hide" palette="green" :icon-hide="hide"/>
      <md2-chip
        :icon="{icon:'face',iconActive:'home'}"
        :selected="selected"
        label="selected click"
        palette="deep-purple"
        @click="selected=!selected"
      />
      <md2-chip
        :icon="{icon:'face',iconActive:'home'}"
        :selected="selected"
        choice
        label="selected click"
        palette="deep-purple"
        @click="selected=!selected"
      />
      <md2-chip
        :progress="progress"
        icon="face"
        icon-trailing="home"
        label="progress"
        @click="progress = !progress"
      />
      <md2-chip
        :progress="progress"
        :selected="selected"
        choice
        icon="face"
        icon-trailing="home"
        label="progress"
        @click="progress = !progress"
      />
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-chip outlined icon="face" label="label" palette="cyan"/>
      <md2-chip outlined icon="face" label="label" palette="green"/>
      <md2-chip outlined icon="face" label="hide" palette="green" :icon-hide="hide"/>
      <md2-chip
        outlined
        :icon="{icon:'face',iconActive:'home'}"
        :selected="selected"
        label="selected click"
        palette="deep-purple"
        @click="selected=!selected"
      />
      <md2-chip
        outlined
        :icon="{icon:'face',iconActive:'home'}"
        :selected="selected"
        choice
        label="selected click"
        palette="deep-purple"
        @click="selected=!selected"
      />
      <md2-chip
        outlined
        :progress="progress"
        icon="face"
        icon-trailing="home"
        label="progress"
        @click="progress = !progress"
      />
      <md2-chip
        outlined
        :progress="progress"
        :selected="selected"
        choice
        icon="face"
        icon-trailing="home"
        label="progress"
        @click="progress = !progress"
      />
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px;">
      <md2-button
        label="text 1"
        value="value"
        @click="(event, options) => console.log(event, options)"
      />
      <md2-button>slot</md2-button>
      <md2-button label="text/">slot</md2-button>
      <md2-button :label="text" @click="text = text ? undefined : 'text'"/>
      <md2-button label="disabled" disabled/>
      <md2-button label="dragged" dragged/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button
        outlined
        label="text 1"
        value="value"
        @click="(event, options) => console.log(event, options)"
      />
      <md2-button outlined>slot</md2-button>
      <md2-button outlined label="text/">slot</md2-button>
      <md2-button outlined :label="text" @click="text = text ? undefined : 'text'"/>
      <md2-button outlined label="disabled" disabled/>
      <md2-button outlined label="dragged" dragged/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button
        text
        label="text 1"
        value="value"
        @click="(event, options) => console.log(event, options)"
      />
      <md2-button text>slot</md2-button>
      <md2-button text label="text/">slot</md2-button>
      <md2-button text :label="text" @click="text = text ? undefined : 'text'"/>
      <md2-button text label="disabled" disabled/>
      <md2-button text label="dragged" dragged/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button :icon="icon" @click="icon = icon === 'face' ? 'close' : 'face'"/>
      <md2-button :icon="icon" :icon-hide="hide" @click="hide = !hide"/>
      <md2-button :icon="iconToNone" @click="iconToNone = iconToNone?  undefined : 'home'"/>
      <md2-button :icon="iconToNone" icon-trailing="close" :label="iconToNone"/>
      <md2-button :icon-trailing="icon" :icon-turn="turn" @click="turn = !turn"/>
      <md2-button icon="face" label="text"/>
      <md2-button icon-trailing="close" label="text"/>
      <md2-button icon="face" icon-trailing="close" label="text"/>
      <md2-button icon="face" icon-trailing="close"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button
        :icon="image"
        @click="progress = !progress"
      />
      <md2-button :progress="progress" icon="face" icon-trailing="home" label="label"
                  @click="progress = !progress"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-fab
        :icon="image"
        @click="progress = !progress"
      />
      <md2-fab :progress="progress" icon="face" icon-trailing="home" label="label"
               @click="progress = !progress"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button icon="face" icon-trailing="close" label="text" height="sm"/>
      <md2-button icon="face" icon-trailing="close" label="text" height="md"/>
      <md2-button icon="face" icon-trailing="close" label="text" height="lg"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-fab icon="face" icon-trailing="close" label="text" height="sm"/>
      <md2-fab icon="face" icon-trailing="close" label="text" height="md"/>
      <md2-fab icon="face" icon-trailing="close" label="text" height="lg"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="text" height="sm"/>
      <md2-button label="text" height="md"/>
      <md2-button label="text" height="lg"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="text" icon="home"/>
      <md2-button label="text" icon="home" outlined/>
      <md2-button label="text" icon="home" text/>
      <md2-button label="text a" icon="home" tag="a"/>
      <md2-button label="text a" icon="home" outlined tag="a"/>
      <md2-button label="text a" icon="home" text tag="a"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="text" icon="home" palette="deep-orange"/>
      <md2-button label="text" icon="home" palette="deep-orange" outlined/>
      <md2-button label="text" icon="home" palette="deep-orange" text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="selected" icon="home" palette="deep-orange" :selected="selected"
                  @click="selected=!selected"/>
      <md2-button label="selected" icon="home" palette="deep-orange" :selected="selected" outlined/>
      <md2-button label="selected" icon="home" palette="deep-orange" :selected="selected" text/>
      <md2-button label="selected" icon="home" palette="deep-orange"/>
      <md2-button label="selected" icon="home" palette="deep-orange" outlined/>
      <md2-button label="selected" icon="home" palette="deep-orange" text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="selected" :icon="{icon:'home',iconActive:'face'}" :selected="selected"/>
      <md2-button label="selected" icon="home" :selected="selected" outlined/>
      <md2-button label="selected" icon="home" :selected="selected" text/>
      <md2-button label="selected" icon="home"/>
      <md2-button label="selected" icon="home" outlined/>
      <md2-button label="selected" icon="home" text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-fab label="selected" icon="home" palette="deep-orange" :selected="selected"
               @click="selected=!selected"/>
      <md2-fab label="selected" icon="home" palette="deep-orange" :selected="selected" outlined/>
      <md2-fab label="selected" icon="home" palette="deep-orange" :selected="selected" text/>
      <md2-fab label="selected" icon="home" palette="deep-orange"/>
      <md2-fab label="selected" icon="home" palette="deep-orange" outlined/>
      <md2-fab label="selected" icon="home" palette="deep-orange" text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-fab label="selected" :icon="{icon:'home',iconActive:'face'}" :selected="selected"/>
      <md2-fab label="selected" icon="home" :selected="selected" outlined/>
      <md2-fab label="selected" icon="home" :selected="selected" text/>
      <md2-fab label="selected" icon="home"/>
      <md2-fab label="selected" icon="home" outlined/>
      <md2-fab label="selected" icon="home" text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="text" icon="home" palette="brown"/>
      <md2-button label="text" icon="home" palette="brown" outlined/>
      <md2-button label="text" icon="home" palette="brown" text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="text" icon="home" palette="deep-orange" disabled/>
      <md2-button label="text" icon="home" palette="deep-orange" disabled outlined/>
      <md2-button label="text" icon="home" palette="deep-orange" disabled text/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button label="text" icon="home" palette="deep-orange" adaptive="sm"/>
      <md2-button label="text" icon="home" palette="deep-orange" adaptive="md"/>
      <md2-button label="text" icon="home" palette="deep-orange" adaptive="lg"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button icon="home" rounded="sm"/>
      <md2-button icon="home" rounded="md"/>
      <md2-button icon="home" rounded="lg"/>
      <md2-button icon="home" rounded="full"/>
      <md2-button label="sm" icon="home" rounded="sm"/>
      <md2-button label="md" icon="home" rounded="md"/>
      <md2-button label="lg" icon="home" rounded="lg"/>
      <md2-button label="full" icon="home" rounded="full"/>
      <md2-button label="sm" rounded="sm"/>
      <md2-button label="md" rounded="md"/>
      <md2-button label="lg" rounded="lg"/>
      <md2-button label="full" rounded="full"/>
    </div>
    <div style="display: flex; gap: 16px; padding-top: 16px">
      <md2-button text icon="home" rounded="sm"/>
      <md2-button text icon="home" rounded="md"/>
      <md2-button text icon="home" rounded="lg"/>
      <md2-button text icon="home" rounded="full"/>
      <md2-button text label="sm" icon="home" rounded="sm"/>
      <md2-button text label="md" icon="home" rounded="md"/>
      <md2-button text label="lg" icon="home" rounded="lg"/>
      <md2-button text label="full" icon="home" rounded="full"/>
      <md2-button text label="sm" rounded="sm"/>
      <md2-button text label="md" rounded="md"/>
      <md2-button text label="lg" rounded="lg"/>
      <md2-button text label="full" rounded="full"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Md2Button from '../../md2/Button/Md2Button.vue'
import { ImageIcon } from '../../constructors/Image/ImageIcon'
import Md2Chip from '../../md2/Chip/Md2Chip.vue'
import Md3Button from '../../md3/Button/Md3Button.vue'
import Md3Icon from '../../md3/Icon/Md3Icon.vue'
import Md3Progress from '../../md3/Progress/Md3Progress.vue'
import Md3Chip from '../../md3/Chip/Md3Chip.vue'
import { GeoIntl } from '../../classes/GeoIntl'
import { Geo } from '../../classes/Geo'
import { StorageItem } from '../../classes/StorageItem'

// eslint-disable-next-line @typescript-eslint/no-var-requires
ImageIcon.add('test', require('../assets/icons/arrow-left.svg'))

export default defineComponent({
  name: 'HomeView',
  components: {
    Md3Chip,
    Md3Progress,
    Md3Icon,
    Md3Button,
    Md2Chip,
    Md2Button
  },
  setup () {
    Geo.set('ru')
    console.log('Geo.set(\'ru\')')
    console.log('new GeoIntl().number(\'123456.789\').value // ', new GeoIntl().number('123456.789').value)
    console.log('new GeoIntl().currency(\'123456.789 RUB\').value // ', new GeoIntl().currency('123456.789 RUB').value)
    console.log('new GeoIntl().currency(\'123456.789\', \'RUB\').value // ', new GeoIntl().currency('123456.789', 'RUB').value)
    console.log('new GeoIntl().unit(\'123\', \'kilogram\').value // ', new GeoIntl().unit('123', 'kilogram').value)
    console.log('new GeoIntl().date(\'1987-09-21\').value // ', new GeoIntl().date('1987-09-21').value)
    console.log('new GeoIntl().date(\'1987-09-21 20:30:10\').value // ', new GeoIntl().date('1987-09-21 20:30:10').value)
    console.log('new GeoIntl().date(\'1987-09-21 20:30:10\').value // ', new GeoIntl().date('1987-09-21 20:30:10').value)
    console.log('new GeoIntl().relative(\'2023-07-21 20:30:10\').value // ', new GeoIntl().relative('2023-07-21 20:30:10').value)
    console.log('new GeoIntl().relative(\'2023-06-15 20:30:10\').value // ', new GeoIntl().relative('2023-06-15 20:30:10').value)
    console.log('new GeoIntl().relative(\'2013-06-15\').value // ', new GeoIntl().relative('2013-06-15').value)

    Geo.set('ko')
    console.log('Geo.set(\'ko\')')
    console.log('new GeoIntl().number(\'123456.789\').value // ', new GeoIntl().number('123456.789').value)
    console.log('new GeoIntl().currency(\'123456.789 RUB\').value // ', new GeoIntl().currency('123456.789 RUB').value)
    console.log('new GeoIntl().currency(\'123456.789\', \'RUB\').value // ', new GeoIntl().currency('123456.789', 'RUB').value)
    console.log('new GeoIntl().unit(\'123\', \'kilogram\').value // ', new GeoIntl().unit('123', 'kilogram').value)
    console.log('new GeoIntl().date(\'1987-09-21\').value // ', new GeoIntl().date('1987-09-21').value)
    console.log('new GeoIntl().date(\'1987-09-21 20:30:10\').value // ', new GeoIntl().date('1987-09-21 20:30:10').value)
    console.log('new GeoIntl().date(\'1987-09-21 20:30:10\').value // ', new GeoIntl().date('1987-09-21 20:30:10').value)
    console.log('new GeoIntl().relative(\'2023-07-21 20:30:10\').value // ', new GeoIntl().relative('2023-07-21 20:30:10').value)
    console.log('new GeoIntl().relative(\'2023-06-15 20:30:10\').value // ', new GeoIntl().relative('2023-06-15 20:30:10').value)
    console.log('new GeoIntl().relative(\'2013-06-15\').value // ', new GeoIntl().relative('2013-06-15').value)

    const value = ref()
    const storage = new StorageItem('test', value)

    value.value = 'hello'
    storage.get().value // hello и в localStorage значение будет равно hello
    console.log('storage.get().value', storage.get().value)

    return {
      image: {
        icon: {
          value: 'https://drscdn.500px.org/photo/1071900499/q%3D80_m%3D2000/v2?sig=b42037ebdec07ea7c5c0a0e8ea7422b942f25b10806885ba31b1c9e2a449d964',
          size: 'cover'
        }
      },
      text: ref<string | undefined>('text'),
      icon: ref<string | undefined>('face'),
      iconToNone: ref<string | undefined>('home'),
      hide: ref<boolean>(false),
      turn: ref<boolean>(false),
      selected: ref<boolean>(false),
      dragged: ref<boolean>(false),
      progress: ref<boolean>(false),
      readonly: ref<boolean>(false),
      disabled: ref<boolean>(false),

      iconTurn: ref<boolean>(false),
      iconHide: ref<boolean>(false)
    }
  }
})
</script>

<style lang="scss">
@import "styles/properties";

.is-test {
  position: fixed;
  display: none;
  top: 64px;
  @include left(64px);

  width: 128px;
  height: 128px;

  background-color: red;
}
</style>
