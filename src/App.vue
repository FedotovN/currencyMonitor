<template >
<div class="body" @keyup = "openDialog">
  <div class="content"> 
    <div class="header">
      <MyButton class='btn' @click="showDialog = true">New tiker (N)</MyButton>
    </div>
    <ToastNotifications ref="notif" :message="notificationMessage" :status="status"/>
    <DialogWindow v-if="showDialog" @closeDialog="showDialog = false">
      <SearchForm class="main_form" @found="setItem"/>
    </DialogWindow>
    <ItemList :items="items" @removeItem="removeItem"/>
  </div>
</div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue'
import ItemList from '@/components/ItemList.vue'
import ToastNotifications from './components/UI/ToastNotifications.vue'
export default {
  name: 'App',
  data(){
    return {
      name: "",
      timestamp: "",
      currency: "",
      items: [],
      notificationMessage: '',
      status: "info",
      showDialog: false
    }
  },
  components : {
    SearchForm,
    ItemList,
    ToastNotifications
},
  created() {
        document.addEventListener('keydown', (e)=>{
          if(e.key.toLowerCase() ==='n'){this.showDialog = true}
        })
        this.items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [] 
  },
  methods: {
    setItem(currencyName){
      let newItem = {
        name: currencyName,
        timestamp: Date.now(),
        currency: '-'
      }
      let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${newItem.name.toUpperCase()}&tsyms=USD`
      fetch(url)
      .then(response => response.json())
      .then(response => {
          if(response.Response === 'Error'){
            this.pushNotification(`Can't find a ${currencyName.toUpperCase()} item`, 'error')
            return
          }
          else{
            for(let i = 0; i < this.items.length; i++){
              if(this.items[i].name.toLowerCase() === currencyName.toLowerCase() ){
                this.pushNotification(`There's already a ${currencyName.toUpperCase()} item`, 'warning')
                  return
              }
            }
            this.items.push(newItem)
            localStorage.setItem('items', JSON.stringify(this.items))
          }
      })
      this.showDialog = false
    },
    removeItem(item){
      this.items = this.items.filter(el => el != item)
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    pushNotification(message, status){
      this.notificationMessage = message
          this.status = status
          this.$refs.notif.pushToast({
            message: this.notificationMessage,
            status: this.status
          })
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

*{
  margin: 0;
  padding: 0;
}
:root{
    --dark: #132028;
    --brighter: #365e70;
    --white: #f3f3f3;
    --green: #418d47;
    --red: #e13b3b;
    --yellow: #fb8520;
}
.body{
  background-color: var(--dark);
  color: var(--dark);
  height: 100vh;
  width: 100%;
}
.content{
  font-family: 'Poppins', sans-serif;
  max-width: 660px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 50px;
}
.header{
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header .btn{
  background-color: var(--white);
  font-size: 20px;
  width: 202.5px;
  color: var(--dark);
}
.main_form{
  margin-top: 20px;
}
</style>
