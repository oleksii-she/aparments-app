

<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { format } from 'date-fns'
import { socket } from './socket'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '@/stores'
import { watchEffect, ref } from 'vue'
import { state } from './socket'

const authStore = useAuthStore()
const scrollList = ref([])
const scrollBottom = ref(false)
const updateList = ref('expectation')
const toggleScroll = ref(false)
const InfinityScrollActive = ref(false)
const InfinityScroll = ref(false)
const collapseChat = ref(false)
const joinState = reactive({
  online: 0,
  owner: '',
  name: '',
  toggle: false,
  message: '',
  messages: []
})
let page = 1
const router = useRouter()

const updateMessage = reactive({
  id: '',
  message: ''
})

onMounted(() => {
  scrollBottomHandler()
})

const scrollBottomHandler = () => {
  setTimeout(() => {
    const chatList = document.querySelector('.chat__list')
    if (chatList && joinState.messages.length > 6) {
      console.log('змонтовано')
      chatList.scrollTop = chatList.scrollHeight
    }
  }, 500)
}
watchEffect(async () => {
  if (authStore.name) {
    joinState.owner = authStore.id
    joinState.name = authStore.name
  }

  await authStore.getChats()

  joinState.messages = [...authStore.chatItems]
})

const loadData = async ($state) => {
  try {
    if (!InfinityScroll.value) {
      return
    }

    page = page + 1
    const data = await authStore.getChatsPage(page)

    if (data.totalPosts === joinState.messages.length) {
      $state.complete()
      return
    } else {
      joinState.messages = authStore.chatItems
      $state.loaded()
      InfinityScroll.value = false
    }
  } catch (error) {
    $state.error()
  }
}
watchEffect(() => {
  if (!authStore.isJoinAuth) {
    state.connected = false
  }
  if (updateList.value === 'updated') {
    listToBottomHandler()
    scrollBottom.value = false
    updateList.value = 'expectation'
  }
})

const listToBottomHandler = () => {
  const chatList = document.querySelector('.chat__list')
  if (chatList) {
    const scrollHeight = chatList.scrollHeight
    const currentScrollTop = chatList.scrollTop
    const targetScrollTop = scrollHeight - chatList.clientHeight
    const duration = 500 // тривалість анімації в мілісекундах

    // Плавна прокрутка до нижньої частини списку чату
    smoothScroll(chatList, currentScrollTop, targetScrollTop, duration)
    InfinityScrollActive.value = true
  }
}

function smoothScroll(element, start, end, duration) {
  const startTime = performance.now()

  function step(currentTime) {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const ease = easeInOutCubic(progress)
    element.scrollTop = start + (end - start) * ease
    if (elapsedTime < duration) {
      requestAnimationFrame(step)
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  requestAnimationFrame(step)
}

const onJoin = () => {
  if (joinState.name !== '') {
    authStore.isJoinAuth = true
    socket.connect()
    joinState.toggle = true
    socket.on('connection', (data) => {
      joinState.online = data.online - 1
    })
  } else {
    router.push('/login')
  }
}
const logOutChat = () => {
  authStore.isJoinAuth = false
  state.connected = false
}

const onMessageEnter = () => {
  const newMessage = {
    _id: uuidv4(),
    owner: joinState.owner,
    name: joinState.name,
    message: joinState.message.trim(),
    createdAt: new Date().toString()
  }
  if (newMessage.message === '') {
    return
  }
  socket.emit('message', newMessage)

  joinState.message = ''
  const textarea = document.getElementById('myTextarea')

  textarea.style.height = 'auto'
  textarea.rows = 1
  scrollBottom.value = true
  updateList.value = 'preparation'
}

socket.on('message', (data) => {
  let currentLength = joinState.messages.length
  let newLength = 0

  const newData = [...joinState.messages]
  newData.push(data)
  newLength = newData.length
  joinState.messages = newData

  if (newLength > currentLength && updateList.value === 'preparation') {
    setTimeout(() => {
      updateList.value = 'updated'
    }, 500)
  }
})

const updateHandler = (id) => {
  if (!id) {
    return
  }

  updateMessage.id = id
  const getMessage = joinState.messages.find((el) => el._id === id)
  updateMessage.message = getMessage.message
}

const updateChatIdHandler = async () => {
  const getMessage = joinState.messages.find((el) => el._id === updateMessage.id)

  socket.emit('update message', {
    ...getMessage,
    message: updateMessage.message,
    updateId: updateMessage.id
  })
}

socket.on('update message', (data) => {
  if (!data) {
    updateMessage.id = ''
    return
  }

  const deleteMessages = joinState.messages.filter((el) => el._id !== updateMessage.id)

  const newDateSort = [...deleteMessages, data].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )
  joinState.messages = newDateSort
  updateMessage.id = ''
})

function autoResize(e) {
  const textarea = e.target
  const computedStyle = window.getComputedStyle(textarea)
  const lineHeight = parseInt(computedStyle.lineHeight)
  const padding = parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom)
  const borderTop = parseInt(computedStyle.borderTopWidth)
  const borderBottom = parseInt(computedStyle.borderBottomWidth)

  // Обчислити нову висоту текстової області
  const newHeight = textarea.scrollHeight - padding + borderTop + borderBottom

  // Змінити висоту текстової області, якщо нова висота більша за поточну
  if (newHeight > textarea.clientHeight) {
    textarea.style.height = newHeight + 'px'

    // Розрахувати кількість рядків
    let numberOfLines = Math.ceil(newHeight / lineHeight)

    // Обмеження на максимальну кількість рядків
    const maxRows = 10
    if (numberOfLines > maxRows) {
      numberOfLines = maxRows
      textarea.style.overflowY = 'auto' // Додати вертикальну прокрутку, якщо перевищено ліміт
    } else {
      textarea.style.overflowY = 'hidden' // Приховати вертикальну прокрутку, якщо ліміт не перевищено
    }

    textarea.rows = numberOfLines
  }
}

const handlerCollapseChat = () => {
  collapseChat.value = !collapseChat.value
}

const classChatToggle = () => {
  if (collapseChat.value && authStore.isJoinAuth) {
    return `chat chat-collapse`
  }
  if (authStore.isJoinAuth) {
    return 'chat'
  }
  return `default-chat`
}
</script>


<template>
  <div :class="classChatToggle()">
    <button v-if="authStore.isJoinAuth" class="collapse" @click="handlerCollapseChat">
      <svg :class="!collapseChat ? 'collapse__bottom-icon---rotate' : 'collapse__bottom-icon'">
        <use xlink:href="/src/assets/svg/sprite.svg#icon-collapse"></use>
      </svg>
    </button>
    <div class="chat__auth" v-if="!authStore.isJoinAuth">
      <button type="button" @click="onJoin">
        <svg class="chat__logout-chat">
          <use xlink:href="/src/assets/svg/sprite.svg#icon-chat"></use>
        </svg>
        <p>Join Chat</p>
      </button>
    </div>

    <div class="chat__container" v-else>
      <div class="header-chat">
        <p class="online">
          online: <span>{{ joinState.online }}</span>
        </p>
        <h2>Chat</h2>
        <button class="chat__logout" @click="logOutChat">
          <svg class="chat__logout-icon">
            <use xlink:href="/src/assets/svg/sprite.svg#icon-logout"></use>
          </svg>
        </button>
      </div>

      <ul
        class="chat__list"
        v-if="joinState.messages.length !== 0 && !collapseChat"
        ref="scrollList"
        @scroll="
          (e) => {
            // e.target.scrollTop = e.target.scrollHeight
            const scrollTop = e.target.scrollTop
            const scrollHeight = e.target.scrollHeight
            const windowHeight = e.target.clientHeight
            // Перевірка, чи досягнута половина вікна чату
            if (scrollTop < windowHeight / 2) {
              InfinityScroll = true
            } else {
              InfinityScroll = false
            }

            let calculation = scrollHeight - scrollTop
            if (calculation > 800) {
              toggleScroll = true
            } else {
              toggleScroll = false
            }
          }
        "
      >
        <InfiniteLoading @infinite="loadData" />
        <li
          :class="message.owner === joinState.owner ? 'chat__item' : 'chat__item---you chat__item'"
          v-for="message in joinState.messages"
          :key="message._id"
        >
          <div class="chat__list-item-wrapper">
            <b v-if="message.owner === joinState.owner">You</b>
            <a v v-else :href="`/user/${message.owner}`"
              ><b>{{ message.name }}</b></a
            >
            <button v-if="message.owner === joinState.owner" @click="updateHandler(message._id)">
              <svg class="chat__edit-icon">
                <use xlink:href="/src/assets/svg/sprite.svg#icon-edit"></use>
              </svg>
            </button>
          </div>

          <p>{{ message.message }}</p>
          <div class="chat__data-wrapper">
            <p class="chat__edited-text">{{ message.edited === true ? 'Edited' : '' }}</p>
            <p class="chat__edited-text" v-if="message.createdAt">
              {{ format(new Date(message.createdAt), 'yyyy-MM-dd HH:mm') }}
            </p>
          </div>
        </li>
      </ul>
      <div v-if="!collapseChat && !joinState.messages.length" class="chat__message-wrapper">
        <p class="message">
          There are currently no messages, you can be the first, write and others will join
        </p>
      </div>

      <div class="chat__text-wrapper" v-if="!collapseChat">
        <button
          @click="listToBottomHandler"
          class="arrow-up"
          v-if="joinState.messages.length > 6 && toggleScroll"
        >
          <svg class="">
            <use xlink:href="/src/assets/svg/sprite.svg#icon-circle-down"></use>
          </svg>
        </button>
        <textarea
          v-if="updateMessage.id"
          name="message"
          v-model="updateMessage.message"
          id=""
          v-on:keyup.enter="updateChatIdHandler"
        ></textarea>

        <textarea
          v-else
          id="myTextarea"
          name="message"
          cols="1"
          rows="1"
          v-model="joinState.message"
          v-on:keyup.enter="onMessageEnter"
          @input="autoResize"
        ></textarea>
        <button>
          <svg class="chat__edit-icon">
            <use xlink:href="/src/assets/svg/sprite.svg#icon-send"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collapse {
  position: absolute;
  right: 60px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &__bottom-icon {
    width: 16px;
    height: 16px;
  }

  &__bottom-icon---rotate {
    width: 16px;
    height: 16px;
    transform: rotate(180deg);
    transition: transform 0.5s;
  }
}
.default-chat {
  position: fixed;
  bottom: 0;
  right: 0px;
  width: 120px;
  height: 120px;
  z-index: 999;

  @media screen and (min-width: 1200px) {
    // position: absolute;
    right: 10%;
  }
  .chat__auth {
    button {
      display: flex;
      background-color: transparent;
      border: none;
      width: max-content;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        // font-family:;
        font-size: 18px;
        font-weight: 600;
        color: $main-color;
      }
    }
  }
}

.chat__logout-chat {
  width: 64px;
  height: 64px;
  fill: $main-color;
  stroke: $activeColor;
}

.header-chat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $main-color;
  padding-left: 16px;
  padding-right: 16px;
  h2 {
    background: $main-color;
    color: $background;
    text-align: center;
    padding: 20px;
  }
}

.online {
  color: $background;
  display: flex;
  align-items: center;
  color: rgb(13, 176, 13);
  span {
    margin-left: 4px;
    color: $activeColor;
  }
  &::after {
    content: '';
    margin-left: 8px;
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: rgb(13, 176, 13);
  }
}

.chat-collapse {
  width: 250px !important;
  height: 60px !important;
  right: 0;

  @media screen and (min-width: 768px) {
    width: 350px !important;
    height: 60px !important;
  }
  transition-property: height, width;
  transition-duration: 0.5s, 0.5s;
}
.chat {
  position: fixed;
  width: 100vw;
  right: 0;
  height: 100%;
  background-color: $background;
  overflow: hidden;

  bottom: 0;
  z-index: 1000;

  @media screen and (min-width: 768px) {
    width: 600px;
    height: 600px;
    border-radius: 16px;
    right: 0 !important;
  }
  transition-property: height, width;
  transition-duration: 0.5s, 0.5s;
  &__logout {
    border: none;
    background-color: transparent;
  }

  &__logout-icon {
    width: 22px;
    height: 22px;
    fill: transparent;
    stroke: $background;
  }

  &__container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__list {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 8px;
    width: 100%;
    height: 60px;
    margin: 0;
    overflow: auto;
  }
  &__message-wrapper {
    flex: 1 1 auto;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__item {
    background-color: $header;
    margin-bottom: 16px;
    width: 80%;
    padding: 16px;
  }
  &__item---you {
    background-color: $reviews;
    align-self: flex-end;
  }

  &__list-item-wrapper {
    display: flex;

    justify-content: space-between;
    align-items: center;

    a {
      b {
        color: $hoverColor;
      }
    }
    b {
      color: $activeColor;
    }
    margin-bottom: 8px;
    button {
      background: transparent;
      border: none;
    }
  }
  .chat__edit-icon {
    width: 16px;
    height: 16px;

    fill: $activeColor;
  }

  &__data-wrapper {
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    p {
      font-size: 12px;
    }
  }
  &__text-wrapper {
    display: flex;
    align-items: flex-end;
    background-color: $main-color;
    position: relative;
    padding: 8px;
    height: 60px;
    textarea {
      padding: 8px;

      overflow: auto;
      border: 2px solid transparent;
      border-right: none;
      max-height: 180px;
      width: 100%;
      flex-grow: 1;
      resize: vertical;
      background-color: $secondary-color;
      outline: none;
      color: $background;
    }

    button {
      background-color: transparent;
      border: none;
      align-items: self-start;
      padding: 8px;
      height: 37.6px;
    }
  }
}

.arrow-up {
  position: absolute;
  right: 20px;
  top: -80px;
  bottom: 100%;
  width: max-content;
  height: max-content;

  border: none;
  padding: 12px;

  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: $activeColor;
    background-color: $main-color !important;
    border-radius: 100%;
    width: 36px;
    height: 36px;
  }
}

.message {
  text-align: center;
}
</style>
