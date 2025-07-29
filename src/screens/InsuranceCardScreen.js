import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function InsuranceCardScreen() {
  const [memberData, setMemberData] = useState({
    memberId: 'CIG123456789',
    groupNumber: 'GRP001234',
    planName: 'Cigna HealthCare Plus',
    memberName: 'John Doe',
    effectiveDate: '01/01/2024',
    copay: '$25',
    deductible: '$1,500',
  });

  useEffect(() => {
    loadMemberData();
  }, []);

  const loadMemberData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('memberData');
      if (storedData) {
        setMemberData(JSON.parse(storedData));
      } else {
        await AsyncStorage.setItem('memberData', JSON.stringify(memberData));
      }
    } catch (error) {
      console.error('Error loading member data:', error);
    }
  };

  const qrData = JSON.stringify({
    memberId: memberData.memberId,
    groupNumber: memberData.groupNumber,
    planName: memberData.planName,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Digital Insurance Card</Text>
      </View>

      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cignaLogo}>CIGNA</Text>
          <Text style={styles.planName}>{memberData.planName}</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{memberData.memberName}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Member ID:</Text>
              <Text style={styles.value}>{memberData.memberId}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Group Number:</Text>
              <Text style={styles.value}>{memberData.groupNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Effective Date:</Text>
              <Text style={styles.value}>{memberData.effectiveDate}</Text>
            </View>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={qrData}
              size={100}
              color={COLORS.black}
              backgroundColor={COLORS.white}
            />
            <Text style={styles.qrLabel}>Provider Scan Code</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.benefitInfo}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitLabel}>Copay</Text>
              <Text style={styles.benefitValue}>{memberData.copay}</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitLabel}>Deductible</Text>
              <Text style={styles.benefitValue}>{memberData.deductible}</Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Present this digital card to healthcare providers or show the QR code for quick scanning.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    margin: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 15,
  },
  cignaLogo: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  planName: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  qrLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
    textAlign: 'center',
  },
  cardFooter: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  benefitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  benefitItem: {
    alignItems: 'center',
  },
  benefitLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  benefitValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  instructions: {
    margin: 20,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.darkGray,
    lineHeight: 20,
  },
});
