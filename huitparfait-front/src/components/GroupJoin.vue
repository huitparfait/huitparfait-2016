<script type="text/babel">

    import * as WebApi from '../WebApi'

    export default {
        route: {
            canActivate({ to: { params: { groupId } }, redirect }) {
                return WebApi.joinGroup(groupId).then(() => {
                    redirect({ name: 'predictions' })
                })
            },
        },
    }

</script>
