<template>
    <div id="divSection8" class="marginTop25">
        <div style="width:100%;">
            <div class="fontBold text-center borderStd fontSize22 padding5">{{ sectionHeaders[7] }}</div>
        </div>
        <div class="marginTop10">
            <span class="printNo mandatory frmVarDdl" data-frm-var="frmEligBasis"></span>
            <div v-for="eb in eligBases" class="divEligBasis displayNone">
                <div :class="['frmArea', 'marginTop10']" :data-frm-area="eb.name" v-html="eb.value"></div>
                <span @click="editFrmArea" class="colorGray cursorPointer frmAreaEdit printNo">[Edit Section]</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'

    export default {
        components: {
           
        },
        computed: {
            ...mapState(['nextSteps', 'sectionHeaders', 'formAreas']),
            eligBases: function () {
                return this.formAreas.filter(function (e) {
                    return e.name.substr(6, 7) === 'EligBas';
                })
            }
        },
        methods: {
        },
        mounted() {

        },
        props: ['editFrmArea', 'toggleExclude']
    }
</script>
<style>

</style>