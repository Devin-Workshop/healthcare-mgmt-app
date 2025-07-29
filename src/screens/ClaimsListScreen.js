import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Card, Badge } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';

export default function ClaimsListScreen({ navigation }) {
  const [claims, setClaims] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const mockClaims = [
    {
      id: '1',
      claimNumber: 'CLM-2024-001',
      provider: 'City Medical Center',
      serviceDate: '2024-01-15',
      amount: '$250.00',
      status: 'Approved',
      description: 'Annual Physical Exam',
    },
    {
      id: '2',
      claimNumber: 'CLM-2024-002',
      provider: 'Downtown Dental',
      serviceDate: '2024-01-20',
      amount: '$180.00',
      status: 'Processing',
      description: 'Dental Cleaning',
    },
    {
      id: '3',
      claimNumber: 'CLM-2024-003',
      provider: 'Vision Care Specialists',
      serviceDate: '2024-01-25',
      amount: '$120.00',
      status: 'Denied',
      description: 'Eye Exam',
    },
    {
      id: '4',
      claimNumber: 'CLM-2024-004',
      provider: 'Urgent Care Plus',
      serviceDate: '2024-02-01',
      amount: '$95.00',
      status: 'Approved',
      description: 'Urgent Care Visit',
    },
  ];

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      const storedClaims = await AsyncStorage.getItem('claims');
      if (storedClaims) {
        setClaims(JSON.parse(storedClaims));
      } else {
        setClaims(mockClaims);
        await AsyncStorage.setItem('claims', JSON.stringify(mockClaims));
      }
    } catch (error) {
      console.error('Error loading claims:', error);
      setClaims(mockClaims);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await loadClaims();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return COLORS.success;
      case 'processing':
        return COLORS.warning;
      case 'denied':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  const renderClaimItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ClaimDetails', { claim: item })}
    >
      <Card containerStyle={styles.claimCard}>
        <View style={styles.claimHeader}>
          <Text style={styles.claimNumber}>{item.claimNumber}</Text>
          <Badge
            value={item.status}
            badgeStyle={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
            textStyle={styles.statusText}
          />
        </View>
        
        <Text style={styles.provider}>{item.provider}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.claimFooter}>
          <Text style={styles.serviceDate}>Service Date: {item.serviceDate}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Claims</Text>
        <Text style={styles.subHeaderText}>Pull down to refresh</Text>
      </View>

      <FlatList
        data={claims}
        renderItem={renderClaimItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
  listContainer: {
    padding: 10,
  },
  claimCard: {
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
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  claimNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  provider: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  claimFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 10,
  },
  serviceDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
