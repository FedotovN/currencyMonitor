<template>
    <div class="search-tiker">
    <div class="input-field">
        <label for="tickerInput">Tiker search</label>
        <input
        v-model="name"
        type="text"
        id="tickerInput"
        @keyup.enter="findName"
        autocomplete="off"
        >
    </div>
    <div v-if="name" class="search-btn">
        <button @click="findName">Find</button>
    </div>
    </div>
</template>
<script>
export default{
    name: "SearchForm",
    data(){
        return {
            name: ""
        }
    },
    methods: {
        findName(){
            this.$emit('found', this.name)
        }
    }
}
</script>
<style scoped>
.search-tiker{
    width: 500px;
    background-color: var(--white);
    display: flex;
    flex-flow: column nowrap;
    gap: 30px;
    justify-content: center;
    border-radius: 4px;
}
label{
    font-size: 20px;
    transition: .3s;
}
.input-field{
    display: flex;
    flex-flow: column nowrap;
    gap: 30px;
}
.input-field input{
    height: 40px;
    border: 1px solid var(--dark);
    background-color: var(--white);
    border-radius: 8px;
    font-size: 20px;
    outline: none;
    text-align: center;
}
.input-field:hover label{
    letter-spacing: 1.2px;
}
</style>