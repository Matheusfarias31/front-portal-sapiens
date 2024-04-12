<template>
    <div class="text-center">
        <v-overlay z-index="6" :value="dialog" persistent color="grey lighten-5">
            <v-row justify="center">
                <v-col cols="12" sm="6">
                    <div>
                        <v-img lazy-src="../../assets/ExtratorLoading.png" max-height="80" max-width="80"
                            src="../../assets/ExtratorLoading.png"></v-img>
                        <v-progress-linear indeterminate color="deep-purple lighten-2" height="4"
                            class="mt-2"></v-progress-linear>
                    </div>
                </v-col>
            </v-row>
        </v-overlay>
    </div>
</template>

<script>
export default {
    name: "carregamento-extrator",
    data: () => ({
        dialog: false,
    }),
};
</script>