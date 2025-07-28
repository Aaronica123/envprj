import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function EwasteOverviewContent() {
  const whyEwasteItems = [
    {
      emoji: '🌿',
      title: 'Environmental Protection',
      description:
        'Electronic devices contain toxic substances like lead, mercury, cadmium, and beryllium. When e-waste is improperly disposed of, these harmful chemicals can leach into the soil and water, contaminating ecosystems and posing severe risks to human health. Recycling prevents this pollution.',
    },
    {
      emoji: '♻️',
      title: 'Resource Conservation',
      description:
        'E-waste contains valuable and finite resources such as gold, silver, copper, platinum, and rare earth elements. Recycling these materials reduces the need for virgin resource extraction, conserving natural resources and significantly decreasing energy consumption associated with mining and processing.',
    },
    {
      emoji: '💰',
      title: 'Economic Benefits',
      description:
        'The e-waste recycling industry creates green jobs in collection, sorting, dismantling, and material recovery. Furthermore, recovering valuable materials can provide a steady supply for manufacturing, reducing reliance on imports and stabilizing raw material costs.',
    },
    {
      emoji: '⚕️',
      title: 'Health and Safety',
      description:
        'Informal e-waste recycling practices in many developing countries often involve burning electronics or using acid baths to extract metals. These dangerous methods expose workers and surrounding communities to toxic fumes and chemicals, leading to severe health problems. Responsible recycling ensures safer practices.',
    },
  ];

  const collectionProcessItems = [
    {
      title: 'Designated Drop-off Points',
      description:
        'Collection centers, retail take-back programs, and municipal facilities where consumers can responsibly dispose of their old electronics.',
    },
    {
      title: 'Collection Drives',
      description: 'Community events organized to gather e-waste from residents.',
    },
    {
      title: 'Corporate Recycling Programs',
      description: 'Businesses often have specific programs to handle their own electronic waste.',
    },
    {
      title: 'Responsible Recycling Facilities',
      description:
        'Once collected, e-waste is transported to certified recycling facilities where it is safely dismantled, separated, and processed to recover valuable materials and neutralize hazardous components.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Understanding E-Waste Collection</Text>

      <Text style={styles.paragraph}>
        E-waste, or electronic waste, refers to discarded electrical or electronic devices. This includes everything
        from old cell phones and laptops to refrigerators and televisions. As technology rapidly advances and
        consumer electronics become more affordable, the volume of e-waste generated globally is growing at an alarming rate.
      </Text>

      <Text style={styles.sectionHeading}>Why E-Waste Collection is Crucial</Text>
      {whyEwasteItems.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.listContent}>
            <Text style={styles.itemTitle}>{item.title}:</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionHeading}>The Collection Process</Text>
      {collectionProcessItems.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <View style={styles.listContent}>
            <Text style={styles.itemTitle}>{item.title}:</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.conclusion}>
        By actively participating in e-waste collection and supporting certified recyclers, we contribute to a cleaner environment, a more sustainable economy, and a healthier future for everyone.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 12,
    marginVertical: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#166534',
    textAlign: 'center',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#15803D',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#BBF7D0',
    paddingBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
    color: '#16A34A',
  },
  bullet: {
    fontSize: 16,
    marginRight: 12,
    color: '#4B5563',
  },
  listContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14532D',
  },
  itemDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  conclusion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 24,
  },
});

export default EwasteOverviewContent;