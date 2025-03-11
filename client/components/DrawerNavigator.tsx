import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Pressable, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../app/index';
import LoginScreen from '../app/loginScreen';
import NotificationScreen from '../app/notificationScreen';
import LandingScreen from '../app/landingScreen';
import { Menu } from '~/lib/icons/Menu';
import { ThemeToggle } from '~/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { useColorScheme } from '~/lib/useColorScheme';
import { User } from 'lucide-react-native';
import { logout } from '~/lib/controllers/login_controller';

const Drawer = createDrawerNavigator();
const GITHUB_AVATAR_URI = 'https://i.pinimg.com/236x/da/0b/74/da0b74e8ab5df78e54b3a0f5db603d29.jpg';

function CustomDrawerContent(props) {
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleLogout = () => {
        setModalVisible(false);
        logout();
        props.navigation.navigate('Login');
    };

    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Avatar style={{ width: 150, height: 150 }} alt='Profile Avatar'>
                    <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                    <AvatarFallback>
                        <User size={48} color='black' />
                    </AvatarFallback>
                </Avatar>
                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Mary Loi Yves Ricalde</Text>
                <Text style={{ fontSize: 16, color: 'gray' }}>@maryloiiii3</Text>
            </View>
            <DrawerItem label='Flight History' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Announcement Log' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Appearance' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Language' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Privacy & Security' onPress={() => props.navigation.navigate('Main')} />
            <DrawerItem label='Logout' onPress={() => setModalVisible(true)} />

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, padding: 20, backgroundColor: 'rgba(3, 138, 255, 1)', borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'white' }}>Log out</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20, color: 'white' }}>
                            Are you sure you want to log out? You'll need to login again to use the app.
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logoutButton: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'rgba(3, 138, 255, 1)',
        fontSize: 16,
    },
});

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