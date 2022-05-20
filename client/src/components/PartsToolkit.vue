<template>
    <div id="toolkit">
        <h1>Modules</h1>
        <div id="parts">
            <button @click="addLargeHeaderText">Add text w/large header</button>
            <button @click="addLargeHeader">Add large header</button>
            <button @click="addPlainParagraph">Add plain paragraph</button>
        </div>
        <DocsPrefs></DocsPrefs>
    </div>
</template>

<script>
import { useLayoutStore } from '@/store/layout';
import DocsPrefs from './DocPrefs.vue';

export default {
    name: "PartsToolkit",

    components: {
        DocsPrefs,
    },

    setup() {
        const store = useLayoutStore();

        function addLargeHeaderText() {
            store.addLargeHeaderText("", "");
        }

        function addLargeHeader() {
            store.addLargeHeader("");
        }

        function addPlainParagraph() {
            store.addPlainParagraph("");
        }

        return { store, addLargeHeaderText, addLargeHeader, addPlainParagraph };
    },
}
</script>