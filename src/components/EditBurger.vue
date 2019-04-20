<template>
  <div v-if="burger" class="edit-burger container">
    <h2>Edit {{ burger.title }} Burger</h2>
    <form @submit.prevent="editBurger">
      <div class="field title">
        <label for="title">Burger Title:</label>
        <input type="text" name="title" v-model="burger.title">
      </div>
      <div v-for="(ing, index) in burger.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="burger.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Burger</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditBurger',
  data () {
    return {
      burger: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    editBurger(){
      if(this.burger.title) {
        this.feedback = null
        
        // create a slug (eg: if title = Big Mac => slug = big-mac)
        this.burger.slug = slugify(this.burger.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })

        db.collection('burgers').doc(this.burger.id).update({
          title: this.burger.title,
          ingredients: this.burger.ingredients,
          slug: this.burger.slug,
        }).then(()=>{
          this.$router.push({ name: 'Index' })
        }).catch(e => console.log(e))
      } else {
        this.feedback = 'You must enter a burger title'
      }
    },
    addIng(){
      if(this.another){
        this.burger.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing) {
      this.burger.ingredients = this.burger.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  },
  created() {
    let ref = db.collection('burgers').where('slug', '==', this.$route.params.burger_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.burger = doc.data()
        this.burger.id = doc.id
      })
    })
  }
}
</script>

<style>
.edit-burger{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-burger h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-burger .field{
  margin: 20px auto;
  position: relative;
}
.edit-burger .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
