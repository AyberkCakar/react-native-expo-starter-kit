# React Native Expo Starter UI Kit
![Adsız (950 × 600 piksel) (900 × 600 piksel) (2)](https://user-images.githubusercontent.com/38071168/166121208-65f95ee4-aed3-401e-b112-6028b5cd6d43.png)


### Project Installation Instructions
The project was developed via Expo CLI.

```
  $ npm install -g expo-cli

  $ git clone https://github.com/AyberkCakar/react-native-expo-starter-kit.git
  
  # package install
  $ npm install (or) yarn install (or) expo install

  # project start
  $ expo start
  
```
### Project Description
The project was developed via Expo CLI. The ready-made mobile UI design was based and improvements were made on it. In practice, the firebase (auth, firestore, storage) infrastructure was used. In the application, there are UI components, map, push notification and database infrastructure. The application will continue to be improved. The application will continue to be improved. You can view changes made to the application in the ChangeLog or under projects.

Note: Existing bugs will be fixed and improvements will continue.

### Pages Within the Project

```
  - Sign In
  - Sign Up
  - Home
  - Profile
  - Edit User
  - Users
  - Component Examples
  - Notification
  - Notifications
  - Map
```
### Components

```
  - Buttons
  - Social Media Buttons
  - Switch
  - Text Input ( e-mail, password, etc. )
  - Search Input
  - Typography
  - Select Dropdown
  - Select Modal
  - Cards
  - Album
  - Carousel  
```


### Using Firebase
```
  Auth
    - Sign In
    - Sign Up
  
  Firestore
    - User Information
    - Notifications
    
  Storage 
    - User Image
```

### Firebase Schemas

##### User Schema
```
  uid?: string;
  name: string;
  email: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  github?: string;
  title?: string;
  aboutMe?: string;
  image?: string;
  repos?: number;
  followers?: number;
  following?: number;
  company?: string;
  ```
  
  ##### Notification Schema
```   
  uid: string;
  is_read?: boolean;
  is_image?: boolean;
  description?: string;
  title?: string;
  image?: string;
  user_uid?: string;
  detail?: string;
  detail_image?: string;
  created_at?: timestamp;
  ```

### Related Articles
* [React Native - Expo Neden Kullanmalıyım?](https://ayberkcakar.medium.com/react-native-expo-neden-kullanmal%C4%B1y%C4%B1m-394235e8c9d6)
* [React Native - Expo Nasıl Kurabilirim?](https://ayberkcakar.medium.com/react-native-expo-nas%C4%B1l-kurabilirim-3fe178a992f6)
* [React Native — Expo Firebase Kurulumu](https://ayberkcakar.medium.com/react-native-expo-firebase-kurulumu-e1f740903286)
* [React Native — Expo Firebase Kullanımı](https://ayberkcakar.medium.com/react-native-expo-firebase-kullan%C4%B1m%C4%B1-bd9ea0addefb)


## Useful resources
* [Changelog](CHANGELOG.md)
