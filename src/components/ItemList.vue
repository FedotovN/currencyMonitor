<template>
    <div v-if="items.length>0" class="list-container">
        <div class="item-list"
            v-for="(i,ind) in items"
            v-bind:key="ind"
            >
                <ListItem
                 :item="i"
                 @removeItem = "removeItem"
                 />
        </div>
    </div>
    <div v-else class="handler">
        <h2 style="color:var(--white)">No tickers yet! :(</h2>
    </div>
</template>
<script>
import ListItem from '@/components/ListItem.vue'
    export default{
        name: "ItemList",
        components: {
            ListItem
        },
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        methods: {
            removeItem(item){
                this.$emit("removeItem", item)
            }
        }
    }
</script>
<style>
.list-container{
    max-height: 500px;
    overflow-y: scroll;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}
.list-container::-webkit-scrollbar{
    width: 0;
}
</style>