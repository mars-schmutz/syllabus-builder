<template>
    <h1>Modules</h1>
    <button @click="addLargeHeaderText">Add text w/large header</button>
    <button @click="addLargeHeader">Add large header</button>
    <button @click="addPlainParagraph">Add plain paragraph</button>
</template>

<script>
import { useLayoutStore } from '@/store/layout';

export default {
    name: "PartsToolkit",

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