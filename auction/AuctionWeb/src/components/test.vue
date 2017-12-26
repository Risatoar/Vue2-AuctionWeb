<template>
   <div id="aaapp">
     <vue-editor v-model="content"></vue-editor>
     {{ content }}
   </div>
 </template>

 <script>
   import { VueEditor } from 'vue2-editor'

   export default {

   components: {
      VueEditor
   },

   data() {
       return {
         content: '<h1>Some initial content</h1>'  
       }
     }
   }
 </script>