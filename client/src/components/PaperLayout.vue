<template>
    <div class="paper">
        <!-- @end="this.$emit('updatedLayout', layout)" -->
        <img alt="program logo" :src="require(`@/assets/${programLogo}`)" />
        <div class="top-strip"></div>
        <draggable
        handle=".handle"
        v-model="layout"
        item-key="id">
            <template #item="{element}">
                <component
                    :is="element.type"
                    :deleteItem="deleteItem"
                    :details="element.details"
                    :id="element.id"
                    :key="element.id">
                </component>
            </template>
        </draggable>
        <div class="bottom-strip"></div>
        <span class="numbers" v-if="prefs.usePageNumbers">#</span>
    </div>
</template>

<script>
import draggable from "vuedraggable"

import { useLayoutStore } from '@/store/layout';
import { usePrefsStore } from "@/store/prefs";
// import { storeToRefs } from 'pinia';

// use events to emit when pageLayout changes
// https://stackoverflow.com/questions/67968062/relationship-between-props-and-data-vue

import LargeHeaderText from './parts/LargeHeaderText.vue';
import LargeHeader from './parts/LargeHeader.vue';
import PlainParagraph from './parts/PlainParagraph.vue';

export default {
    name: "PaperLayout",
    emits: ['updatedLayout'],

    props: {
        pageLayout: Array,
        programLogo: String,
    },

    computed: {
        layout: {
            get() {
                return this.pageLayout;
            },
            set(newLayout) {
                this.$emit('updatedLayout', newLayout);
            }
        }
    },

    components: {
        draggable,
        LargeHeaderText,
        LargeHeader,
        PlainParagraph
    },

    setup() {
        const store = useLayoutStore();
        const prefs = usePrefsStore();

        return { 
            prefs,
            deleteItem: store.deleteItem,
        };
    },
}
</script>

<style>
    .paper {
        width: 50vw;
        height: 70vw;
        border: 1px solid black;
        margin: 0 auto;
        overflow: hidden;
        grid-area: paper;
        position: relative;
    }

    img {
        display: block;
        margin: 0 auto;
        margin-top: 2rem;
        width: 50%;
    }
</style>