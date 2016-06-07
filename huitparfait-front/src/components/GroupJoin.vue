<script type="text/babel">

    import * as WebApi from '../WebApi'

    export default {
        route: {
            canActivate({ to: { params: { groupId } }, abort, redirect }) {
                return WebApi.joinGroup(groupId).then(() => {
                    redirect({ name: 'predictions' })
                })
            },
        },
    }

</script>