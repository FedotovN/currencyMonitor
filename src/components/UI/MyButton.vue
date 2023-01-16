<template>
<button @click="findName"><slot></slot></button>
</template>
<script>
export default{
    name: "MyButton",
}
</script>
<style>
button{
    height: 60px;
    width: 180px;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid grey;
    font-size: 20px;
    transition: .3s;
    outline: none;
    cursor: pointer;
}
button:hover{
    letter-spacing: 1.1px;
    filter: opacity(.7);;
}
</style>