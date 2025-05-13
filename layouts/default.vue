<template>
  <div class="min-h-screen flex flex-col bg-light">
    <header class="bg-primary text-white p-4 shadow-md flex items-center gap-5 ">
      <NuxtLink to="/" class="flex items-center space-x-3">
        <div class="flex items-end">
          <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div class="w-4 h-4 bg-primary rounded-full"></div>
          </div>
          <div class="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <h1 class="self-start text-2xl font-bold ">Search Full-Stack</h1>
      </NuxtLink>
      <strong>|</strong>
      <NuxtLink to="/produtos" class="flex items-center space-x-3">
        <h2 class="text-xl font-normal">Catálogo de Produtos</h2>
      </NuxtLink>
    </header>

    <main class="flex-1 container mx-auto p-4 bg-white max-w-screen-xl">
      <slot />
    </main>

    <footer class="bg-gray-200 text-gray-600 text-sm p-4 text-center">
      © 2025 - Search Full-Stack
    </footer>
  </div>
</template>
