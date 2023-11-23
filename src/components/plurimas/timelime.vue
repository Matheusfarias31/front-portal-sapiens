<template>
    <div>
        <v-dialog v-model="dialog" max-width="600" :style="{ 'z-index': zIndex }">
            <v-card class="mx-auto" width="600" color="deep-purple lighten-5" dark>
                <v-toolbar color="deep-purple lighten-2" dark><v-icon dark right>mdi-folder-information-outline</v-icon>
                    <v-divider class="mx-4" inset vertical></v-divider><v-toolbar-title>TESTE</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import dayjs from "dayjs";

export default {
    name: 'timeline',
    props: {
        show: Boolean,
        items: Array
    },
    data: () => ({
        itemsTimeline: this.items,
        zIndex: 9999
    }),
    computed: {
        dialog: {
            get() {
                return this.$props["show"];
            },
            set(value) {
                this.$emit("update:show", value);
            },
        },
    },
    watch: {
        show(newValue) {
            this.dialog = newValue;
        },
        items(newValue) {
            this.itemsTimeline = newValue;
        }
    },
    methods: {
        convertData(item) {
            if (dayjs(item).format("YYYY-MM-DD") != "Invalid Date") {
                return dayjs(item.replace("T", " ").replace("Z", "")).format(
                    "DD/MM/YYYY"
                );
            }
        }
    }
}

</script>

