<template>
  <div class="bg-gray-50 min-w-screen min-h-screen flex justify-center items-center">
    <div class="max-w-xs relative space-y-3 mb-3">
      <label
        for="search"
        class="form-label"
      >
        Type product name
      </label>

      <input
        type="text"
        id="search"
        v-model="searchTerm"
        placeholder="Type here..."
        autocomplete="off"
        class="_p-3 mb-0.5 w-full border rounded form-control"
      >

      <ul
        v-if="searchOptions.length && showOptions===true"
        class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li class="w-100 mt-12 _px-1 _pt-1 _pb-2 font-bold border-b border-gray-200" v-if="showOptions===true">
          <b>{{ searchOptions.length }}</b> / {{ options.length }} results
        </li>
        <li aclass="w-100"
            v-for="option in searchOptions"
            :key="option.name"
            @click="selectOption(option.name)"
            class="w-100 cursor-pointer hover:bg-gray-100 p-1"
        >
          {{ option.name }}
        </li>
      </ul>

    </div>
  </div>
</template>



<style scoped>
ul{
  list-style-type: none;
}
.cursor-pointer {
  cursor: pointer;
}
</style>



<script>



import {ref, computed} from 'vue'
export default {
  name: 'Autocomplete',
  props: ['nameOptions', 'selected'],
  watch: {
    selected: {
      handler(newValue, oldValue) {
        if (newValue.value!=oldValue.value){
          this.selectOption( newValue.value );
        }
      },
      deep: false
    }   
  },
  setup(props,  context) {  

    let options = props.nameOptions;
    let showOptions = true;
    let searchTerm = ref('');
    options = computed(() => {  
       return props.nameOptions;
    });

    const searchOptions = computed(() => {     

       options = props.nameOptions;

      if (searchTerm.value == selectedOption.value){
        return []
      }    
      if (searchTerm.value === '') { 
        selectedOption.value = '';
        selectOption();
        return []
      }
      let matches = 0;
      return options.filter(option => {
        if (option.name.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
          matches++
          return option
        }
      })
            
    });
    const selectOption = (option) => { 
      showOptions = false;
      selectedOption.value = option;
      searchTerm.value =  option;
      context.emit('getSelected', {x:'tes'} );
    }

    let selectedOption = ref(''); 
    context.expose({  selectedOption: selectedOption });
    return {
      showOptions,
      options,
      searchTerm,
      searchOptions,
      selectOption,
      selectedOption
    }
  }

}
</script>