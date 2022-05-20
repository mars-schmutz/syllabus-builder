<template>
    <div id="settings">
        <h1>Settings</h1>
        <div>
            <label>Page numbers</label>
            <input type="checkbox" v-model="usePageNumbers">
        </div>
    </div>
</template>

<script>
import { usePrefsStore } from "@/store/prefs";
import { storeToRefs } from "pinia";

export default {
    name: 'DocsPrefs',

    setup() {
        const store = usePrefsStore();
        const { usePageNumbers } = storeToRefs(store);

        return {
            store,
            usePageNumbers,
        }
    }
}
</script>