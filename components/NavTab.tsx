import { View, Text, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';


// 📌 Custom Tab Bar Component
export const NavTab = ({ state, descriptors, navigation }: any) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={navBarStyles.navigator}>
      {state.routes.map((route: any, index: any) => {
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
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={navBarStyles.tab}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const navBarStyles = StyleSheet.create({
  navigator:{
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 30},
    shadowRadius: 10,
    shadowOpacity: .5,
    elevation: 2,
  },
  tab:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})