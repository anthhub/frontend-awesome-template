export const chatContentTypeCodeToEnum = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  VOICE: 'audio',
  TASK: 'task',
  PRODUCT: 'product',
  OPTION_TEXT: 'text',
  OPTION_IMAGE: 'optionImage',
  OPTION_INPUT: 'text',
  OPTION_DEFAULT_TEXT: 'text',
}

export const chatTaskTypeCodeToText = {
  INVITATION_NEW_USER: '拉新任务新用户',
  INVITATION_NEW_USER_AND_OLD_USER: '拉新任务新用户和老用户',
  PUZZLE: '解密任务',
}

export const activityStatusCodeToText = {
  NOT_STARTED: '未开始',
  PROCESSING: '进行中',
  OVER: '已结束',
}

// type: 'text' | 'image' | 'imageText' | 'video' | 'audio'
