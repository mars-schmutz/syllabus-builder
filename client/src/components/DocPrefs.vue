<template>
    <div id="settings">
        <h1>Settings</h1>
        <div>
            <label>Page numbers</label>
            <input type="checkbox" v-model="usePageNumbers">
        </div>
        <button @click="downloadPdf">Download PDF</button>
    </div>
</template>

<script>
import { usePrefsStore } from "@/store/prefs";
import { useLayoutStore } from "@/store/layout";
import { storeToRefs } from "pinia";

export default {
    name: 'DocsPrefs',

    setup() {
        const store = usePrefsStore();
        const layout = useLayoutStore();
        const { usePageNumbers } = storeToRefs(store);

        function serializeLayout() {
            const json = JSON.stringify(layout.pageLayout);
            return json;
        }

        return {
            store,
            layout,
            usePageNumbers,
            serializeLayout
        }
    },

    methods: {
        downloadPdf() {
            // var data = "name=" + encodeURIComponent("mersh");
            // create object with layout and prefs to serialize for request body
            var data = this.serializeLayout();

            fetch("http://localhost:3000/download", {
                method: "POST",
                body: data,
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                return response.blob()
            }).then(function(blob) {
                const url = window.URL.createObjectURL(blob);
                window.open(url);
                // StackOverflow said to revoke url otherwise it points to same Blob, but apparently it still updates pdf blob when commented out
                // window.URL.revokeObjectURL(url);
            })
        },
    }
}
</script>
