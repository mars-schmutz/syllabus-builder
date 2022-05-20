import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        pageLayout: [],
        id: -1,
    }),

    actions: {
        // Delete item with key id from layout
        deleteItem(id) {
            console.log(`Deleting item with id ${id}`)
            this.pageLayout = this.pageLayout.filter(item => item.id !== id)
        },

        // Large Header with Text
        addLargeHeaderText(header, text) {
            this.pageLayout.push({
                type: "LargeHeaderText",
                id: ++this.id,
                details: {
                    header: header,
                    text: text,
                }
            })
        },

        updateLargeHeaderText(id, header, text) {
            let index = this.pageLayout.findIndex(item => item.id === id)
            this.pageLayout[index].details.header = header;
            this.pageLayout[index].details.text = text;
        },

        // Large Header
        addLargeHeader(header) {
            this.pageLayout.push({
                type: "LargeHeader",
                id: ++this.id,
                details: {
                    header: header,
                }
            })
        },

        updateLargeHeader(id, header) {
            let index = this.pageLayout.findIndex(item => item.id === id)
            this.pageLayout[index].details.header = header;
        },

        // Solo Paragraph
        addPlainParagraph(text) {
            this.pageLayout.push({
                type: "PlainParagraph",
                id: ++this.id,
                details: {
                    text: text,
                }
            })
        },

        updatePlainParagraph(id, text) {
            let index = this.pageLayout.findIndex(item => item.id === id)
            this.pageLayout[index].details.text = text;
        }
    }
})