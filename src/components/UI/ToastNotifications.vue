<template>
    <ul 
    class="notifications"
    id="notifications"
    >
    <Notification
        v-for="(item, ind) in items"
        v-bind:key="ind"
        :icon="item.icon"
        :text="item.message"
        :timestamp="item.timestamp"
        :status="item.status"
        @removeToast = "removeToast"
        >
        {{ item.message }}
    </Notification>
    </ul>
</template>
<script>
import Notification from './Notification.vue';

export default{
    name: "ToatsNotifications",
    data() {
        return {
            toastIcons: {
                success: "fa-solid fa-circle-check",
                warning: "fa-solid fa-triangle-exclamation",
                error: "fa-solid fa-circle-xmark",
                info: "fa-solid fa-circle-info"
            },
            items: []
        };
    },
    props: {
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: false
        }
    },
    components: { Notification },
    methods: {
        removeToast(timestamp){
            this.items = this.items.filter(el => el.timestamp !== timestamp)
        },
        pushToast(item){
            if(this.items.length >5){
                this.items.shift()
            }
            this.items.push({message: item.message, icon: this.toastIcons[item.status], timestamp: Date.now() * Math.random(), status: item.status})
        }
    }
}
</script>
<style scoped>
    .notifications{
        z-index: 11;
        position: fixed;
        top: 20px;
        right: 20px;
        list-style-type: none;
        overflow: hidden;
        display: flex;
        flex-flow: column nowrap;
        gap: 20px;
    }
</style>
