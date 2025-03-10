import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Pressable } from 'react-native';
import HomeScreen from '../app/index';
import LoginScreen from '../app/loginScreen';
import NotificationScreen from '../app/notificationScreen';
import LandingScreen from '../app/landingScreen';
import { Menu } from '~/lib/icons/Menu';
import { ThemeToggle } from '~/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/useColorScheme';
import { User } from 'lucide-react-native';

const Drawer = createDrawerNavigator();
const GITHUB_AVATAR_URI = 'https://i.pinimg.com/236x/da/0b/74/da0b74e8ab5df78e54b3a0f5db603d29.jpg';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Avatar style={{ width: 150, height: 150 }} alt='Profile Avatar'>
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                        <User size={48} color='black' />
                    </AvatarFallback>
                </Avatar>
                <Text style={{ marginTop: 10, fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>Mary Loi Yves Ricalde</Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>@maryloiiii3</Text>
            </View>
            <DrawerItem label='Flight History' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Announcement Log' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Appearance' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Language' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Privacy & Security' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Logout' onPress={() => props.navigation.navigate('Main')} />
        </DrawerContentScrollView>
    );
}

export default function DrawerNavigator() {
    const { isDarkColorScheme } = useColorScheme();

    return (
        <Drawer.Navigator
            initialRouteName='Landing'
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: { backgroundColor: isDarkColorScheme ? 'black' : 'white' },
            }}
        >
            <Drawer.Screen name='Login' component={LoginScreen} />
            <Drawer.Screen name='Landing' component={LandingScreen} />
            <Drawer.Screen name='Notification' component={NotificationScreen} />
            <Drawer.Screen
                name='Main'
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.toggleDrawer()}>
                            <View style={{ marginLeft: 15, marginRight: 10 }}>
                                <Menu size={24} color={isDarkColorScheme ? 'white' : 'black'} />
                            </View>
                        </Pressable>
                    ),
                    headerRight: () => <ThemeToggle />,
                })}
            />
        </Drawer.Navigator>
    );
}
