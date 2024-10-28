import { useTheme } from '@/components/ThemeContext';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import i18n from '@/app/i18n';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#32A873',
        tabBarStyle: {
          position: 'absolute',
          elevation: 2,
          height:60,
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('Home'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: i18n.t('Search'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: i18n.t('Favorites'),
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="favorite" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('Settings'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
