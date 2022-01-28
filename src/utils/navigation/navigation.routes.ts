const NavigationRoutes = {
  splash: 'splash',
  auth: {
    signin: 'auth/signin',
    signup: 'auth/signup',
    name: 'auth',
  },
  main: {
    name: 'main',
    home: 'main/home',
    posts: {
      postList: 'main/posts/post-list',
      postDetail: 'main/posts/post-detail',
      addPost: 'main/posts/add-post',
      profile: 'main/posts/profile',
      name: 'main/posts',
    },
    messages: {
      messageList: 'main/messages/message-list',
      chat: 'main/messages/chat',
      name: 'main/messages',
    },
  },
};

export default NavigationRoutes;
