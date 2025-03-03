<template>
    <v-click>
        <div class="w-1/2 h-auto bg-white/0 hover:bg-white/5 transition duration-500 rounded-xl cursor-pointer p-6
    border-3 border-white/20 hover:border-white" @click="openExercise(id)">
            <div class="flex items-center mb-4">
                <div class="text-2xl font-bold flex-1">
                    {{ name }}
                </div>
                <div class="flex text-xl mr-4">
                    <div class="text-yellow" v-for="i in difficulty">★</div>
                    <div class="text-yellow/50" v-for="i in 5 - difficulty">☆</div>
                </div>
                <div class="rounded-md text-blue bg-blue-200/10 px-2 py-1 font-bold"> {{ year }}年 </div>
            </div>

            <img :src="`/${name}.gif`" @error="handleImgNotFound" class="opacity-50 rounded-md" />
        </div>
    </v-click>
</template>

<script setup lang="ts">
defineProps<{
    name: string;
    id: number;
    difficulty: number;
    year: number;
}>()

const openExercise = (id: number) => {
    window.open(`https://www.lanqiao.cn/problems/${id}/learning/`)
}

const handleImgNotFound = (event) => {
    event.target.style.display = 'none'
}
</script>