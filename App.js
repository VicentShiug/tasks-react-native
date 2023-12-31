import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Task from './src/pages/Task/Task';
import NewTask from './src/pages/NewTask/NewTask';
import Details from './src/pages/Details/Details';
import Login from './src/pages/Login/Login';
import NewUser from './src/pages/NewUser/NewUser';
import { Button } from 'react-native-web';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen 
          name='Login'
          component={Login}
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
        <Stack.Screen 
          name='NewUser'
          component={NewUser}
          options={{
            headerShown: false,
            animationEnabled: true
          }}
        />
        <Stack.Screen 
          name='Task'
          component={Task}
          options={{
            headerTintColor: "#f92e6a",
            animationEnabled: true,
            headerLeft: false
          }}
        />
        <Stack.Screen 
          name='New Task'
          component={NewTask}
          options={{
            headerTintColor: "#f92e6a",
            animationEnabled: true
          }}
        />
        <Stack.Screen 
          name='Details'
          component={Details}
          options={{
            headerTintColor: "#f92e6a",
            animationEnabled: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


