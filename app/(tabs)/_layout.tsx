import { IconSymbol } from '@/components/ui/icon-symbol';
import { customColors } from '@/constants/colours';
import { PlatformPressable } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


function TabBar({ state, descriptors, navigation }: any) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: customColors.light.background,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 3, // Android
      }}
      className="w-11/12 p-2 mx-auto rounded-2xl border flex flex-row justify-center items-center relative"
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
          key={route.key}
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarButtonTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{ flex: 1 }}
        >
          <View className="items-center justify-center gap-1">
            {options.tabBarIcon && (
              <IconSymbol
                style={options.tabBarItemStyle}
                size={options.tabBarIconStyle?.fontSize || 24}
                color={isFocused ? customColors.accentSkyBlue : (options as any).tabBarIconColor || '#808080'}
                name={typeof options.tabBarIcon === 'string' ? options.tabBarIcon : (options as any).tabBarIconName}
              />
            )}
          </View>
        </PlatformPressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: 'house.fill' } as any} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: 'paperplane.fill' } as any} />
      <Tabs.Screen
        name="new-event"
        options={{
          title: 'New',
          tabBarIcon: 'plus.circle.fill',
          tabBarIconName: 'plus.circle.fill',
          tabBarIconColor: customColors.accentMint,
          tabBarIconStyle: { fontSize: 50 },
          tabBarItemStyle: { shadowColor: '#000', shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 3}
        } as any}
      />
      <Tabs.Screen name="notifications" options={{ title: 'Notifications', tabBarIcon: 'bell.fill' } as any} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: 'person.fill' } as any} />
    </Tabs>
  );
}