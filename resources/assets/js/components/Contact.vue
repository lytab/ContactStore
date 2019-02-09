<template>
    <div>
        <h1>Add Contact</h1>
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
        <h1>Contacts</h1>
        <ul class="list-group">

            <li v-for="cnt in contacts" class="list-group-item">
              <strong>{{cnt.name}}</strong> |  {{cnt.email}} | {{cnt.phone}}
              <button class="btn btn-warning btn-xs" @click="showContact(cnt.id)">Edit</button>
              <button class="btn btn-danger btn-xs" @click="deleteContact(cnt.id)">Delete</button>
             </li>
        </ul>
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
                console.log(id);
                
                let self=this;
                let params=Object.assign({},self.contact);

                axios.patch('api/contact/'+id,params).then(()=>{
                    self.getContacts();
                }).catch(error=>{
                    alert('Erreur dans la modification du contact');
                });
            },
            showContact(id){
                let self=this;

                axios.get('/api/contact/'+id).then(function(response){
                    self.contact.id=response.data['id'];
                    self.contact.name=response.data['name'];
                    self.contact.email=response.data['email'];
                    self.contact.phone=response.data['phone'];
                    self.edit=true;
                }).catch(error=>{
                    alert('Erreur dans la modification du contact');
                });
            },
            deleteContact(id){
                let self=this;

                axios.delete('/api/contact/'+id).then(function(response){
                   alert('Contact Deleted !');
                   self.getContacts();
                }).catch(error=>{
                    alert('Erreur dans la modification du contact');
                });
            }
        },

    }
</script>