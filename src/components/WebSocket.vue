<template>
  <div>
    <h1>WebSocket Component version-19</h1>
    <ul>
      <li v-for="message in messages" :key="message">{{ message }}</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { debounce } from 'lodash'

  const messages = ref([])
  let socket = null

  const connectWebSocket = () => {
    // Connect to WebSocket
    socket = new WebSocket('ws://localhost:8888/hero-ranking/ws')

    // Listen for WebSocket connection success event
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connected:', event)
    })

    // Listen for WebSocket received message event
    socket.addEventListener(
      'message',
      debounce((event) => {
        const message = event.data
        console.log('Received message-----:', message)
        location.reload()
        // Update the messages list
        messages.value.push(message)
      }, 2000),
    )

    // Listen for WebSocket close event
    socket.addEventListener('close', (event) => {
      console.log('WebSocket closed:', event)
    })

    // Listen for WebSocket error event
    socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event)
    })
  }

  const closeWebSocket = () => {
    // Close WebSocket connection before component is unmounted
    if (socket) {
      socket.close()
    }
  }

  onMounted(() => {
    connectWebSocket()
  })

  onBeforeUnmount(() => {
    closeWebSocket()
  })
</script>

<style>
  /* Add your styles here */
</style>
