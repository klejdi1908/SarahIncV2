<template>
    <div id="app">
        <!-- Navigation Bar -->
        <nav class="navbar printNo fixed-top bgColorOffWhite navbar-expand-lg">
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#responsiveMenu" aria-controls="responsiveMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <fai :icon="['fas', 'bars']" class="colorBlue" style="font-size:30px;"></fai>
                    </span>
                </button>
                <div class="collapse navbar-collapse text-center" id="responsiveMenu">
                    <ul class="navbar-nav">
                        <li class="nav-item" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="font-size:14px;padding-top:14px;" href="/Admin/Index">Admin</a>
                        </li>
                        <li class="nav-item" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="font-size:14px;padding-top:14px;" href="/Home/Logout">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <grid-users></grid-users>
        <grid-forms></grid-forms>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'
    import gridUsers from './gridUsers.vue'
    import gridForms from './gridForms.vue'

    export default {
        components: {
            gridUsers,
            gridForms
        },
        methods: {
        }
    }
</script>
<style>

</style>