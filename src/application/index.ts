import master from './master'
import message from './message'
import request from './request'
import router from './router'
import storage from './storage'
import system from './system'
import user from './user'

export const storeApplication = { system, storage, message, master, router, user, request }

export const compApplication = { system, message, router, user }
