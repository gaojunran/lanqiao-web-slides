<template>
    <div class="rounded-md text-blue bg-blue-200/10 px-2 py-1 font-bold inline"> 
        {{ props.name }}
    </div>
</template>



<script setup>
const props = defineProps({
    name: String,
    type: Number
})

</script>