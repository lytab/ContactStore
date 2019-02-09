<template>
    <div>
        <h1>Contacts :</h1>
        <form @submit.prevent="edit ? update(contact.id):create()">
            <div class="form-group">
                <label for="name">Contact Name :</label>
                <input type="text" class="form-control" id="name" v-model="contact.name"
                    placeholder="Enter Contact  Name" name="name">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address :</label>
                <input type="email" v-model="contact.email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number :</label>
                <input type="text" class="form-control" v-model="contact.phone"  id="phone" name="phone" placeholder="Phone Number">
            </div>
           
            <button v-show="!edit" type="submit" class="btn btn-success">create Contact</button>
            <button v-show="edit" type="submit" class="btn btn-success">Edit Contact</button>
        </form>
        <div v-for="cont in contacts"> {{cont}}</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                contact:{
                    id:'',
                    name:'',
                    email:'',
                    phone:'',
                },
                edit:false,
                contacts:[],
            }
        },
        mounted() {
            this.getContacts();
        },
        methods: {
            getContacts(){
                let self=this;
                axios.get('/api/contact').then(response=>{
                    self.contacts=response.data;
                }).catch(error=>{
                    alert('Erreur dans le chargement des données');
                });
                       },
            create(){
                let self=this;
                let params=Object.assign({},self.contact);
                axios.post('/api/contact/store',params).then(()=>{
                    
                    self.contact.name='';
                    self.contact.email='';
                    self.contact.phone='';
                    self.edit=false;
                    self.getContacts();
                }).catch(()=>{
                    alert('Erreur dans la creation du contact');
                });
            },
            update(id){
                let self=this;
                axios.patch('/api/contact/'+id).then(response=>{
                    self.contacts=response.data;
                }).catch(error=>{
                    alert('Erreur dans la modification du contact');
                });
            }
        },

    }
</script>