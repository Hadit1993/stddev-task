import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationRoutes from './navigation.routes';
import SignInScreen from '../../screens/authentication/signin.screen';
import SignUpScreen from '../../screens/authentication/signup.screen';
import PostListScreen from '../../screens/posts/post-list.screen';
import PostDetailScreen from '../../screens/posts/post-detail.screen';
import AddPostScreen from '../../screens/posts/add-post.screen';
import MessageListScreen from '../../screens/messages/message-list.screen';
import ChatScreen from '../../screens/messages/chat.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/home.screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultTheme from '../theme/default.theme';
import SplashScreen from '../../screens/splash/splash.screen';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from '../../screens/posts/profile.screen';

const {
  splash,
  auth: {signin, signup, name: authName},
  main: {
    name: mainName,
    home,
    posts: {postList, postDetail, addPost, name: postsName, profile},
    messages: {messageList, chat, name: messagesName},
  },
} = NavigationRoutes;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={signin}
      component={SignInScreen}
      options={{headerShown: false}}
    />

    <Stack.Screen
      name={signup}
      component={SignUpScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const PostsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={postList}
      component={PostListScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={postDetail}
      component={PostDetailScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={addPost}
      component={AddPostScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={profile}
      component={ProfileScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MessagesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={messageList}
      component={MessageListScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={chat}
      component={ChatScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarActiveTintColor: DefaultTheme.primaryColor,
      tabBarInactiveTintColor: 'grey',
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({focused, color, size}) => {
        let iconName: string;

        switch (route.name) {
          case messagesName:
            iconName = focused ? 'chat-bubble' : 'chat-bubble-outline';
            break;

          case postsName:
            iconName = focused ? 'person' : 'person-outline';
            break;

          default:
            iconName = 'home';
            break;
        }

        return <Icon name={iconName} color={color} size={size} />;
      },
    })}>
    <Tab.Screen
      name={home}
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name={messagesName}
      component={MessagesNavigator}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name={postsName}
      component={PostsNavigator}
      options={{headerShown: false}}
      listeners={({navigation}) => ({
        tabPress: _e => {
          navigation.navigate(NavigationRoutes.main.posts.name, {
            screen: NavigationRoutes.main.posts.postList,
          });
        },
      })}
    />
  </Tab.Navigator>
);

const NavigationConfig = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={splash}>
      <Stack.Screen
        name={splash}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={authName}
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mainName}
        component={MainNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default NavigationConfig;
