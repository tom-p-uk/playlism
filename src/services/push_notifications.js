import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'https://playlism.herokuapp.com/api/user/pushtoken';

export default async authToken => {
  const previousToken = await AsyncStorage.getItem('pushToken');

  if (previousToken) return;
  else {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    if (status !== 'granted') return;

    const pushToken = await Notifications.getExponentPushTokenAsync();

    axios.defaults.headers.common['Authorization'] = authToken;
    const result = await axios.put(PUSH_ENDPOINT, { pushToken });

    if (result.status !== 200) {
      console.log(result.data);
    }

    await AsyncStorage.setItem('pushToken', pushToken);
  }
};
