<template>
    <div class="flex w-auto flex-col h-screen">

      <NuxtLink to="/" class="flex items-center space-x-3 justify-center flex-col py-20 pb-5">
        <div class="flex items-end">

          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <div class="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <div class="w-5 h-5 bg-primary rounded-full"></div>
        </div>
        <h1 class="text-4xl font-bold py-3 text-font">Search Full-Stack</h1>
      </NuxtLink>

      <NuxtLink
      :to="'/produtos'"
      class="self-center max-w-fit bg-primary text-white text-center px-4 py-2 rounded hover:bg-secondary transition mt-4"
      
      >
      Acesse o Catálogo
    </NuxtLink>
    </div>
  </template>
  

