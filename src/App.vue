<template>
    <div class="container">

        <div class="title has-text-centered mb-5">
           MY TODO list
        </div>
<form @submit.prevent = "addtodo">
    <div class="field is-grouped">
            <p class="control is-expanded">
                <input v-model="newtodocontent" type="text" class="input" placeholder="Men ishlayapman...">
            </p>
            <p class="control">
                <button
                :disabled="!newtodocontent"
                 class="button is-info">Qo'shish </button>
            </p>
        </div>
</form>


        




        <div v-for="todo in todos" class="card mb-5"
        :class="{ 'has-background-success-light':todo.done }">
            <div class="card-content">
                <div class="content">
                    <div class="columns is-vcentered is-mobile">
                        <div class="column"
                        :class="{'has-text-success line-through':todo.done}">{{todo.content}}</div>
                        <div class="column is-5 has-text-right">


                            <button 
                            @click = "toggledone(todo.id)"
                            :class="todo.done ? 'is-success' : 'is-light'"
                            class="button ml-2">
                                <span v-if="todo.done">Bajarildi</span>
                                <span v-else>Bajarilmadi</span>

                            </button>


                            <button
                            @click="deletetodo(todo.id)"
                            class="mt-2 button is-danger">
                                O'chirish
                            </button>

                        </div>
                    </div>


                </div>
            </div>
        </div>


    </div>
</template>
<script setup>
import { ref, onMounted} from 'vue';
import {db} from "../firebase/index.js";

import { collection,query, orderBy, limit,  updateDoc, getDocs,doc, onSnapshot,deleteDoc, setDoc,addDoc } from "firebase/firestore";



// limit


const todoscollect = query(collection(db, "todos"), orderBy("date", "desc"), limit(5));
console.log(todoscollect)
//order



const todos = ref([



   
]);

onMounted( async ()=>{


onSnapshot(todoscollect, (querySnapshot) => {
    let fbtodos = []
  querySnapshot.forEach((doc) => {
      const todo = {
    id : doc.id,
    content: doc.data().content,
    done : doc.data().done
};
 fbtodos.push(todo);


  });
  todos.value = fbtodos;
  
});

})



let newtodocontent = ref('');


const addtodo = async ()=>{


        const newtodo = {
            content:newtodocontent.value,
            done:false,
            date:Date.now()
        }
        todos.value.unshift(newtodo);
        newtodocontent = ref('');
       // await setDoc(doc(db, "todos", ""), newtodo); Yoki pastdagi ham bo'ladi, lekin 135 qatordagi qulayroq!
       const docRef = await addDoc(collection(db, "todos"),newtodo);

    }

const deletetodo = async id=>{
 
// todos.value = todos.value.filter(
//     todo =>{
//      return   todo.id !== id;
//     }
// );
await deleteDoc(doc(collection(db, "todos"), id));

// console.log(todos.value);
}    


const toggledone = async (id)=>{
const index = todos.value.findIndex(todo=>{
  return  todo.id === id;



  
});
//todos.value [index].done = !todos.value [index].done;


const washingtonRef = doc(collection(db, "todos"), id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  done : !todos.value [index].done
});
}
</script>
<style>
@import "node_modules\bulma\css\bulma.min.css";

.container {
    max-width: 600px!important;
    padding: 20px;
    margin: 0 auto;
}
.line-through{
    text-decoration: line-through;
}
</style>