import Message from '#/demo/pages/Message'
import Work from '#/demo/pages/Work'
import Me from '#/demo/pages/Me'

export default [
  {path: '/', name: '/', redirect: '/msg', meta: {accessType: 'guest'}},
  {path: '/msg', name: '/msg', component: Message, meta: {accessType: 'guest'}},
  {path: '/work', name: '/work', component: Work, meta: {accessType: 'guest'}},
  {path: '/me', name: '/me', component: Me, meta: {accessType: 'guest'}},
]
