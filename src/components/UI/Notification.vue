<template>
<div v-bind:class="'toast '+status+(this.removing?' removing':'')">
    <div class="column">
        <i v-bind:class="icon" ></i>
        <span>{{ this.text }}</span>
    </div>
        <i class="fa-solid fa-xmark" @click="removeToast"></i>
    </div>
</template>

<script>
export default{
    name: "Notification",
    data(){
        return{
            removing: false
        }
    },
    props: {
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        timestamp: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    created(){
        setTimeout(() => {
            this.removing = true
            setTimeout(() => {
            this.removeToast()}
            
            , 1000)
            
        }, 5000);
    },
    methods: {
        removeToast(){
            this.$emit("removeToast", this.timestamp)
        }
    }
}
</script>
<style>
.toast{
    position: relative;
    font-size: 18px;
    letter-spacing: 1.05px;
    color: var(--dark);
    display: block;
    padding: 15px 25px;
    background-color: var(--white);
    border-radius: 4px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    overflow: hidden;
    animation: popup ease-out .6s;
}
.toast::before{
    content: '';
    position: absolute;
    width: 50%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #e13b3b;
    animation: progress 5s linear forwards;
}
.toast.removing{
    animation: remove ease-out 1s forwards;
}
.toast .column{
    display: flex;
    gap: 25px;
}
.toast span{
    text-align: start;
}
.toast i:last-child{
    color: var(--dark);
    cursor: pointer;
    transition: .2s;
}
.toast i:first-child{
    transform: scale(1.5);
}
.toast i:last-child:hover{
    color: var(--brighter);
}

.toast.success{
    color: var(--green);
}
.toast.warning{
    color: var(--yellow);
}
.toast.error{
    color: var(--red);
}
.toast.info{
    color: var(--brighter);
}

.toast.success::before{
    background-color: var(--green);
}
.toast.warning::before{
    background-color: var(--yellow);
}
.toast.error::before{
    background-color: var(--red);
}
.toast.info::before{
    background-color: var(--brighter);
}
@keyframes progress{
    0%{
        width: 100%;
    }
    100%{
        width: 0%;
    }
}

@keyframes popup{
    0%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0%);
    }
}
@keyframes remove{
    0%{
        transform: translateX(0%);
    }
    100%{
        transform: translateX(calc(100% + 25px));
    }
}
</style>