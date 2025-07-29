import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SearchBar, Card, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';

export default function ProviderFinderScreen() {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const mockProviders = [
    {
      id: '1',
      name: 'City Medical Center',
      specialty: 'Primary Care',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      distance: '0.5 miles',
      rating: 4.8,
      acceptingPatients: true,
    },
    {
      id: '2',
      name: 'Downtown Dental',
      specialty: 'Dentistry',
      address: '456 Oak Ave, Downtown',
      phone: '(555) 234-5678',
      distance: '0.8 miles',
      rating: 4.6,
      acceptingPatients: true,
    },
    {
      id: '3',
      name: 'Vision Care Specialists',
      specialty: 'Ophthalmology',
      address: '789 Pine St, Midtown',
      phone: '(555) 345-6789',
      distance: '1.2 miles',
      rating: 4.9,
      acceptingPatients: false,
    },
    {
      id: '4',
      name: 'Urgent Care Plus',
      specialty: 'Urgent Care',
      address: '321 Elm St, Uptown',
      phone: '(555) 456-7890',
      distance: '1.5 miles',
      rating: 4.4,
      acceptingPatients: true,
    },
    {
      id: '5',
      name: 'Heart & Wellness Clinic',
      specialty: 'Cardiology',
      address: '654 Maple Dr, Westside',
      phone: '(555) 567-8901',
      distance: '2.1 miles',
      rating: 4.7,
      acceptingPatients: true,
    },
    {
      id: '6',
      name: 'Family Health Associates',
      specialty: 'Family Medicine',
      address: '987 Cedar Ln, Eastside',
      phone: '(555) 678-9012',
      distance: '2.3 miles',
      rating: 4.5,
      acceptingPatients: true,
    },
  ];

  useEffect(() => {
    loadProviders();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [searchQuery, providers]);

  const loadProviders = async () => {
    try {
      const storedProviders = await AsyncStorage.getItem('providers');
      if (storedProviders) {
        setProviders(JSON.parse(storedProviders));
      } else {
        setProviders(mockProviders);
        await AsyncStorage.setItem('providers', JSON.stringify(mockProviders));
      }
    } catch (error) {
      console.error('Error loading providers:', error);
      setProviders(mockProviders);
    }
  };

  const filterProviders = () => {
    if (!searchQuery.trim()) {
      setFilteredProviders(providers);
      return;
    }

    const filtered = providers.filter(provider =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  const handleCall = (phoneNumber) => {
    Alert.alert(
      'Call Provider',
      `Would you like to call ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={COLORS.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color={COLORS.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color={COLORS.gray} />
      );
    }

    return stars;
  };

  const renderProviderItem = ({ item }) => (
    <Card containerStyle={styles.providerCard}>
      <View style={styles.providerHeader}>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.specialty}>{item.specialty}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText,
            { color: item.acceptingPatients ? COLORS.success : COLORS.error }
          ]}>
            {item.acceptingPatients ? 'Accepting Patients' : 'Not Accepting'}
          </Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <View style={styles.stars}>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <View style={styles.addressContainer}>
        <Ionicons name="location-outline" size={16} color={COLORS.gray} />
        <Text style={styles.address}>{item.address}</Text>
      </View>

      <View style={styles.distanceContainer}>
        <Ionicons name="navigate-outline" size={16} color={COLORS.primary} />
        <Text style={styles.distance}>{item.distance}</Text>
      </View>

      <View style={styles.actionContainer}>
        <Button
          title="Call"
          icon={
            <Ionicons
              name="call"
              size={16}
              color={COLORS.white}
              style={{ marginRight: 5 }}
            />
          }
          buttonStyle={[styles.actionButton, styles.callButton]}
          titleStyle={styles.buttonText}
          onPress={() => handleCall(item.phone)}
        />
        <Button
          title="Directions"
          icon={
            <Ionicons
              name="map"
              size={16}
              color={COLORS.primary}
              style={{ marginRight: 5 }}
            />
          }
          buttonStyle={[styles.actionButton, styles.directionsButton]}
          titleStyle={[styles.buttonText, { color: COLORS.primary }]}
          onPress={() => {
            const address = encodeURIComponent(item.address);
            Linking.openURL(`https://maps.google.com/?q=${address}`);
          }}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Find Providers</Text>
        <Text style={styles.subHeaderText}>Search by name, specialty, or location</Text>
      </View>

      <SearchBar
        placeholder="Search providers..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        searchIcon={{ color: COLORS.gray }}
        clearIcon={{ color: COLORS.gray }}
      />

      <FlatList
        data={filteredProviders}
        renderItem={renderProviderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={COLORS.gray} />
            <Text style={styles.emptyText}>No providers found</Text>
            <Text style={styles.emptySubText}>Try adjusting your search criteria</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  header: {
    backgroundColor: COLORS.glass.primaryGlass,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glass.border,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
  },
  searchContainer: {
    backgroundColor: COLORS.glass.backgroundLight,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glass.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInputContainer: {
    backgroundColor: COLORS.glass.background,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  searchInput: {
    fontSize: 16,
    color: COLORS.black,
  },
  listContainer: {
    padding: 10,
  },
  providerCard: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: COLORS.glass.background,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    shadowColor: COLORS.glass.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.37,
    shadowRadius: 25,
    elevation: 8,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginLeft: 5,
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  distance: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 10,
  },
  callButton: {
    backgroundColor: COLORS.glass.primaryGlass,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  directionsButton: {
    backgroundColor: COLORS.glass.backgroundLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: '600',
    marginTop: 15,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
});
