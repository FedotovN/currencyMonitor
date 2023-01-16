<template>
    <div class="item-ticker">
        <p>{{ item.name.toUpperCase() }} - USD</p>
        <h2>{{ this.currency }}</h2>
        <MyButton class='item-btn' @click="removeItem">
            <i class="fa-solid fa-trash"></i>
            Delete
        </MyButton>
    </div>
</template>
<script>
export default{
    name: "ListItem",
    data(){
        return {
            currency: "-"
        }
    },
    created(){
        setInterval(() => {
            this.fetchApi()
        }, 5000);
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        removeItem(){
            this.$emit("removeItem", this.item)
        },
        fetchApi(){
            let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.item.name.toUpperCase()}&tsyms=USD`
            fetch(url)
            .then(response => response.json())
            .then(response => {
                let price = response[this.item.name.toUpperCase()].USD
                this.currency = price < 1 ? price.toPrecision(2) : price
            })
        }
    }
}
</script>
<style>
    a{
        color: black;
        text-decoration: none;
    }
    .item-ticker{
        cursor: pointer;
        text-align: center;
        height: 200px;
        width: 200px;
        background-color: var(--white);
        color: var(--dark);
        border-radius: 8px;
        border: 1px solid var(--white);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        gap: 20px;
        transition: .3s;
    }
    .item-ticker:hover{
        border: 1px solid var(--dark);
    }
    .item-btn{
        font-size: 16px;
        width: 150px;
        height: 40px;
    }
</style>