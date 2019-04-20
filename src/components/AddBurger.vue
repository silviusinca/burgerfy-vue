<template>
  <div class="add-burger container">
    <h2 class="center-align indigo-text">Add A New Burger Recipe</h2>
    <form @submit.prevent="addBurger">
      <div class="field title">
        <label for="title">Burger Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Burger</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddBurger',
  data () {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addBurger(){
      if(this.title) {
        this.feedback = null
        
        // create a slug (eg: if title = Big Mac => slug = big-mac)
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })

        db.collection('burgers').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug,
        }).then(()=>{
          this.$router.push({ name: 'Index' })
        }).catch(e => console.log(e))
      } else {
        this.feedback = 'You must enter a burger title'
      }
    },
    addIng(){
      if(this.another){
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-burger{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-burger h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-burger .field{
  margin: 20px auto;
  position: relative;
}
.add-burger .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

</style>
