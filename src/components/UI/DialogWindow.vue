<template>
<div class="dialog-window" @click="closeDialog">
    <div class="dialog-content" @click.stop @keyup.enter="closeDialog">
        <slot></slot>
    </div>
</div>
</template>
<script>
export default{
    name: "DialogWindow",
    methods: {
        closeDialog(){
            this.$emit('closeDialog')
        }
    }
}
</script>
<style scoped>
.dialog-window{
    position: fixed;
    z-index: 10;
    background-color: rgb(0,0,0, 0.7);
    top:0;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dialog-content{
    background-color: var(--white);
    padding: 30px;
    border-radius: 8px;
    min-width: 300px;
    min-height: 200px;
}
</style>