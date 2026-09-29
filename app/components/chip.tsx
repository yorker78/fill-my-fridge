import { View, Text, StyleSheet } from 'react-native';

export const Chip = (props: { label: string }) => {
  const {label} = props;
  return (
    <View style={styles.chipContainer}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
});


