import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Card, Badge, Divider } from 'react-native-elements';
import { COLORS } from '../constants/colors';

export default function ClaimDetailsScreen({ route }) {
  const { claim } = route.params;

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

  const claimDetails = {
    ...claim,
    submittedDate: '2024-01-16',
    processedDate: claim.status === 'Approved' ? '2024-01-18' : null,
    copayAmount: '$25.00',
    deductibleApplied: '$0.00',
    insurancePaid: claim.status === 'Approved' ? '$225.00' : '$0.00',
    patientResponsibility: claim.status === 'Approved' ? '$25.00' : claim.amount,
    diagnosisCode: 'Z00.00',
    procedureCode: '99213',
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.headerCard}>
        <View style={styles.claimHeader}>
          <Text style={styles.claimNumber}>{claimDetails.claimNumber}</Text>
          <Badge
            value={claimDetails.status}
            badgeStyle={[styles.statusBadge, { backgroundColor: getStatusColor(claimDetails.status) }]}
            textStyle={styles.statusText}
          />
        </View>
        <Text style={styles.provider}>{claimDetails.provider}</Text>
        <Text style={styles.description}>{claimDetails.description}</Text>
      </Card>

      <Card containerStyle={styles.detailCard}>
        <Text style={styles.sectionTitle}>Service Information</Text>
        <Divider style={styles.divider} />
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Service Date:</Text>
          <Text style={styles.value}>{claimDetails.serviceDate}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Submitted Date:</Text>
          <Text style={styles.value}>{claimDetails.submittedDate}</Text>
        </View>
        
        {claimDetails.processedDate && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Processed Date:</Text>
            <Text style={styles.value}>{claimDetails.processedDate}</Text>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Diagnosis Code:</Text>
          <Text style={styles.value}>{claimDetails.diagnosisCode}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Procedure Code:</Text>
          <Text style={styles.value}>{claimDetails.procedureCode}</Text>
        </View>
      </Card>

      <Card containerStyle={styles.detailCard}>
        <Text style={styles.sectionTitle}>Financial Breakdown</Text>
        <Divider style={styles.divider} />
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Billed:</Text>
          <Text style={styles.value}>{claimDetails.amount}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Insurance Paid:</Text>
          <Text style={[styles.value, { color: COLORS.success }]}>
            {claimDetails.insurancePaid}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Copay:</Text>
          <Text style={styles.value}>{claimDetails.copayAmount}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Deductible Applied:</Text>
          <Text style={styles.value}>{claimDetails.deductibleApplied}</Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.detailRow}>
          <Text style={styles.totalLabel}>Patient Responsibility:</Text>
          <Text style={styles.totalValue}>{claimDetails.patientResponsibility}</Text>
        </View>
      </Card>

      {claimDetails.status === 'Denied' && (
        <Card containerStyle={[styles.detailCard, styles.deniedCard]}>
          <Text style={styles.sectionTitle}>Denial Information</Text>
          <Divider style={styles.divider} />
          <Text style={styles.denialReason}>
            Service not covered under current plan. Please contact customer service for more information.
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerCard: {
    margin: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  detailCard: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.5,
  },
  deniedCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  claimNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  provider: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  divider: {
    backgroundColor: COLORS.lightGray,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '600',
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  denialReason: {
    fontSize: 14,
    color: COLORS.error,
    lineHeight: 20,
  },
});
