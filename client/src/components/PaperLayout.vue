<template>
    <h1>Preview</h1>
    <div class="paper">
        <draggable
        handle=".handle"
        v-model="pageLayout"
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
    </div>
</template>

<script>
import draggable from "vuedraggable"

import { useLayoutStore } from '@/store/layout';
import { storeToRefs } from 'pinia';

import LargeHeaderText from './parts/LargeHeaderText.vue';
import LargeHeader from './parts/LargeHeader.vue';
import PlainParagraph from './parts/PlainParagraph.vue';

export default {
    name: "PaperLayout",

    components: {
        draggable,
        LargeHeaderText,
        LargeHeader,
        PlainParagraph
    },

    setup() {
        const store = useLayoutStore();
        const { pageLayout } = storeToRefs(store);
        return { pageLayout, store, deleteItem: store.deleteItem };
    }
}
</script>

<style scoped>
.paper {
    width: 70vw;
    height: 90vh;
    border: 1px solid black;
    margin: 0 auto;
    overflow: hidden;
}
</style>