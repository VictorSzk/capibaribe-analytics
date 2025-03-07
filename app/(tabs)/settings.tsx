import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'

const SettingsMenu = () => {
  return (
    <ThemedView style={styles.page}>
      <Text>SettingsMenu</Text>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    }
})

export default SettingsMenu