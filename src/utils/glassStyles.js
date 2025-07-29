import { COLORS } from '../constants/colors';

export const glassStyles = {
  glassCard: {
    backgroundColor: COLORS.glass.background,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
    shadowColor: COLORS.glass.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.37,
    shadowRadius: 25,
    elevation: 8,
  },
  
  glassHeader: {
    backgroundColor: COLORS.glass.primaryGlass,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glass.border,
  },
  
  glassButton: {
    backgroundColor: COLORS.glass.background,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  
  glassPrimaryButton: {
    backgroundColor: COLORS.glass.primaryGlass,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  
  glassContainer: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  
  glassBadge: {
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  
  glassInput: {
    backgroundColor: COLORS.glass.background,
    borderWidth: 1,
    borderColor: COLORS.glass.border,
  },
  
  glassDivider: {
    backgroundColor: COLORS.glass.border,
  }
};
